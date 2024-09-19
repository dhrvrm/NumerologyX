import { NextResponse } from 'next/server';
import { getBookingDetails } from '../../../../../../lib/appwrite/consultationDatabase';

export async function GET(req, { params }) {
	const { id } = params;

	try {
		const booking = await getBookingDetails(id);

		return NextResponse.json(booking, { status: 200 });
	} catch (error) {
		console.error('Error fetching booking details:', error.message);

		if (error.message === 'Booking not found') {
			return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
		}

		return NextResponse.json(
			{ error: 'Failed to fetch booking details' },
			{ status: 500 }
		);
	}
}
