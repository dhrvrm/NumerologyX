'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent } from '../../../../components/ui/card';

export default function ConsultationPageClient({ consultation }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div className='min-h-screen px-4 py-12 bg-gradient-to-br from-gray-100 to-gray-200 sm:px-6 lg:px-8'>
			<div className='mx-auto max-w-7xl'>
				<Link href='/consultations' passHref>
					<Button
						variant='ghost'
						className='mb-8 text-gray-800 hover:text-orange-600'
					>
						<ArrowLeft className='w-4 h-4 mr-2' />
						Back to Services
					</Button>
				</Link>

				<div className='grid grid-cols-1 gap-12 lg:grid-cols-3'>
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className='lg:col-span-1'
					>
						<Card className='overflow-hidden'>
							<div className='relative aspect-[4/3]'>
								<Image
									src={consultation.image}
									alt={consultation.title}
									title={consultation.title}
									layout='fill'
									objectFit='cover'
								/>
							</div>
							<CardContent className='p-6'>
								<h1 className='flex items-center mb-4 text-3xl font-bold text-gray-800'>
									{consultation.title}
								</h1>
								<p className='mb-6 text-gray-600'>{consultation.description}</p>
								<div className='flex flex-wrap items-center justify-between gap-2 mb-6'>
									<div>
										<span className='text-xl font-bold text-gray-800'>
											<span className=''>Energy Exchange:</span> ₹
											{consultation.currentPrice}
										</span>
										<span className='ml-2 text-sm text-gray-500 line-through'>
											₹{consultation.actualPrice}
										</span>
									</div>
								</div>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button
										size='lg'
										className='w-full text-white transition-all duration-300 bg-orange-600 hover:bg-orange-700'
										onMouseEnter={() => setIsHovered(true)}
										onMouseLeave={() => setIsHovered(false)}
									>
										{isHovered
											? 'Transform Your Life Now'
											: 'Book Your Consultation'}
										<Sparkles className='w-5 h-5 ml-2' />
									</Button>
								</motion.div>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className='lg:col-span-2'
					>
						<Card>
							<CardContent className='p-6'>
								<h2 className='mb-4 text-2xl font-semibold text-gray-800'>
									Benefits
								</h2>
								<ul className='grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2'>
									{consultation.benefits.map((benefit, index) => (
										<motion.li
											key={index}
											className='flex items-center p-3 rounded-lg bg-orange-50'
											whileHover={{ scale: 1.05 }}
											transition={{ type: 'spring', stiffness: 300 }}
										>
											<CheckCircle className='flex-shrink-0 w-5 h-5 mr-2 text-orange-600' />
											<span className='text-gray-700'>{benefit}</span>
										</motion.li>
									))}
								</ul>

								<h2 className='mb-4 text-2xl font-semibold text-gray-800'>
									What We Offer
								</h2>
								<ul className='space-y-4'>
									{consultation.offering.map((offer, index) => (
										<motion.li
											key={index}
											className='flex items-center'
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.5, delay: index * 0.1 }}
										>
											<div className='p-2 mr-4 bg-orange-100 rounded-full'>
												<span className='font-bold text-orange-600'>
													{index + 1}
												</span>
											</div>
											<span className='text-gray-700'>{offer}</span>
										</motion.li>
									))}
								</ul>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
