import { ID } from 'node-appwrite';
import { databases } from '../../../../lib/appwrite/ecomDatabase';
import { getDatabaseID, getSlotsCollectionID } from '../../../../lib/constants';
import { NextResponse } from 'next/server';

export async function GET(req) {
	try {
		const slots = [
			// '2025-01-02 08:00',
			// '2025-01-03 08:00',
			// '2025-01-09 08:00',
			// '2025-01-11 08:45',
			// '2025-01-12 06:30',
			// '2025-01-15 07:00',
			// '2025-01-21 07:00',
			// '2025-01-22 07:00',
			// '2025-01-23 08:00',
			// '2025-01-24 07:30',
			// '2025-01-27 12:30',
			// '2025-01-28 07:30',
			// '2025-01-29 07:15',
			// '2025-01-30 08:00',
			// '2025-02-02 06:30',
			// '2025-02-02 09:00',
			// '2025-02-03 06:00',
			// '2025-02-03 10:00',
			// '2025-02-04 07:15',
			// '2025-02-04 09:30',
			// '2025-02-05 06:30',
			// '2025-02-05 11:00',
			// '2025-02-09 08:00',
			// '2025-02-10 10:00',
			// '2025-02-12 06:15',
			// '2025-02-12 10:45',
			// '2025-02-14 07:05',
			// '2025-02-14 11:45',
			// '2025-02-21 07:05',
			// '2025-02-21 12:00',
		];

		//Prompt:
		/**
		 * I am building an ingestion API for a booking system using JavaScript/Node.js. The API should:

Accept Slots in YYYY-MM-DD HH:mm format (e.g., 2025-01-02 08:00).
Convert the slots to UTC before storing them in the database.
Validate the input:
Ensure the date and time values are valid numbers.
Handle errors gracefully for invalid formats or missing data.
Log specific errors for problematic slots to aid debugging.
Insert valid slots into a database (e.g., Appwrite) with:
startTime: The UTC datetime in ISO string format.
available: Boolean flag (true).
Use best practices like modular functions and clear error handling.
If there are existing issues (like incorrect dates being parsed), debug and explain the root cause. Also, ensure logs provide slot-specific details for easier tracking.
		 * 
		 */

		// Loop through the slots and insert them into the database
		const promises = slots.map(async (slot) => {
			try {
				const [date, time] = slot.split(' ');
				const [year, month, day] = date.split('-').map(Number);
				const [hours, minutes] = time.split(':').map(Number);

				// Validate date components
				if (
					isNaN(year) ||
					isNaN(month) ||
					isNaN(day) ||
					isNaN(hours) ||
					isNaN(minutes)
				) {
					throw new Error(`Invalid date or time in slot: ${slot}`);
				}

				// Create a Date object in UTC
				const utcDateTime = new Date(
					Date.UTC(year, month - 1, day, hours, minutes)
				);

				// Check if the created date is valid
				if (isNaN(utcDateTime.getTime())) {
					throw new Error(`Invalid UTC date created for slot: ${slot}`);
				}

				return await databases.createDocument(
					getDatabaseID(),
					getSlotsCollectionID(),
					ID.unique(), // Generate a unique ID for each document
					{
						startTime: utcDateTime.toISOString(), // Convert to ISO string
						available: true,
					}
				);
			} catch (err) {
				console.error(`Error processing slot ${slot}:`, err.message);
				throw err; // Rethrow to catch in the outer catch block
			}
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
