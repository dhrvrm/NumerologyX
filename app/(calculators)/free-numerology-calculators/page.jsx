'use client';

import { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NumerologyCalculators() {
	const [birthDate, setBirthDate] = useState('');
	const [fullName, setFullName] = useState('');
	const [results, setResults] = useState({});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const calculateNumerology = async () => {
		if (!birthDate || !fullName) {
			setError('Please enter both your full name and birth date.');
			return;
		}

		setError('');
		setLoading(true);

		try {
			const lifePathNumber = calculateLifePath(birthDate);
			const destinyNumber = calculateDestinyNumber(fullName);
			const soulUrgeNumber = calculateSoulUrgeNumber(fullName);
			const personalityNumber = calculatePersonalityNumber(fullName);

			setResults({
				lifePath: lifePathNumber,
				destiny: destinyNumber,
				soulUrge: soulUrgeNumber,
				personality: personalityNumber,
			});
		} catch (err) {
			setError('An error occurred during calculation. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const calculateLifePath = (date) => {
		const numbers = date.replace(/\D/g, '');
		let sum = numbers.split('').reduce((acc, digit) => acc + Number(digit), 0);
		while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
			sum = sum
				.toString()
				.split('')
				.reduce((acc, digit) => acc + Number(digit), 0);
		}
		return interpretNumber(sum);
	};

	const calculateDestinyNumber = (name) => {
		const nameValues = [];
		let nameValue = 0;

		name
			.toLowerCase()
			.split('')
			.forEach((char) => {
				const charCode = char.charCodeAt(0);
				if (charCode >= 97 && charCode <= 122) {
					const value = charCode - 96;
					nameValue += value;
					nameValues.push({ char, value });
				} else {
					nameValues.push({ char, value: 0 });
				}
			});

		const { number, meaning } = reduceToSingleDigit(nameValue);
		return { number, meaning, breakdown: nameValues };
	};

	const calculateSoulUrgeNumber = (name) => {
		const vowels = 'aeiou';
		const vowelValues = [];
		let vowelValue = 0;

		name
			.toLowerCase()
			.split('')
			.forEach((char) => {
				if (vowels.includes(char)) {
					const value = char.charCodeAt(0) - 96;
					vowelValue += value;
					vowelValues.push({ char, value });
				} else {
					vowelValues.push({ char, value: 0 });
				}
			});

		const { number, meaning } = reduceToSingleDigit(vowelValue);
		return { number, meaning, breakdown: vowelValues };
	};

	const calculatePersonalityNumber = (name) => {
		const vowels = 'aeiou';
		const consonantValues = [];
		let consonantValue = 0;

		name
			.toLowerCase()
			.split('')
			.forEach((char) => {
				if (
					!vowels.includes(char) &&
					char.charCodeAt(0) >= 97 &&
					char.charCodeAt(0) <= 122
				) {
					const value = char.charCodeAt(0) - 96;
					consonantValue += value;
					consonantValues.push({ char, value });
				} else {
					consonantValues.push({ char, value: 0 });
				}
			});

		const { number, meaning } = reduceToSingleDigit(consonantValue);
		return { number, meaning, breakdown: consonantValues };
	};

	const reduceToSingleDigit = (num) => {
		let sum = num;
		while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
			sum = sum
				.toString()
				.split('')
				.reduce((acc, digit) => acc + Number(digit), 0);
		}
		return interpretNumber(sum);
	};

	const interpretNumber = (number) => {
		const meanings = {
			1: 'The Leader: Independent, ambitious, and creative',
			2: 'The Mediator: Cooperative, diplomatic, and sensitive',
			3: 'The Expressive: Creative, social, and optimistic',
			4: 'The Builder: Practical, trustworthy, and hardworking',
			5: 'The Freedom Seeker: Adventurous, versatile, and progressive',
			6: 'The Nurturer: Responsible, caring, and harmonious',
			7: 'The Seeker: Analytical, introspective, and spiritual',
			8: 'The Achiever: Ambitious, successful, and material-oriented',
			9: 'The Humanitarian: Compassionate, artistic, and selfless',
			11: 'The Intuitive: Inspirational, idealistic, and visionary',
			22: 'The Master Builder: Practical visionary, powerful achiever',
			33: 'The Master Teacher: Nurturing, selfless, and inspiring',
		};
		return { number, meaning: meanings[number] || 'Invalid number' };
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-orange-50 to-white'>
			<div className='container px-4 py-12 mx-auto'>
				<h1 className='mb-8 text-4xl font-bold text-center text-orange-900'>
					Free Numerology Calculator
				</h1>

				<Card className='max-w-3xl mx-auto border-orange-200 shadow-lg'>
					<CardHeader>
						<CardTitle className='text-2xl text-orange-800'>
							Calculate Your Numbers
						</CardTitle>
						<CardDescription>
							Enter your full name and birth date to discover your numerological
							profile
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-6'>
						<div className='space-y-2'>
							<Label htmlFor='fullname' className='text-orange-900'>
								Full Name
							</Label>
							<Input
								id='fullname'
								type='text'
								value={fullName}
								onChange={(e) => setFullName(e.target.value)}
								className='border-orange-200 focus:ring-orange-500'
								placeholder='Enter your full name as given at birth'
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='birthdate' className='text-orange-900'>
								Birth Date
							</Label>
							<Input
								id='birthdate'
								type='date'
								value={birthDate}
								onChange={(e) => setBirthDate(e.target.value)}
								className='border-orange-200 focus:ring-orange-500'
							/>
						</div>

						{error && (
							<Alert variant='destructive' className='mt-4'>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						<Button
							onClick={calculateNumerology}
							className='w-full transition-colors bg-orange-500 hover:bg-orange-600'
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader2 className='w-4 h-4 mr-2 animate-spin' />
									Calculating...
								</>
							) : (
								'Calculate Your Numbers'
							)}
						</Button>
					</CardContent>
				</Card>

				<AnimatePresence>
					{Object.entries(results).length > 0 && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className='max-w-3xl mx-auto mt-8 space-y-6'
						>
							{Object.entries(results).map(([key, value]) => (
								<Card
									key={key}
									className='overflow-hidden border-orange-200 shadow-md'
								>
									<CardHeader className='bg-gradient-to-r from-orange-100 to-orange-50'>
										<CardTitle className='text-xl text-orange-900 capitalize'>
											{key.replace(/([A-Z])/g, ' $1').trim()} Number
										</CardTitle>
									</CardHeader>
									<CardContent className='p-6'>
										<div className='space-y-4'>
											<div className='flex items-center justify-center p-6 text-4xl font-bold text-orange-500 rounded-lg bg-orange-50'>
												{value.number}
											</div>

											<p className='text-lg text-center text-gray-700'>
												{value.meaning}
											</p>

											{value.breakdown && (
												<div className='mt-6'>
													<h4 className='mb-3 text-sm font-semibold text-orange-900'>
														Number Calculation
													</h4>
													<div className='grid grid-cols-2 gap-2 p-4 rounded-lg bg-orange-50 md:grid-cols-4 lg:grid-cols-6'>
														{value.breakdown.map(
															({ char, value: charValue }, index) => (
																<div
																	key={index}
																	className='flex items-center justify-between p-2 text-sm bg-white rounded shadow'
																>
																	<span className='font-medium'>{char}</span>
																	<span className='text-orange-600'>
																		{charValue}
																	</span>
																</div>
															)
														)}
													</div>
													<p className='mt-3 text-sm text-gray-600'>
														Total:{' '}
														{value.breakdown.reduce(
															(acc, item) => acc + item.value,
															0
														)}
													</p>
												</div>
											)}
										</div>
									</CardContent>
								</Card>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
