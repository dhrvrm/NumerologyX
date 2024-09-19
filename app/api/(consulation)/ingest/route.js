import { ID } from 'node-appwrite';
import { databases } from '../../../../lib/appwrite/ecomDatabase';
import { getDatabaseID, getSlotsCollectionID } from '../../../../lib/constants';
import { NextResponse } from 'next/server';

export async function GET(req) {
	try {
		const slots = [
			// '02-11-2024 05:00',
			// '03-11-2024 06:00',
			// '04-11-2024 06:00',
			// '09-11-2024 05:00',
			// '11-11-2024 06:00',
			// '12-11-2024 07:00',
			// '13-11-2024 07:00',
			// '14-11-2024 04:00',
			// '15-11-2024 05:00',
			// '20-11-2024 07:00',
			// '21-11-2024 04:00',
			// '22-11-2024 05:00',
			// '23-11-2024 05:00',
			// '24-11-2024 06:00',
			// '27-11-2024 07:00',
			// '29-11-2024 05:00',
			// '30-11-2024 05:00',
		];

		// Loop through the slots and insert them into the database
		const promises = slots.map(async (slot) => {
			const [date, time] = slot.split(' ');
			const [day, month, year] = date.split('-');
			const [hours, minutes] = time.split(':');

			// Create a Date object in UTC
			const utcDateTime = new Date(
				Date.UTC(
					parseInt(year),
					parseInt(month) - 1,
					parseInt(day),
					parseInt(hours),
					parseInt(minutes)
				)
			);

			return await databases.createDocument(
				getDatabaseID(),
				getSlotsCollectionID(),
				ID.unique(), // Generate a unique ID for each document
				{
					startTime: utcDateTime.toISOString(), // Convert to ISO string
					available: true,
				}
			);
		});

		// Wait for all promises to be resolved
		await Promise.all(promises);

		return NextResponse.json(
			{ message: 'Slots added successfully!' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error adding slots:', error);
		return NextResponse.json({ error: 'Failed to add slots' }, { status: 500 });
	}
}
