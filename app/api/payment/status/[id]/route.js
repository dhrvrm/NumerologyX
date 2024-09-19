import { NextResponse } from 'next/server';
import sha256 from 'crypto-js/sha256';
import {
	getOrderByMerchantTransactionId,
	updateOrderWithTransactionId,
} from '../../../../../lib/appwrite/ecomDatabase';
import { getBaseUrl, getPhonepeUrl } from '../../../../../lib/constants';

export async function POST(req, { params }) {
	try {
		const { id: merchantTransactionId } = params;

		// Read merchant data from environment variables
		const merchantId = process.env.PHONEPE_MERCHANT_ID;
		const saltKey = process.env.PHONEPE_SALT_KEY;
		const saltIndex = process.env.PHONEPE_SALT_INDEX;

		// Generate X-VERIFY checksum
		const hashString =
			`/pg/v1/status/${merchantId}/${merchantTransactionId}` + saltKey;
		const checksum = sha256(hashString).toString() + '###' + saltIndex;

		// Set up PhonePe status check URL and headers
		const url = `${getPhonepeUrl()}/status/${merchantId}/${merchantTransactionId}`;
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				'X-VERIFY': checksum,
				'X-MERCHANT-ID': merchantId,
			},
		};

		// Request payment status from PhonePe
		const response = await fetch(url, options);
		const result = await response.json();

		console.log('Payment status response:', result);

		// Fetch the order using merchantTransactionId
		const order = await getOrderByMerchantTransactionId(merchantTransactionId);
		const orderId = order.$id;

		// Determine the payment status
		const paymentStatus = result.code === 'PAYMENT_SUCCESS' ? 'PAID' : 'FAILED';
		const orderStatus = paymentStatus === 'PAID' ? 'PROCESSING' : 'CANCELLED';

		// Update the order with PhonePe's transactionId and payment status
		await updateOrderWithTransactionId(
			orderId,
			result.transactionId,
			paymentStatus,
			orderStatus
		);

		// Redirect to track order page
		const baseUrl = getBaseUrl();
		const redirectUrl = `${baseUrl}/track-order?orderId=${orderId}`;

		return NextResponse.redirect(redirectUrl, { status: 303 });
	} catch (error) {
		console.error('Error checking payment status:', error.message);
		return new Response(
			JSON.stringify({
				error: 'Payment status check failed',
				details: error.message,
			}),
			{
				status: 500,
			}
		);
	}
}
