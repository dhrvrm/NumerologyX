import { cn } from '../../lib/utils';
import AnimatedGradientText from '../magicui/animated-gradient-text';
import GetStartedButton from '../animata/button/get-started-button';
import ShinyButton from '../magicui/shiny-button';
import Image from 'next/image';
import { Star } from 'lucide-react';

const TestimonialBox = ({ className, name, message }) => (
	<div
		className={cn(
			'group cursor-pointer transition-all duration-300 hover:scale-105 z-[12]',
			'md:absolute',
			'relative mb-4 mx-4 md:mx-0',
			className
		)}
	>
		<div className='relative flex items-center'>
			<div className='relative'>
				<div className='w-2 h-2 bg-orange-400 rounded-full shadow-sm shadow-orange-400/50 animate-pulse'></div>
				<div className='absolute rounded-full -inset-1 bg-orange-400/30 animate-ping'></div>
			</div>
			<div className='ml-2 p-4 rounded-lg shadow-xl max-w-[250px] border border-white/20 bg-white/10 backdrop-blur-md'>
				<p className='text-sm font-medium text-gray-800'>{message}</p>
				<span className='block mt-2 text-xs font-semibold text-orange-500'>
					{name}
				</span>
			</div>
		</div>
	</div>
);

const RatingStars = () => (
	<div className='flex items-center gap-1'>
		{[...Array(5)].map((_, i) => (
			<Star
				key={i}
				className={cn(
					'w-4 h-4',
					i < 5 ? 'fill-orange-400 text-orange-400' : 'text-gray-300'
				)}
			/>
		))}
	</div>
);

const HeroSection = () => {
	return (
		<section className='grid grid-cols-1 md:grid-cols-[60%_40%] gap-4 pt-10 pb-0 md:pb-10'>
			<div className='flex flex-col items-start justify-center'>
				<AnimatedGradientText className='my-2 text-sm'>
					🎉 <hr className='mx-2 h-4 w-[1px] shrink-0 bg-gray-300' />{' '}
					<span
						className={cn(
							'inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent'
						)}
					>
						Introductory offer 50% off
					</span>
				</AnimatedGradientText>
				<h1 className='max-w-xl mb-6 text-4xl md:text-6xl'>
					Your{' '}
					<span className='text-transparent bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text'>
						Path
					</span>
					, Revealed Through{' '}
					<span className='text-transparent bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text'>
						Numbers
					</span>
				</h1>
				<p className='max-w-xl mb-12 text-lg'>
					Experience accurate predictions and personalized guidance with expert
					numerology and astrology. Transform your future today with a
					one-on-one consultation.
				</p>
				<div className='flex flex-col items-baseline gap-4 mb-6 cta-group lg:flex-row'>
					<GetStartedButton
						text='Book Your Consultation'
						className='w-max whitespace-nowrap'
					/>
					<ShinyButton text='Explore Free Tools' />
				</div>
				<div className='flex items-center gap-2 text-sm text-gray-600'>
					<RatingStars />
					<span className='font-medium'>4.7</span>
					<span className='text-gray-400'>•</span>
					<span>Verified by 200+ users</span>
				</div>
			</div>
			<div className='relative'>
				{/* Testimonials container for mobile */}
				<div className='mt-20 mb-8 md:hidden'>
					<TestimonialBox
						name='Ms. M. Sharma'
						message="Thank you Ma'am. I got the job!"
					/>
					<TestimonialBox
						name='Mr. R. Patel'
						message='Numerology Consultations changed my life completely.'
					/>
					<TestimonialBox
						name='Mrs. K. Singh'
						message='The career guidance was spot on. Highly recommended!'
					/>
				</div>

				<Image
					src='/images/prakriti-hero-600.webp'
					alt='Akreti Verma Ace Numerelogist Picture'
					loading='eager'
					width={400}
					height={600}
					quality={100}
					className='relative z-10'
				/>

				{/* Desktop testimonials */}
				<div className='hidden md:block'>
					<TestimonialBox
						className='top-[20%] left-[-120px]'
						name='Ms. M. Sharma'
						message="Thank you Ma'am. I got the job!"
					/>
					<TestimonialBox
						className='top-[0%] left-[100px]'
						name='Mr. R. Patel'
						message='Numerology Consultations changed my life completely.'
					/>
					<TestimonialBox
						className='bottom-[25%] left-[-150px]'
						name='Mrs. K. Singh'
						message='The career guidance was spot on. Highly recommended!'
					/>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
