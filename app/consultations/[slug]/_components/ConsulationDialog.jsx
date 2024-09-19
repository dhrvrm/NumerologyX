'use client';

import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../../../components/ui/dialog';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../components/ui/select';
import { Checkbox } from '../../../../components/ui/checkbox';
import { toast } from '../../../../components/ui/use-toast';
import { account } from '../../../../lib/appwrite';
import moment from 'moment-timezone';

export function ConsultationDialog({
	consultation,
	availableSlots,
	onBookingComplete,
}) {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		dateOfBirth: '',
		placeOfBirth: '',
		phoneNumber: '',
		email: '',
		selectedSlot: '',
	});
	const [step, setStep] = useState('details');
	const [otp, setOtp] = useState('');
	const [userIdAW, setUserIdAW] = useState('');
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState({});

	const formatSlot = (startTime) => {
		// Set your desired timezone (e.g., Asia/Kolkata)
		return moment(startTime).tz('Asia/Kolkata').format('DD-MM-YYYY | hh:mm A');
	};

	const handlePhoneSubmit = async () => {
		if (!validateForm()) {
			toast({
				title: 'Error',
				description: 'Please correct the errors in the form.',
				variant: 'destructive',
			});
			return;
		}

		setLoading(true);
		try {
			await logoutIfNeeded();

			const token = await account.createPhoneToken(
				'unique()',
				`+91${formData.phoneNumber}`
			);
			setUserIdAW(token.userId);
			setStep('otp');
		} catch (error) {
			console.error('Error sending OTP:', error);
			toast({
				title: 'Error',
				description: 'Failed to send OTP. Please try again.',
				variant: 'destructive',
			});
		} finally {
			setLoading(false);
		}
	};

	const logoutIfNeeded = async () => {
		try {
			const session = await account.get();
			if (session) {
				await account.deleteSession('current');
				console.log('Logged out from the current session.');
			}
		} catch (error) {
			if (error.code === 401 && error.type === 'general_unauthorized_scope') {
				console.log(
					'User is already logged out or has insufficient permissions.'
				);
				// We can proceed without throwing an error, as the user is effectively logged out
			} else {
				// For other types of errors, we might want to throw and handle them
				throw error;
			}
		}
	};

	const handleOtpSubmit = async () => {
		if (!/^\d{6}$/.test(otp)) {
			setErrors((prev) => ({ ...prev, otp: 'OTP must be 6 digits' }));
			return;
		}

		setLoading(true);
		try {
			await account.updatePhoneSession(userIdAW, otp);
			await logoutIfNeeded(); // Logout after successful OTP verification
			setStep('slot');
		} catch (error) {
			console.error('Error verifying OTP:', error);
			toast({
				title: 'Error',
				description: 'Invalid OTP. Please try again.',
				variant: 'destructive',
			});
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		validateField(name, value);
	};

	const validateField = (name, value) => {
		let error = '';
		switch (name) {
			case 'name':
				error =
					value.trim() === ''
						? 'Name is required'
						: !/^[a-zA-Z\s]+$/.test(value)
						? 'Name should contain only letters and spaces'
						: '';
				break;
			case 'email':
				error = !/^\S+@\S+\.\S+$/.test(value) ? 'Invalid email address' : '';
				break;
			case 'dateOfBirth':
				const dob = new Date(value);
				const today = new Date();
				const minAge = new Date();
				minAge.setFullYear(today.getFullYear() - 18);
				error =
					dob > today
						? 'Date of birth cannot be in the future'
						: dob > minAge
						? 'You must be at least 18 years old'
						: '';
				break;
			case 'placeOfBirth':
				error =
					value.trim() === ''
						? 'Place of birth is required'
						: !/^[a-zA-Z\s,]+$/.test(value)
						? 'Place of birth should contain only letters, spaces, and commas'
						: '';
				break;
			case 'phoneNumber':
				error = !/^\d{10}$/.test(value.replace(/\D/g, ''))
					? 'Phone number must be 10 digits'
					: '';
				break;
		}
		setErrors((prev) => ({ ...prev, [name]: error }));
	};

	const validateForm = () => {
		let isValid = true;
		Object.keys(formData).forEach((key) => {
			validateField(key, formData[key]);
			if (errors[key]) isValid = false;
		});
		return isValid;
	};

	const handleSlotSelect = (slotId) => {
		const selectedSlot = availableSlots.find((slot) => slot.$id === slotId);
		setFormData((prev) => ({ ...prev, selectedSlot: selectedSlot.startTime }));
	};

	const handleSubmit = async () => {
		console.log(formData);

		if (!termsAccepted) {
			toast({
				title: 'Error',
				description: 'Please accept the terms and conditions.',
				variant: 'destructive',
			});
			return;
		}

		if (!formData.selectedSlot) {
			toast({
				title: 'Error',
				description: 'Please select a time slot.',
				variant: 'destructive',
			});
			return;
		}

		setLoading(true);

		try {
			const response = await fetch('/api/consultation/payment/initiate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					startTime: new Date(formData.selectedSlot).toISOString(), // Pass the startTime
					consultationName: consultation.title,
					customerName: formData.name,
					email: formData.email,
					phoneNumber: formData.phoneNumber,
					paymentAmount: consultation.currentPrice * 100,
					dob: formData.dateOfBirth,
					pob: formData.placeOfBirth,
				}),
			});

			const data = await response.json();
			if (data.success) {
				setIsDialogOpen(false);
				onBookingComplete();
				window.location.href = data.data.instrumentResponse.redirectInfo.url;
			} else {
				throw new Error('Failed to initiate payment');
			}
		} catch (error) {
			console.error('Error initiating payment:', error);
			toast({
				title: 'Error',
				description: 'An unexpected error occurred. Please try again.',
				variant: 'destructive',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>
				<Button
					size='lg'
					className='w-full text-white transition-all duration-300 bg-orange-600 hover:bg-orange-700'
				>
					Book Your Consultation
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Book Your Consultation</DialogTitle>
				</DialogHeader>
				<div className='mb-4 text-center'>
					<h3 className='text-lg font-semibold'>{consultation.title}</h3>
					<p className='text-sm text-gray-600'>
						Amount to be paid: ₹{consultation.currentPrice}
					</p>
				</div>
				{step === 'details' && (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handlePhoneSubmit();
						}}
						className='space-y-4'
					>
						<div>
							<Label htmlFor='name'>Full Name</Label>
							<Input
								id='name'
								name='name'
								value={formData.name}
								onChange={handleInputChange}
								required
							/>
							{errors.name && (
								<p className='text-sm text-red-500'>{errors.name}</p>
							)}
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
							{errors.email && (
								<p className='text-sm text-red-500'>{errors.email}</p>
							)}
						</div>
						<div>
							<Label htmlFor='dateOfBirth'>Date of Birth</Label>
							<Input
								id='dateOfBirth'
								name='dateOfBirth'
								type='date'
								max={new Date().toISOString().split('T')[0]}
								value={formData.dateOfBirth}
								onChange={handleInputChange}
								required
							/>
							{errors.dateOfBirth && (
								<p className='text-sm text-red-500'>{errors.dateOfBirth}</p>
							)}
						</div>
						<div>
							<Label htmlFor='placeOfBirth'>Place of Birth</Label>
							<Input
								id='placeOfBirth'
								name='placeOfBirth'
								value={formData.placeOfBirth}
								onChange={handleInputChange}
								required
							/>
							{errors.placeOfBirth && (
								<p className='text-sm text-red-500'>{errors.placeOfBirth}</p>
							)}
						</div>
						<div>
							<Label htmlFor='phoneNumber'>Phone Number</Label>
							<Input
								id='phoneNumber'
								name='phoneNumber'
								value={formData.phoneNumber}
								onChange={handleInputChange}
								required
							/>
							{errors.phoneNumber && (
								<p className='text-sm text-red-500'>{errors.phoneNumber}</p>
							)}
						</div>
						<Button type='submit' disabled={loading}>
							{loading ? 'Sending OTP...' : 'Send OTP'}
						</Button>
					</form>
				)}
				{step === 'otp' && (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleOtpSubmit();
						}}
						className='space-y-4'
					>
						<div>
							<Label htmlFor='otp'>Enter OTP</Label>
							<Input
								id='otp'
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
								required
							/>
							{errors.otp && (
								<p className='text-sm text-red-500'>{errors.otp}</p>
							)}
						</div>
						<Button type='submit' disabled={loading}>
							{loading ? 'Verifying...' : 'Verify OTP'}
						</Button>
					</form>
				)}
				{step === 'slot' && (
					<div className='space-y-4'>
						<Label>Select a Time Slot</Label>
						<Select onValueChange={handleSlotSelect}>
							<SelectTrigger className='w-full'>
								<SelectValue placeholder='Select a time slot' />
							</SelectTrigger>
							<SelectContent>
								{availableSlots.map((slot) => (
									<SelectItem
										key={slot.$id}
										value={slot.$id}
										className='py-2 cursor-pointer hover:bg-gray-100'
									>
										{formatSlot(slot.startTime)}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{formData.selectedSlot && (
							<div className='p-2 mt-2 rounded-md bg-blue-50'>
								<p className='text-sm font-medium text-blue-800'>
									Selected Time:
								</p>
								<p className='text-sm text-blue-600'>
									{formatSlot(formData.selectedSlot)}{' '}
									{/* Use the startTime directly */}
								</p>
							</div>
						)}

						<div className='flex items-center space-x-2'>
							<Checkbox
								id='terms'
								checked={termsAccepted}
								onCheckedChange={setTermsAccepted}
							/>
							<label
								htmlFor='terms'
								className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
							>
								I agree to the terms and conditions
							</label>
						</div>
						<Button onClick={handleSubmit} disabled={loading || !termsAccepted}>
							{loading ? 'Processing...' : 'Proceed to Payment'}
						</Button>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
