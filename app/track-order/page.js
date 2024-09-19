'use client';

import { useState, useEffect } from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';

export default function TrackOrderPage() {
	const [orderId, setOrderId] = useState('');
	const [orderDetails, setOrderDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Check if there's an orderId in the URL (e.g., after payment redirect)
		const urlParams = new URLSearchParams(window.location.search);
		const orderIdFromUrl = urlParams.get('orderId');
		if (orderIdFromUrl) {
			setOrderId(orderIdFromUrl);
			fetchOrderDetails(orderIdFromUrl);
		}
	}, []);

	const fetchOrderDetails = async (id) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(`/api/orders/${id}`);
			const data = await response.json();

			if (response.ok) {
				setOrderDetails(data);
			} else if (response.status === 404) {
				setError('Order not found. Please check the order ID and try again.');
			} else {
				setError('Failed to fetch order details. Please try again.');
			}
		} catch (error) {
			console.error('Error fetching order details:', error);
			setError('An unexpected error occurred. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchOrderDetails(orderId);
	};

	return (
		<div className='container p-6 mx-auto'>
			<h1 className='mb-6 text-3xl font-bold'>Track Your Order</h1>
			<Card>
				<CardHeader>
					<CardTitle>Enter Order ID</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className='space-y-4'>
							<div>
								<Label htmlFor='orderId'>Order ID</Label>
								<Input
									id='orderId'
									value={orderId}
									onChange={(e) => setOrderId(e.target.value)}
									required
								/>
							</div>
							<Button type='submit' disabled={isLoading}>
								{isLoading ? 'Loading...' : 'Track Order'}
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

			{orderDetails && (
				<Card className='mt-6'>
					<CardHeader>
						<CardTitle>Order Details</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-2'>
							<p>
								<strong>Order ID:</strong> {orderDetails?.$id}
							</p>
							<p>
								<strong>Status:</strong> {orderDetails?.orderStatus}
							</p>
							<p>
								<strong>Customer Name:</strong> {orderDetails?.customerName}
							</p>
							<p>
								<strong>Shipping Address:</strong>{' '}
								{orderDetails?.shippingAddress}
							</p>
							<p>
								<strong>Pincode:</strong> {orderDetails?.pincode}
							</p>
							<p>
								<strong>Phone Number:</strong> {orderDetails?.phoneNumber}
							</p>
							<p>
								<strong>Total Amount:</strong> ₹{orderDetails?.paymentAmount}
							</p>
							<p>
								<strong>Payment Status:</strong> {orderDetails?.paymentStatus}
							</p>
							<h3 className='mt-4 font-semibold'>Order Items:</h3>
							<ul className='pl-5 list-disc'>
								{orderDetails?.orderItems?.map((item, index) => (
									<li key={index}>
										{item.productName} x {item.productQuantity} - ₹
										{item.productprice.toFixed(2)}
									</li>
								))}
							</ul>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
