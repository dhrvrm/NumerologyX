import {
	Html,
	Body,
	Head,
	Heading,
	Hr,
	Container,
	Preview,
	Section,
	Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

export default function OrderEmailTemplate({ order }) {
	return (
		<Html>
			<Head />
			<Preview>Your AdeptNumero Order #{order.$id}</Preview>
			<Tailwind>
				<Body className='font-sans bg-gray-100'>
					<Container className='p-6 my-6 bg-white rounded-lg shadow-lg'>
						<Heading className='mb-4 text-2xl font-bold text-center'>
							AdeptNumero Order Confirmation
						</Heading>
						<Text>Dear {order.customerName},</Text>
						<Text>Thank you for your order. Here are your order details:</Text>
						<Section className='p-4 rounded-md bg-gray-50'>
							<Text>
								<strong>Order ID:</strong> {order.$id}
							</Text>
							<Text>
								<strong>Status:</strong> {order.orderStatus}
							</Text>
							<Text>
								<strong>Shipping Address:</strong> {order.shippingAddress}
							</Text>
							<Text>
								<strong>Pincode:</strong> {order.pincode}
							</Text>
							<Text>
								<strong>Phone Number:</strong> {order.phoneNumber}
							</Text>
							<Text>
								<strong>Total Amount:</strong> ₹{order.paymentAmount}
							</Text>
							<Text>
								<strong>Payment Status:</strong> {order.paymentStatus}
							</Text>
						</Section>
						<Heading as='h3' className='mt-4 text-lg font-semibold'>
							Order Items:
						</Heading>
						<ul>
							{order.orderItems?.map((item, index) => (
								<li key={index}>
									{item.productName} x {item.productQuantity} - ₹
									{item.productprice.toFixed(2)}
								</li>
							))}
						</ul>
						<Hr className='my-4' />
						<Text>
							If you have any questions about your order, please don&apos;t
							hesitate to contact us.
						</Text>
						<Text className='mt-4 text-sm text-center text-gray-500'>
							© 2024 AdeptNumero. All rights reserved.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
