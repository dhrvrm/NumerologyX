'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default function TestimonialsSection() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const testimonials = [
		{
			name: 'Sarah J.',
			text: "Prakritii's numerology reading was eye-opening. It helped me understand myself better and make important life decisions.",
		},
		{
			name: 'Michael R.',
			text: "The career guidance I received was spot-on. I'm now on a path that aligns perfectly with my numerological profile.",
		},
		{
			name: 'Emily L.',
			text: "Thanks to Prakritii's relationship compatibility analysis, I've found harmony in my personal life.",
		},
		{
			name: 'David K.',
			text: "Prakritii's insights into my business numerology have been invaluable. My company has seen significant growth since our consultation.",
		},
		{
			name: 'Lisa M.',
			text: "The name correction consultation for my baby was fascinating. We feel confident we've chosen the perfect name for our child's future.",
		},
	];

	if (!mounted) return null;

	return (
		<div className='px-4 py-12 bg-gradient-to-r from-orange-100 to-orange-200 sm:px-6 lg:px-8'>
			<h2 className='mb-8 text-3xl font-bold text-center text-orange-600'>
				What Clients Say
			</h2>
			<Swiper
				modules={[Autoplay]}
				spaceBetween={30}
				slidesPerView={1}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				pagination={{ clickable: true }}
				breakpoints={{
					640: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 3,
					},
				}}
			>
				{testimonials.map((testimonial, index) => (
					<SwiperSlide key={index}>
						<Card className='h-full overflow-hidden bg-white rounded-lg shadow-lg'>
							<CardContent className='flex flex-col justify-between h-full p-6 min-h-40'>
								<p className='mb-4 text-gray-600'>
									&quot;{testimonial.text}&quot;
								</p>
								<p className='font-semibold text-orange-600'>
									{testimonial.name}
								</p>
							</CardContent>
						</Card>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
