'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../../components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../components/ui/select';
import { account } from '../../lib/appwrite'; // Appwrite SDK
import { useUserStore } from '../../lib/zustand/userStore'; // Zustand for user state
import { ID } from 'appwrite';

// Simplified list of country codes
const countryCodes = [
	{ code: '+91', country: 'IN' },
	{ code: '+1', country: 'US' },
	{ code: '+44', country: 'UK' },
	{ code: '+81', country: 'JP' },
	{ code: '+86', country: 'CN' },
	// Add more country codes as needed
];

export default function PhoneSignIn() {
	const router = useRouter();
	const ref = router.query?.ref || '/profile'; // Get ref URL from query parameters

	const [countryCode, setCountryCode] = useState('+91');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [userIdAW, setUserIdAW] = useState('');
	const [otp, setOtp] = useState('');
	const [step, setStep] = useState('phone'); // 'phone' or 'otp'
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const { user, setUser } = useUserStore(); // Zustand hook to update user state

	// If the user is already authenticated, redirect to the homepage or ref URL
	useEffect(() => {
		if (user !== null) {
			// Redirect to referrer URL or homepage
			console.log(user);

			router.push(ref || '/');
		}
	}, [user, router, ref]);

	useEffect(() => {
		console.log(user);
	}, []);

	// Validate phone number format
	const validatePhoneNumber = (phone) => {
		const phoneRegex = /^\d{1,14}$/;
		return phoneRegex.test(phone);
	};

	// Send OTP to user's phone using Appwrite
	const handleSendOtp = async (e) => {
		e.preventDefault();
		setError('');

		if (!validatePhoneNumber(phoneNumber)) {
			setError('Please enter a valid phone number.');
			return;
		}

		setIsLoading(true);
		try {
			// Sending OTP using Appwrite's phone session
			const token = await account.createPhoneToken(
				ID.unique(),
				countryCode + phoneNumber
			);
			setUserIdAW(token.userId); // Store user ID for later OTP verification
			setStep('otp'); // Proceed to OTP verification step
		} catch (error) {
			console.error('Failed to send OTP:', error);
			setError('Failed to send OTP. Please try again.');
		}
		setIsLoading(false);
	};

	// Validate OTP input
	const validateOtp = (otp) => {
		return otp.length === 6 && /^\d+$/.test(otp);
	};

	// Verify the OTP using Appwrite and authenticate the user
	const handleVerifyOtp = async (e) => {
		e.preventDefault();
		setError('');

		if (!validateOtp(otp)) {
			setError('Please enter a valid 6-digit OTP.');
			return;
		}

		setIsLoading(true);
		try {
			// Verify OTP and log the user in with Appwrite
			const session = await account.createSession(userIdAW, otp);
			const user = await account.get(); // Fetch user data after login
			setUser(user); // Store user info in Zustand state
			// Redirect to ref URL or homepage after successful login
			router.push(ref);
		} catch (error) {
			console.error('Failed to verify OTP:', error);
			setError('Invalid OTP. Please try again.');
		}
		setIsLoading(false);
	};

	return (
		<section>
			<Card className='w-[350px] mx-auto'>
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
					<CardDescription>Sign in with your phone number</CardDescription>
				</CardHeader>
				<CardContent>
					{step === 'phone' ? (
						<form onSubmit={handleSendOtp} className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='phone'>Phone Number</Label>
								<div className='flex space-x-2'>
									<Select value={countryCode} onValueChange={setCountryCode}>
										<SelectTrigger className='w-[100px]'>
											<SelectValue placeholder='Code' />
										</SelectTrigger>
										<SelectContent>
											{countryCodes.map((country) => (
												<SelectItem key={country.code} value={country.code}>
													{country.code} {country.country}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<Input
										id='phone'
										type='tel'
										placeholder='1234567890'
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
										className='flex-1'
										required
									/>
								</div>
							</div>
							<Button type='submit' className='w-full' disabled={isLoading}>
								{isLoading ? 'Sending...' : 'Send OTP'}
							</Button>
						</form>
					) : (
						<form onSubmit={handleVerifyOtp} className='space-y-4'>
							<div className='space-y-2'>
								<Label htmlFor='otp'>Enter OTP</Label>
								<Input
									id='otp'
									type='text'
									placeholder='123456'
									value={otp}
									onChange={(e) => setOtp(e.target.value)}
									maxLength={6}
									required
								/>
							</div>
							<Button type='submit' className='w-full' disabled={isLoading}>
								{isLoading ? 'Verifying...' : 'Verify OTP'}
							</Button>
						</form>
					)}
					{error && <p className='mt-2 text-sm text-red-500'>{error}</p>}
				</CardContent>
				<Button
					variant='destructive'
					onClick={async () => {
						await account.deleteSession('current');
						console.log('Log out sucessful');
					}}
				>
					Logout
				</Button>
			</Card>
		</section>
	);
}
