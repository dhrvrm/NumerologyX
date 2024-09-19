'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '../../lib/zustand/cartStore';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../components/ui/select';
import { toast } from '../../components/ui/use-toast';
import { Toaster } from '../../components/ui/toaster';

// List of Indian states (unchanged)
const indianStates = [
	'Andhra Pradesh',
	'Arunachal Pradesh',
	'Assam',
	'Bihar',
	'Chhattisgarh',
	'Goa',
	'Gujarat',
	'Haryana',
	'Himachal Pradesh',
	'Jharkhand',
	'Karnataka',
	'Kerala',
	'Madhya Pradesh',
	'Maharashtra',
	'Manipur',
	'Meghalaya',
	'Mizoram',
	'Nagaland',
	'Odisha',
	'Punjab',
	'Rajasthan',
	'Sikkim',
	'Tamil Nadu',
	'Telangana',
	'Tripura',
	'Uttar Pradesh',
	'Uttarakhand',
	'West Bengal',
	'Andaman & Nicobar',
	'Chandigarh',
	'Dadra & Nagar Haveli',
	'Daman & Diu',
	'Lakshadweep',
	'Delhi',
	'Puducherry',
	'Ladakh',
	'Jammu & Kashmir',
];

export default function CheckoutPage() {
	const { cartItems, totalAmount, clearCart } = useCartStore();
	const [formData, setFormData] = useState({
		customerName: '',
		email: '',
		shippingAddress: '',
		pincode: '',
		city: '',
		state: '',
		phoneNumber: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handlePhoneChange = (e) => {
		const { value } = e.target;
		const phoneNumber = value.startsWith('+91') ? value : `+91${value}`;
		setFormData((prev) => ({ ...prev, phoneNumber }));
	};

	const fetchCityAndState = async (pincode) => {
		try {
			const response = await fetch(
				`https://api.postalpincode.in/pincode/${pincode}`
			);
			const data = await response.json();
			if (data[0].Status === 'Success') {
				const { District, State } = data[0].PostOffice[0];
				setFormData((prev) => ({ ...prev, city: District, state: State }));
			} else {
				toast({
					title: 'Invalid Pincode',
					description: 'Please enter a valid Indian pincode.',
					variant: 'destructive',
				});
			}
		} catch (error) {
			console.error('Error fetching pincode data:', error);
			toast({
				title: 'Error',
				description: 'Failed to fetch city and state. Please enter manually.',
				variant: 'destructive',
			});
		}
	};

	useEffect(() => {
		if (formData.pincode.length === 6) {
			fetchCityAndState(formData.pincode);
		}
	}, [formData.pincode]);

	const validateForm = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex = /^\+91[1-9]\d{9}$/;
		const pincodeRegex = /^[1-9]\d{5}$/;

		if (!formData.customerName.trim()) {
			toast({
				title: 'Error',
				description: 'Please enter your full name.',
				variant: 'destructive',
			});
			return false;
		}
		if (!emailRegex.test(formData.email)) {
			toast({
				title: 'Error',
				description: 'Please enter a valid email address.',
				variant: 'destructive',
			});
			return false;
		}
		if (!formData.shippingAddress.trim()) {
			toast({
				title: 'Error',
				description: 'Please enter your shipping address.',
				variant: 'destructive',
			});
			return false;
		}
		if (!pincodeRegex.test(formData.pincode)) {
			toast({
				title: 'Error',
				description: 'Please enter a valid 6-digit pincode.',
				variant: 'destructive',
			});
			return false;
		}
		if (!formData.city.trim() || !formData.state.trim()) {
			toast({
				title: 'Error',
				description: 'Please ensure city and state are filled.',
				variant: 'destructive',
			});
			return false;
		}
		if (!phoneRegex.test(formData.phoneNumber)) {
			toast({
				title: 'Error',
				description:
					'Please enter a valid 10-digit phone number starting with +91.',
				variant: 'destructive',
			});
			return false;
		}
		if (!indianStates.includes(formData.state)) {
			toast({
				title: 'Error',
				description: 'Please select a valid Indian state.',
				variant: 'destructive',
			});
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) {
			return; // Stop form submission if validation fails
		}

		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch('/api/payment/initiate', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					cartItems,
					amount: totalAmount * 100, // Convert to paise
					...formData,
				}),
			});

			const data = await response.json();
			if (data.success) {
				clearCart();
				window.location.href = data.data.instrumentResponse.redirectInfo.url;
			} else {
				setError('Failed to initiate payment. Please try again.');
				toast({
					title: 'Error',
					description: 'Failed to initiate payment. Please try again.',
					variant: 'destructive',
				});
			}
		} catch (error) {
			console.error('Error initiating payment:', error);
			setError('An unexpected error occurred. Please try again.');
			toast({
				title: 'Error',
				description: 'An unexpected error occurred. Please try again.',
				variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='container px-4 py-6 mx-auto sm:px-6 lg:px-8'>
			<h1 className='mb-6 text-2xl font-bold sm:text-3xl'>Checkout</h1>
			<div className='grid gap-6 md:grid-cols-2'>
				<Card className='w-full'>
					<CardHeader>
						<CardTitle>Shipping Information</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className='space-y-4'>
							<div>
								<Label htmlFor='customerName'>Full Name</Label>
								<Input
									id='customerName'
									name='customerName'
									value={formData.customerName}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									name='email'
									type='email'
									value={formData.email}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div>
								<Label htmlFor='shippingAddress'>Shipping Address</Label>
								<Input
									id='shippingAddress'
									name='shippingAddress'
									value={formData.shippingAddress}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div>
								<Label htmlFor='pincode'>Pincode</Label>
								<Input
									id='pincode'
									name='pincode'
									value={formData.pincode}
									onChange={handleInputChange}
									maxLength={6}
									required
								/>
							</div>
							<div>
								<Label htmlFor='city'>City</Label>
								<Input
									id='city'
									name='city'
									value={formData.city}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div>
								<Label htmlFor='state'>State</Label>
								<Select
									name='state'
									value={formData.state}
									onValueChange={(value) =>
										setFormData((prev) => ({ ...prev, state: value }))
									}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select a state' />
									</SelectTrigger>
									<SelectContent>
										{indianStates.map((state) => (
											<SelectItem key={state} value={state}>
												{state}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div>
								<Label htmlFor='phoneNumber'>Phone Number</Label>
								<Input
									id='phoneNumber'
									name='phoneNumber'
									value={formData.phoneNumber}
									onChange={handlePhoneChange}
									placeholder='+91'
									required
								/>
							</div>
							<Button
								type='submit'
								className='w-full mt-4'
								disabled={isLoading}
							>
								{isLoading ? 'Placing Order...' : 'Place Order'}
							</Button>
						</form>
					</CardContent>
				</Card>
				<Card className='w-full'>
					<CardHeader>
						<CardTitle>Order Summary</CardTitle>
					</CardHeader>
					<CardContent>
						{cartItems.map((item) => (
							<div key={item.$id} className='flex justify-between py-2'>
								<span>
									{item.title} x {item.quantity}
								</span>
								<span>₹{(item.current_price * item.quantity).toFixed(2)}</span>
							</div>
						))}
						<div className='flex justify-between mt-4 font-bold'>
							<span>Total</span>
							<span>₹{totalAmount.toFixed(2)}</span>
						</div>
					</CardContent>
				</Card>
			</div>
			<Toaster />
		</div>
	);
}
