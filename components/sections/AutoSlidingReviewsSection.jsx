'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';

const reviews = [
	{
		product: 'Crystal Tree',
		text: "This crystal tree is absolutely stunning! It's brought such a peaceful energy to my home. Totally worth the purchase!",
		author: 'Priya Sharma',
	},
	{
		product: 'Pyrite Stone',
		text: "Love my new pyrite stone! It's got this amazing, natural look and feels really powerful. Great addition to my collection.",
		author: 'Arjun Patel',
	},
	{
		product: 'Rose Quartz Ducks',
		text: "These rose quartz ducks are so cute! They've added such a loving touch to our home. The whole family is in love with them.",
		author: 'Ananya Singh',
	},
	{
		product: 'Amethyst Bracelet',
		text: "This amethyst bracelet is gorgeous! It's not just beautiful, it actually helps me feel more calm. I'm wearing it every day now!",
		author: 'Ravi Gupta',
	},
	{
		product: 'Tiger Eye Bracelet',
		text: "The tiger eye bracelet is my new favorite! It looks fantastic and somehow boosts my confidence. I'm really happy with this purchase.",
		author: 'Simran Kaur',
	},
	{
		product: 'Rose Quartz Bracelet',
		text: "This rose quartz bracelet is so lovely! It's delicate, beautiful, and seems to bring more harmony into my day. Absolutely love it!",
		author: 'Neha Reddy',
	},
	{
		product: 'Pyrite Bracelet',
		text: "Really impressed with this pyrite bracelet! It's got a great weight to it and looks super stylish. Feeling extra motivated wearing it!",
		author: 'Vikram Malhotra',
	},
	{
		product: 'Education Bracelet',
		text: "This education bracelet is awesome! Don't know if it's just me, but I swear I focus better during study sessions now. Plus, it looks cool!",
		author: 'Aisha Kapoor',
	},
];

const ReviewCard = ({ review }) => (
	<Card className='h-full w-[300px] flex-shrink-0 mx-2'>
		<CardContent className='p-4'>
			<Badge variant='secondary' className='mb-2'>
				{review.product}
			</Badge>
			<p className='mb-2 text-sm'>{review.text}</p>
			<p className='text-xs text-gray-500'>- {review.author}</p>
		</CardContent>
	</Card>
);

const SlidingRow = ({ reviews, direction }) => {
	return (
		<motion.div
			className='flex'
			initial={{ x: direction === 'left' ? '0%' : '-100%' }}
			animate={{ x: direction === 'left' ? '-100%' : '0%' }}
			transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
		>
			{reviews.map((review, index) => (
				<ReviewCard key={index} review={review} />
			))}
			{reviews.map((review, index) => (
				<ReviewCard key={`duplicate-${index}`} review={review} />
			))}
		</motion.div>
	);
};

const AutoSlidingReviews = () => {
	const firstHalf = reviews.slice(0, Math.ceil(reviews.length / 2));
	const secondHalf = reviews.slice(Math.ceil(reviews.length / 2));

	return (
		<div className='w-full py-12 overflow-hidden bg-gradient-to-r from-orange-100 to-orange-200'>
			<div className='container px-4 mx-auto'>
				<h2 className='mb-8 text-3xl font-bold text-orange-600 text'>
					What Our Customers Say
				</h2>
				<div className='space-y-8'>
					<SlidingRow reviews={firstHalf} direction='left' />
					<SlidingRow reviews={secondHalf} direction='right' />
				</div>
			</div>
		</div>
	);
};

export default AutoSlidingReviews;
