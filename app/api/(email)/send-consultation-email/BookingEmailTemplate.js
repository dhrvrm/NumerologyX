// components/BookingEmailTemplate.tsx
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
import moment from 'moment-timezone';

export default function BookingEmailTemplate({ booking }) {
	return (
		<Html>
			<Head />
			<Preview>Your AdeptNumero Consultation Booking #{booking.$id}</Preview>
			<Tailwind>
				<Body className='font-sans bg-gray-100'>
					<Container className='p-6 my-6 bg-white rounded-lg shadow-lg'>
						<Heading className='mb-4 text-2xl font-bold text-center'>
							AdeptNumero Consultation Booking Confirmation
						</Heading>
						<Text>Dear {booking.customerName},</Text>
						<Text>
							Thank you for booking a consultation with AdeptNumero. Here are
							your booking details:
						</Text>
						<Section className='p-4 rounded-md bg-gray-50'>
							<Text>
								<strong>Booking ID:</strong> {booking.$id}
							</Text>
							<Text>
								<strong>Consultation Name:</strong> {booking.consultationName}
							</Text>
							<Text>
								<strong>Date and Time:</strong>{' '}
								{moment(booking.startTime)
									.tz('Asia/Kolkata')
									.format('DD-MM-YYYY hh:mm A')}{' '}
								IST
							</Text>
							<Text>
								<strong>Amount Paid:</strong> ₹{booking.paymentAmount}
							</Text>
							<Text>
								<strong>Payment Status:</strong> {booking.paymentStatus}
							</Text>
							<Text>
								<strong>Transaction ID:</strong> {booking.merchantTransactionId}
							</Text>
						</Section>
						<Heading as='h3' className='mt-4 text-lg font-semibold'>
							Your Information:
						</Heading>
						<Section className='p-4 rounded-md bg-gray-50'>
							<Text>
								<strong>Name:</strong> {booking.customerName}
							</Text>
							<Text>
								<strong>Email:</strong> {booking.email}
							</Text>
							<Text>
								<strong>Phone Number:</strong> {booking.phoneNumber}
							</Text>
							<Text>
								<strong>Date of Birth:</strong>{' '}
								{moment(booking.dob).format('DD-MM-YYYY')}
							</Text>
							<Text>
								<strong>Place of Birth:</strong> {booking.pob}
							</Text>
						</Section>
						<Hr className='my-4' />
						<Text>
							If you have any questions about your booking, please don&apos;t
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
