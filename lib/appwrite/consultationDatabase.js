import { Query } from 'node-appwrite';
import {
	getConsulationCollectionID,
	getDatabaseID,
	getSlotsCollectionID,
} from '../constants';
import { databases } from './ecomDatabase';

const DATABASE_ID = getDatabaseID();
const SLOTS_COLLECTION_ID = getSlotsCollectionID();
const BOOKINGS_COLLECTION_ID = getConsulationCollectionID();

export async function createNewBooking(bookingData) {
	try {
		const booking = await databases.createDocument(
			DATABASE_ID,
			BOOKINGS_COLLECTION_ID,
			'unique()',
			bookingData
		);
		return booking;
	} catch (error) {
		console.error('Error creating new booking:', error);
		throw error;
	}
}

export async function getBookingByMerchantTransactionId(merchantTransactionId) {
	try {
		const bookings = await databases.listDocuments(
			DATABASE_ID,
			BOOKINGS_COLLECTION_ID,
			[Query.equal('merchantTransactionId', merchantTransactionId)]
		);

		console.log(
			'Getting booking from merch transaction id',
			bookings.documents[0]
		);

		return bookings.documents[0];
	} catch (error) {
		console.error('Error fetching booking:', error);
		throw error;
	}
}

export async function updateBookingWithTransactionId(
	bookingId,
	merchantTransactionId,
	paymentStatus
) {
	try {
		const updatedBooking = await databases.updateDocument(
			DATABASE_ID,
			BOOKINGS_COLLECTION_ID,
			bookingId,
			{
				merchantTransactionId,
				paymentStatus,
			}
		);
		return updatedBooking;
	} catch (error) {
		console.error('Error updating booking:', error);
		throw error;
	}
}

export async function updateSlotAvailability(
	startTime,
	isAvailable,
	consultationId
) {
	try {
		// First, query the collection to find the slot with the given startTime
		const result = await databases.listDocuments(
			DATABASE_ID,
			SLOTS_COLLECTION_ID,
			[
				Query.equal('startTime', startTime), // Query by startTime (datetime field)
			]
		);

		if (result.documents.length === 0) {
			throw new Error(`No slot found with startTime: ${startTime}`);
		}

		// Assuming startTime is unique, we get the first matching document
		const slotId = result.documents[0].$id;

		// Prepare the fields to update, including the relationship to consultation
		const updateData = {
			available: isAvailable,
			consultation: consultationId, // Assuming consultationId is a valid relation ID
		};

		// Now update the slot's availability and consultation relationship
		const updatedSlot = await databases.updateDocument(
			DATABASE_ID,
			SLOTS_COLLECTION_ID,
			slotId,
			updateData
		);

		return updatedSlot;
	} catch (error) {
		console.error('Error updating slot availability:', error);
		throw error;
	}
}

export async function getBookingDetails(bookingId) {
	try {
		const booking = await databases.getDocument(
			DATABASE_ID,
			BOOKINGS_COLLECTION_ID,
			bookingId
		);

		if (!booking) {
			throw new Error('Booking not found');
		}
		console.log('Fetched Booking details', booking);

		return booking;
	} catch (error) {
		console.error('Error fetching booking details:', error);
		throw error;
	}
}

export async function getAvailableSlots() {
	try {
		const slots = await databases.listDocuments(
			DATABASE_ID,
			SLOTS_COLLECTION_ID,
			[Query.equal('available', true), Query.orderAsc('startTime')]
		);
		return slots.documents;
	} catch (error) {
		console.error('Error fetching available slots:', error);
		throw error;
	}
}
