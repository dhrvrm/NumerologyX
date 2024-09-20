import { NextResponse } from 'next/server';
import { fetchAvailableSlots } from '../../../../../lib/appwrite/consultationDatabase';

export async function GET() {
	try {
		const slots = await fetchAvailableSlots();
		return NextResponse.json(slots);
	} catch (error) {
		console.error('Error fetching available slots:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch available slots' },
			{ status: 500 }
		);
	}
}
