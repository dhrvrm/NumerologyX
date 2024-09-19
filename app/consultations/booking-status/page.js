'use client';

import { useState, useEffect } from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from '../../../components/ui/alert';
import moment from 'moment-timezone';

export default function BookingStatusPage() {
	const [bookingId, setBookingId] = useState('');
	const [bookingDetails, setBookingDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const bookingIdFromUrl = urlParams.get('bookingId');
		if (bookingIdFromUrl) {
			setBookingId(bookingIdFromUrl);
			fetchBookingDetails(bookingIdFromUrl);
		}
	}, []);

	const fetchBookingDetails = async (id) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(`/api/consultation/booking/${id}`);
			const data = await response.json();

			if (response.ok) {
				setBookingDetails(data);
			} else if (response.status === 404) {
				setError(
					'Booking not found. Please check the booking ID and try again.'
				);
			} else {
				setError(
					'Failed to fetch booking details. Please make sure Id is correct.'
				);
			}
		} catch (error) {
			console.error('Error fetching booking details:', error);
			setError('An unexpected error occurred. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchBookingDetails(bookingId);
	};

	return (
		<div className='container p-6 mx-auto'>
			<h1 className='mb-6 text-3xl font-bold'>Consultation Booking Status</h1>
			<Card>
				<CardHeader>
					<CardTitle>Enter Booking ID</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className='space-y-4'>
							<div>
								<Label htmlFor='bookingId'>Booking ID</Label>
								<Input
									id='bookingId'
									value={bookingId}
									onChange={(e) => setBookingId(e.target.value)}
									required
								/>
							</div>
							<Button type='submit' disabled={isLoading}>
								{isLoading ? 'Loading...' : 'Check Status'}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>

			{error && (
				<Alert variant='destructive' className='mt-6'>
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{bookingDetails && (
				<Card className='mt-6'>
					<CardHeader>
						<CardTitle>Booking Details</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-2'>
							<p>
								<strong>Booking ID:</strong> {bookingDetails.$id}
							</p>
							<p>
								<strong>Status:</strong> {bookingDetails.paymentStatus}
							</p>
							<p>
								<strong>Customer Name:</strong> {bookingDetails.customerName}
							</p>
							<p>
								<strong>Email:</strong> {bookingDetails.email}
							</p>
							<p>
								<strong>Phone Number:</strong> {bookingDetails.phoneNumber}
							</p>
							<p>
								<strong>Date of Birth:</strong>{' '}
								{moment(bookingDetails.dob).format('DD-MM-YYYY')}
							</p>
							<p>
								<strong>Place of Birth:</strong> {bookingDetails.pob}
							</p>
							<p>
								<strong>Consultation Date:</strong>{' '}
								{moment(bookingDetails.startTime).format('DD-MM-YYYY HH:mm A')}
							</p>
							<p>
								<strong>Consultation Name:</strong>{' '}
								{bookingDetails.consultationName}
							</p>
							<p>
								<strong>Amount Paid:</strong> ₹{bookingDetails.paymentAmount}
							</p>
							<p>
								<strong>Payment Status:</strong> {bookingDetails.paymentStatus}
							</p>
							<p>
								<strong>Transaction ID:</strong>{' '}
								{bookingDetails.merchantTransactionId}
							</p>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
