import { getOrderDetails } from '../../../../lib/appwrite/ecomDatabase';

export async function GET(req, { params }) {
	const { id } = params;

	try {
		// Fetch the order details and items
		const order = await getOrderDetails(id);
		console.log('Order Recieved on FE', order);

		return new Response(JSON.stringify(order), {
			status: 200,
		});
	} catch (error) {
		console.error('Error fetching order detailsss:', error.message);

		// Handle 404 (Order not found)
		if (error.message === 'Order not found') {
			return new Response(JSON.stringify({ error: 'Order not found' }), {
				status: 404,
			});
		}

		// Handle general errors
		return new Response(
			JSON.stringify({ error: 'Failed to fetch order details' }),
			{
				status: 500,
			}
		);
	}
}
