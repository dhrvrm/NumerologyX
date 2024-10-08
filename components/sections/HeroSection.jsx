import { cn } from '../../lib/utils';
import AnimatedGradientText from '../magicui/animated-gradient-text';
import GetStartedButton from '../animata/button/get-started-button';
import ShinyButton from '../magicui/shiny-button';
import Image from 'next/image';

const HeroSection = () => {
	return (
		<section className='grid grid-cols-1 md:grid-cols-[60%_40%] gap-4 pt-10 pb-0 md:pb-10'>
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
				<h1 className='max-w-xl mb-2 text-4xl md:text-6xl'>
					Your{' '}
					<span className='text-transparent bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text'>
						Path
					</span>
					, Revealed Through{' '}
					<span className='text-transparent bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text'>
						Numbers
					</span>
				</h1>
				<p className='max-w-xl text-lg'>
					Experience accurate predictions and personalized guidance with expert
					numerology and astrology. Transform your future today with a
					one-on-one consultation.
				</p>
				<div className='flex flex-col items-baseline gap-4 mt-8 cta-group lg:flex-row'>
					<GetStartedButton
						text='Book Your Consultation'
						className='w-max whitespace-nowrap'
					/>
					<ShinyButton text='Explore Free Tools' className='' />
				</div>
			</div>
			<div className='mt-[-100px] z-[-1] md:mt-0'>
				<Image
					src='/images/prakriti-hero-600.png'
					alt='Prakritii Vermaa Ace Numerelogist Picture'
					width={400}
					height={600}
					quality={100}
				/>
			</div>
		</section>
	);
};

export default HeroSection;
