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
			name: 'Sarabjit Singh',
			designation: 'Entrepreneur',
			text: 'Highly Recommend! Life-Changing Results. I recently had the privilege of receiving career and finance consultation, as well as mobile number consultation, from Prakritii Vermaa, and the results have been nothing short of amazing! Her deep knowledge in numerology and insightful guidance have brought a significant positive shift in my life.',
		},
		{
			name: 'Pinky Kumari',
			designation: 'Homemaker',
			text: 'From the moment I consulted her, she provided clear direction and remedies, which were easy to implement. I can already see improvements in both my career and financial situation, and even subtle changes in my personal energy and overall well-being. Her remedies also helped align things perfectly.',
		},
		{
			name: 'Himanshu Kumar',
			designation: 'Student',
			text: "I highly recommend Prakritii Vermaa to anyone seeking life transformation through numerology. Her approach is both professional and compassionate. I'm truly grateful for her expertise and support!",
		},
		{
			name: 'Manisha Singh',
			designation: 'Teacher',
			text: "Prakritii Vermaa's numerology consultation was insightful and transformative. Her guidance helped me gain clarity and direction in both personal and professional aspects. Highly recommend her expertise.",
		},
	];

	if (!mounted) return null;

	return (
		<div className='px-4 py-12 bg-gradient-to-r from-orange-100 to-orange-200 sm:px-6 lg:px-8'>
			<h2 className='mb-8 text-3xl font-bold text-orange-600'>
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
							<CardContent className='flex flex-col justify-between h-full p-6 min-h-48'>
								<p className='mb-4 text-gray-600 line-clamp-4 '>
									&quot;{testimonial.text}&quot;
								</p>
								<p className='font-semibold text-orange-600'>
									{testimonial.name}, {testimonial?.designation}
								</p>
							</CardContent>
						</Card>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
