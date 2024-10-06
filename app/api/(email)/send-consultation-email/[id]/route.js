// app/api/send-booking-email/[id]/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getBookingDetails } from '../../../../../lib/appwrite/consultationDatabase';
import BookingEmailTemplate from '..//BookingEmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request, { params }) {
	try {
		const { id: bookingId } = params;

		// Fetch the booking using bookingId
		const booking = await getBookingDetails(bookingId);

		if (!booking) {
			return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
		}

		const { data, error } = await resend.emails.send({
			from: 'AdeptNumero <consulations@updates.vaayudigital.in>',
			to: [booking.email],
			bcc: 'adeptnumero@gmail.com',
			subject: `Your Consultation Booking #${booking.$id} - AdeptNumero`,
			react: BookingEmailTemplate({ booking }),
		});

		if (error) {
			console.error('Error sending email:', error);
			return NextResponse.json(
				{ error: 'Failed to send email' },
				{ status: 500 }
			);
		}

		return NextResponse.json({ message: 'Email sent successfully', data });
	} catch (error) {
		console.error('Error processing request:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}
