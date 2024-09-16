import Image from 'next/image';
import { Star } from 'lucide-react';

export default function StylishTestimonial() {
	return (
		<div className='px-4 py-12 bg-gradient-to-r from-orange-100 to-orange-200'>
			<div className='max-w-6xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl'>
				<div className='flex flex-col md:flex-row'>
					<div className='flex items-center justify-center p-8 bg-orange-500 md:w-2/5'>
						<h2 className='text-3xl font-bold leading-tight text-center text-white'>
							Hear What Our Star Client Has to Say About Us
						</h2>
					</div>
					<div className='p-8 md:w-3/5'>
						<div className='flex justify-center mb-4'>
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className='w-6 h-6 text-yellow-400 fill-current'
								/>
							))}
						</div>
						<blockquote className='mb-6 text-xl italic font-light text-center text-gray-600'>
							&quot;Ms. Prakritii Vermaa&apos;s counseling{' '}
							<span className='font-bold text-orange-500'>transformed</span> my
							personal and professional life. Her{' '}
							<span className='font-bold text-orange-500'>
								business insights
							</span>{' '}
							and{' '}
							<span className='font-bold text-orange-500'>name correction</span>{' '}
							enhanced my success, while her{' '}
							<span className='font-bold text-orange-500'>
								relationship guidance
							</span>{' '}
							was invaluable. I&apos;m{' '}
							<span className='font-bold text-orange-500'>grateful</span> for
							the positive impact and highly recommend her{' '}
							<span className='font-bold text-orange-500'>
								transformative support
							</span>
							.&quot;
						</blockquote>
						<div className='flex items-center space-x-4'>
							<div className='relative w-16 h-16 overflow-hidden rounded-full'>
								<Image
									src='/images/testimonials/ap.jpg'
									alt='Archana Ji'
									layout='fill'
									objectFit='cover'
								/>
							</div>
							<div>
								<p className='text-xl font-semibold text-gray-800'>
									Archanna A Singh
								</p>
								<p className='text-sm text-gray-600'>Entrepreneur</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
