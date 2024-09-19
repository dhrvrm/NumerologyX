import { NextResponse } from 'next/server';
import sha256 from 'crypto-js/sha256';
import {
	getBookingByMerchantTransactionId,
	updateBookingWithTransactionId,
	updateSlotAvailability,
} from '../.././../../../../../lib/appwrite/consultationDatabase';
import {
	getBaseUrl,
	getPhonepeUrl,
} from '../.././../../../../../lib/constants';

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

		// Fetch the booking using merchantTransactionId
		const booking = await getBookingByMerchantTransactionId(
			result.data.merchantTransactionId
		);

		// Check if booking is undefined and throw an error
		if (!booking) {
			throw new Error(
				'Booking not found with the given merchantTransactionId.'
			);
		}

		const bookingId = booking.$id;

		// Determine the payment status
		const paymentStatus = result.code === 'PAYMENT_SUCCESS' ? 'PAID' : 'FAILED';

		// Update the booking with PhonePe's transactionId and payment status
		await updateBookingWithTransactionId(bookingId, paymentStatus);

		// If payment was successful, update the slot availability
		if (paymentStatus === 'PAID') {
			await updateSlotAvailability(booking.startTime, false, bookingId);
		}

		// Redirect to booking status page
		const baseUrl = getBaseUrl();
		const redirectUrl = `${baseUrl}/consultations/booking-status?bookingId=${bookingId}`;

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
