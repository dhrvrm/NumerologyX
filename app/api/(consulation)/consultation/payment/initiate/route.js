import { NextResponse } from 'next/server';
import crypto from 'crypto';
import sha256 from 'crypto-js/sha256';
import { v4 as uuidv4 } from 'uuid';
import { createNewBooking } from '../../../../../../lib/appwrite/consultationDatabase';
import { getBaseUrl, getPhonepeUrl } from '../../../../../../lib/constants';

export async function POST(req) {
	try {
		const {
			startTime,
			consultationName,
			customerName,
			email,
			phoneNumber,
			paymentAmount,
			dob,
			pob,
		} = await req.json();

		// 	startTime,
		// 	consultationName,
		// 	customerName,
		// 	email,
		// 	phoneNumber,
		// 	paymentAmount,
		// 	dob,
		// 	pob,
		// });

		// Generate a unique merchantTransactionId
		const merchantTransactionId = crypto.randomBytes(16).toString('hex');

		// Create the booking in the database
		const booking = await createNewBooking({
			startTime,
			consultationName,
			customerName,
			email,
			phoneNumber,
			paymentAmount: paymentAmount / 100,
			dob,
			pob,
			paymentStatus: 'PENDING',
			merchantTransactionId,
		});

		// Use the getBaseUrl function to dynamically get the base URL
		const baseUrl = getBaseUrl();

		// Generate MUID (merchantUserId)
		const merchantUserId = `MUID-${uuidv4()}`;

		// Construct the payment payload
		const payload = {
			merchantId: process.env.PHONEPE_MERCHANT_ID,
			merchantTransactionId,
			merchantUserId,
			amount: paymentAmount, // in paise
			redirectUrl: `${baseUrl}/api/consultation/payment/status/${merchantTransactionId}`,
			redirectMode: 'POST',
			callbackUrl: `${baseUrl}/api/consultation/payment/status/${merchantTransactionId}`,
			mobileNumber: phoneNumber,
			paymentInstrument: {
				type: 'PAY_PAGE',
			},
		};

		// Convert payload to base64
		const base64Payload = Buffer.from(JSON.stringify(payload)).toString(
			'base64'
		);

		// Generate checksum using sha256
		const fullUrl = base64Payload + '/pg/v1/pay' + process.env.PHONEPE_SALT_KEY;
		const checksum =
			sha256(fullUrl).toString() + '###' + process.env.PHONEPE_SALT_INDEX;

		// Prepare the request options for PhonePe's API
		const options = {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				'X-VERIFY': checksum,
			},
			body: JSON.stringify({ request: base64Payload }),
		};

		// Send the request to PhonePe's API
		const PAY_API_URL = `${getPhonepeUrl()}/pay`;
		const response = await fetch(PAY_API_URL, options);
		console.log('Result from Pay API', response);
		const result = await response.json();

		if (result.success) {
			return NextResponse.json(result);
		} else {
			return NextResponse.json(
				{ error: 'Payment initiation failed' },
				{ status: 500 }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ error: 'Payment initiation failed', details: error.message },
			{ status: 500 }
		);
	}
}
