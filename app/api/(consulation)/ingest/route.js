import { ID } from 'node-appwrite';
import { databases } from '../../../../lib/appwrite/ecomDatabase';
import { getDatabaseID, getSlotsCollectionID } from '../../../../lib/constants';
import { NextResponse } from 'next/server';

export async function GET(req) {
	try {
		// const slots = [
		// 	"2025-03-02 07:00",  // 12:30 PM IST → 07:00 AM UTC
		// 	"2025-03-03 06:00",  // 11:30 AM IST → 06:00 AM UTC
		// 	"2025-03-04 07:15",  // 12:45 PM IST → 07:15 AM UTC
		// 	"2025-03-05 06:30",  // 12:00 PM IST → 06:30 AM UTC
		// 	"2025-03-09 08:00",  // 1:30 PM IST → 08:00 AM UTC
		// 	"2025-03-10 12:00",  // 5:30 PM IST → 12:00 PM UTC
		// 	"2025-03-11 07:00",  // 12:30 PM IST → 07:00 AM UTC
		// 	"2025-03-12 06:05",  // 11:35 AM IST → 06:05 AM UTC
		// 	"2025-03-13 04:05",  // 9:35 AM IST → 04:05 AM UTC
		// 	"2025-03-14 05:05",  // 10:35 AM IST → 05:05 AM UTC
		// 	"2025-03-14 07:00",  // 12:30 PM IST → 07:00 AM UTC (Second Slot)
		// 	"2025-03-17 06:00",  // 11:30 AM IST → 06:00 AM UTC
		// 	"2025-03-18 07:00",  // 12:30 PM IST → 07:00 AM UTC
		// 	"2025-03-19 06:00",  // 11:30 AM IST → 06:00 AM UTC
		// 	"2025-03-20 08:00",  // 1:30 PM IST → 08:00 AM UTC
		// 	"2025-03-21 07:00",  // 12:30 PM IST → 07:00 AM UTC
		// 	"2025-03-24 05:00",  // 10:30 AM IST → 05:00 AM UTC
		// 	"2025-03-25 07:00",  // 12:30 PM IST → 07:00 AM UTC
		// 	"2025-03-26 06:00",  // 11:30 AM IST → 06:00 AM UTC
		// 	"2025-03-27 04:30",  // 10:00 AM IST → 04:30 AM UTC
		// 	"2025-03-28 05:00",  // 10:30 AM IST → 05:00 AM UTC
		// 	"2025-03-31 05:00",  // 10:30 AM IST → 05:00 AM UTC
		//   ];

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
