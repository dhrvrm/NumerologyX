import { Client, Databases, ID, Query } from 'node-appwrite';
import {
	getProjectID,
	getProjectKey,
	getDatabaseID,
	getOrdersCollectionID,
	getOrderItemCollectionID,
} from '../constants';

const client = new Client();

client
	.setEndpoint('https://cloud.appwrite.io/v1')
	.setProject(getProjectID())
	.setKey(getProjectKey());

export const databases = new Databases(client);

export { client };

export async function createNewStoreOrder({
	cartItems,
	cartTotal,
	customerName,
	shippingAddress,
	pincode,
	state,
	city,
	email,
	phoneNumber,
	orderStatus,
	merchantTransactionId,
}) {
	try {
		// Create the main order document
		const order = await databases.createDocument(
			getDatabaseID(),
			getOrdersCollectionID(),
			ID.unique(),
			{
				merchantTransactionId, // Store the generated merchantTransactionId
				transactionId: '', // This will be updated after the status check
				paymentStatus: 'PENDING',
				paymentAmount: cartTotal,
				shippingAddress,
				pincode,
				state,
				city,
				email,
				customerName,
				phoneNumber, // Store phoneNumber in the order
				orderStatus,
			}
		);

		// Create order items
		const orderItemPromises = cartItems.map((item) =>
			databases.createDocument(
				getDatabaseID(),
				getOrderItemCollectionID(),
				ID.unique(),
				{
					orderId: order.$id,
					productId: item.$id,
					productQuantity: item.quantity,
					productprice: item.current_price,
					productName: item.title,
				}
			)
		);

		// Wait for all order items to be created
		await Promise.all(orderItemPromises);

		return order;
	} catch (error) {
		console.error('Error Creating Order:', error);
		throw error;
	}
}

export async function getOrderByMerchantTransactionId(merchantTransactionId) {
	try {
		const order = await databases.listDocuments(
			getDatabaseID(),
			getOrdersCollectionID(),
			[Query.equal('merchantTransactionId', merchantTransactionId)]
		);

		if (order.documents.length === 0) {
			throw new Error('Order not found for the given merchantTransactionId');
		}

		return order.documents[0]; // Return the first matching document
	} catch (error) {
		console.error('Error fetching order by merchantTransactionId:', error);
		throw new Error('Failed to fetch order by merchantTransactionId');
	}
}

export async function updateOrderWithTransactionId(
	orderId,
	transactionId,
	paymentStatus,
	orderStatus
) {
	try {
		await databases.updateDocument(
			getDatabaseID(),
			getOrdersCollectionID(),
			orderId,
			{
				transactionId, // Update the order with the transactionId from PhonePe
				paymentStatus,
				orderStatus,
			}
		);
	} catch (error) {
		console.error('Failed to update order status:', error);
		throw new Error('Failed to update order status');
	}
}

export async function getOrderDetails(orderId) {
	try {
		// Fetch the order details from the orders collection using orderId
		const order = await databases.getDocument(
			getDatabaseID(),
			getOrdersCollectionID(),
			orderId
		);

		return order; // Return the order details
	} catch (error) {
		console.error('Error fetching order details:', error);
		throw new Error('Failed to fetch order details');
	}
}
