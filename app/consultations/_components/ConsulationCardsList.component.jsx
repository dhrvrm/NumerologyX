'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from '../../../components/ui/card';

import { consultations } from '../../../lib/Consulations';

const ConsultationCard = ({ consultation, index }) => {
	const [isHovered, setIsHovered] = useState(false);

	const discountPercentage = Math.round(
		((consultation.actualPrice - consultation.currentPrice) /
			consultation.actualPrice) *
			100
	);

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
		>
			<Link href={consultation.link} passHref>
				<Card
					className='h-full overflow-hidden transition-all duration-300 transform cursor-pointer hover:scale-105 hover:shadow-2xl'
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<div className='relative overflow-hidden aspect-[4/3]'>
						<Image
							src={consultation.image}
							alt={consultation.title}
							title={consultation.title}
							layout='fill'
							objectFit='cover'
							className='transition-transform duration-300 hover:scale-110'
						/>
						<div className='absolute top-0 right-0 px-2 py-1 m-2 text-xs text-white bg-red-500 rounded'>
							{discountPercentage}% OFF
						</div>
					</div>
					<CardHeader>
						<h2 className='text-xl font-medium text-gray-800'>
							{consultation.title}
						</h2>
					</CardHeader>
					<CardContent>
						<CardDescription className='text-gray-600 line-clamp-3'>
							{consultation.description}
						</CardDescription>
					</CardContent>
				</Card>
			</Link>
		</motion.div>
	);
};

export default function ConsultationCards() {
	return (
		<section className='py-12 bg-gray-50'>
			<div className='container px-4 mx-auto'>
				<motion.h1
					className='mb-8 text-3xl font-medium text-gray-800'
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					Our Consultation Services
				</motion.h1>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
					{consultations?.map((consultation, index) => (
						<ConsultationCard
							key={index}
							consultation={consultation}
							index={index}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
