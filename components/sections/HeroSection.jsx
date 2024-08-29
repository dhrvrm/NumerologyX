import { cn } from '../../lib/utils';
import AnimatedGradientText from '../magicui/animated-gradient-text';
import GetStartedButton from '../animata/button/get-started-button';
import ShinyButton from '../magicui/shiny-button';
import Image from 'next/image';

const HeroSection = () => {
	return (
		<section className='grid grid-cols-1 md:grid-cols-[60%_40%] gap-4'>
			<div className='flex flex-col items-start justify-center'>
				<AnimatedGradientText className='my-2 text-sm'>
					🎉 <hr className='mx-2 h-4 w-[1px] shrink-0 bg-gray-300' />{' '}
					<span
						className={cn(
							`inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
						)}
					>
						Introductory offer 50% off
					</span>
				</AnimatedGradientText>
				<h1 className='mb-2 text-4xl'>Your Path, Revealed Through Numbers</h1>
				<p className='max-w-xl'>
					Experience accurate predictions and personalized guidance with expert
					numerology and astrology. Transform your future today with a
					one-on-one consultation.
				</p>
				<div className='flex flex-col items-baseline gap-4 mt-8 cta-group lg:flex-row'>
					<GetStartedButton
						text='Book Your Consultation @ 599 only'
						className='w-max whitespace-nowrap'
					/>
					<ShinyButton text='Explore Free Tools' className='' />
				</div>
			</div>
			<div className=''>
				<Image
					src='/images/hero-image.png'
					alt='Prakriti Verma Ace Numerelogist Picture'
					width={400}
					height={600}
				/>
			</div>
		</section>
	);
};

export default HeroSection;
