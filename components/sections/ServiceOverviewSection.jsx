'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
	ArrowRight,
	Briefcase,
	Heart,
	Brain,
	Activity,
	Compass,
	Star,
	Search,
} from 'lucide-react';
import GetStartedButton from '../animata/button/get-started-button';

const problems = [
	{
		title: 'Career and Finance',
		description: 'Navigate Your Career and Finances with Confidence',
		href: '/consultations/career-and-finance-counseling',
		icon: Briefcase,
		color: 'text-orange-500',
	},
	{
		title: 'Relationships and Love',
		description: 'Enhance Your Relationships and Love Life',
		href: '/consultations/relationship-counseling',
		icon: Heart,
		color: 'text-orange-400',
	},
	{
		title: 'Personal Development',
		description: 'Discover Your True Self and Achieve Your Goals',
		href: '/consultations/personal-consultation',
		icon: Brain,
		color: 'text-orange-500',
	},
	{
		title: 'Health and Wellbeing',
		description: 'Prioritize Your Health and Wellbeing',
		href: '/consultations/personal-consultation',
		icon: Activity,
		color: 'text-orange-400',
	},
	{
		title: 'Life Events and Decisions',
		description: 'Make Informed Life Decisions with Confidence',
		href: '/consultations/business-consultation',
		icon: Compass,
		color: 'text-orange-500',
	},
	{
		title: 'Luck and Fortune',
		description: 'Harness Your Personal Luck and Fortune',
		href: '/consultations/yantra-recommendation',
		icon: Star,
		color: 'text-orange-400',
	},
];

const consultationTypes = [
	{
		title: 'Numerology Consultation',
		description:
			'Personalized analysis to reveal deep insights into your life path and purpose.',
		href: '/consultations/personal-consultation',
		benefits: [
			'Clarity on your life path and purpose',
			'Opportunities for personal and professional growth',
			'Practical strategies for overcoming challenges',
		],
		image: '/images/services/personal-consultation.webp',
	},
	{
		title: 'Mobile Number Correction/Suggestion',
		description:
			'Optimize your mobile number’s energy to align with your numerology and enhance life’s potential.',
		href: '/consultations/mobile-number-correction',
		benefits: [
			'Improved personal and professional relationships',
			'Increased luck and opportunities',
			'Enhanced mental clarity and decision-making',
		],
		image: '/images/services/mobile-number-correction.webp',
	},
	{
		title: 'Name Correction',
		description:
			'Align your name’s vibrational energy with your life goals for improved harmony and success.',
		href: '/consultations/name-correction',
		benefits: [
			'Improved relationships and confidence',
			'Enhanced opportunities and success',
			'Greater harmony and balance in life',
		],
		image: '/images/services/name-correction.webp',
	},
];

export default function ServiceOverviewSection() {
	return (
		<section className='container px-4 py-16 mx-auto'>
			<div className='mb-16'>
				<h2 className='mb-4 text-4xl font-medium'>
					<span className='text-transparent bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text'>
						Unlock Your Potential
					</span>{' '}
					with Our Guidance
				</h2>
				<p className='max-w-3xl mb-8 text-lg text-gray-600'>
					Life&apos;s challenges can be overwhelming, but you don&apos;t have to
					face them alone. Our expert consultations offer the clarity and
					direction you need to thrive in all aspects of your life.
				</p>
				<GetStartedButton
					text='View all consultations'
					className='mt-4 w-max whitespace-nowrap'
				/>
			</div>

			<div className='space-y-16'>
				<div id='problems'>
					<h3 className='mb-8 text-2xl font-medium text-orange-600'>
						Problem Areas We Address
					</h3>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-6'
					>
						{problems.map((problem, index) => (
							<Card
								key={index}
								className='overflow-hidden transition-colors border-orange-200 group hover:border-orange-400'
							>
								<Link href={problem.href}>
									<CardHeader
										className={`${problem.color} bg-opacity-10 transition-colors group-hover:bg-opacity-20`}
									>
										<problem.icon className={`h-8 w-8 ${problem.color}`} />
										<h4 className='mt-4'>{problem.title}</h4>
									</CardHeader>
									<CardContent>
										<p className='text-gray-600'>{problem.description}</p>
									</CardContent>
								</Link>
							</Card>
						))}
					</motion.div>
				</div>

				<div id='consultations'>
					<h3 className='mb-8 text-2xl font-medium text-orange-600'>
						Our Consultation Types
					</h3>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className='grid grid-cols-1 gap-8 md:grid-cols-2'
					>
						{consultationTypes.map((type, index) => (
							<Card
								key={index}
								className='overflow-hidden transition-colors border-b-0 border-orange-200 hover:border-orange-400'
							>
								<div className='relative'>
									<div
										className='absolute top-0 right-0 w-2/3 h-full bg-right bg-cover md:w-1/3'
										style={{
											backgroundImage: `url(${type.image})`,
										}}
									></div>
									<div
										className='absolute top-0 right-0 w-2/3 h-full md:w-1/3'
										style={{
											background:
												'linear-gradient(to right, white, rgba(255,255,255,0))',
										}}
									></div>
									<CardHeader className='relative z-10'>
										<h4 className='text-xl text-orange-600'>{type.title}</h4>
									</CardHeader>
									<CardContent className='relative z-10'>
										<p className='max-w-lg mb-4 text-gray-600'>
											{type.description}
										</p>
										<ul className='space-y-2'>
											{type.benefits.map((benefit, i) => (
												<li key={i} className='flex items-center'>
													<ArrowRight className='w-4 h-4 mr-2 text-orange-500' />
													<span className='text-gray-700'>{benefit}</span>
												</li>
											))}
										</ul>
									</CardContent>
									<CardFooter className='relative z-10 p-6 pt-0'>
										<Button
											asChild
											className='text-white bg-orange-600 hover:bg-orange-700'
										>
											<Link href={type.href}>Learn more</Link>
										</Button>
									</CardFooter>
								</div>
							</Card>
						))}
						<Card className='overflow-hidden text-white bg-gradient-to-br from-orange-500 to-orange-600'>
							<CardHeader>
								<CardTitle>Explore All Consultations</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='mb-4'>
									Discover our full range of consultation services tailored to
									your unique needs and aspirations.
								</p>
								<Search className='w-16 h-16 mb-4' />
							</CardContent>
							<CardFooter className='p-6 pt-0'>
								<Button
									variant='secondary'
									asChild
									className='text-orange-600 bg-white hover:bg-orange-100'
								>
									<Link href='/consultations'>View All Consultations</Link>
								</Button>
							</CardFooter>
						</Card>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
