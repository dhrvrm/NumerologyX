import { NextResponse } from 'next/server';
import { createContactFormEnquiry } from '../../..//lib/appwrite/ecomDatabase';

export async function POST(request) {
	try {
		const body = await request.json();
		const { name, email, message } = body;

		// Create the contact form enquiry in the database
		const enquiry = await createContactFormEnquiry({ name, email, message });

		// You might want to send an email notification here as well

		return NextResponse.json({
			success: true,
			message: 'Enquiry received',
			enquiryId: enquiry.$id,
		});
	} catch (error) {
		console.error('Error processing contact form submission:', error);
		return NextResponse.json(
			{ success: false, message: 'Failed to process enquiry' },
			{ status: 500 }
		);
	}
}
