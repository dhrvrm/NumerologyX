import Image from 'next/image';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { StarIcon, AwardIcon, Users, Target } from 'lucide-react';
import ServicesOffered from './_components/ServicesOffered.component';
import Link from 'next/link';

export const metadata = {
	title: 'Prakritii Vermaa | Numerology Expert',
	description:
		'Achieve and excel through the cosmic compass of numbers with Prakritii Vermaa. Over 10 years of experience in helping individuals unlock their true potential through personalized numerology consultations.',
	keywords:
		'numerology, numerology expert, life path, name correction, numerology consultations, spiritual guidance, career guidance, personal growth',
	openGraph: {
		title: 'Prakritii Vermaa | Numerology Expert',
		description:
			'With over 10 years of experience, Prakritii Vermaa offers personalized numerology consultations to unlock your true potential. Book a consultation today.',
		type: 'website',
		url: 'https://www.adeptnumero.in/about',
		image: 'https://www.adeptnumero.in/images/social/about-banner.png',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Prakritii Vermaa | Numerology Expert',
		description:
			'With over 10 years of experience, Prakritii Vermaa offers personalized numerology consultations to unlock your true potential. Book a consultation today.',
		image: 'https://www.adeptnumero.in/images/social/about-banner.png',
	},
};

export default function AboutPage() {
	return (
		<div className='min-h-screen text-gray-800 bg-white'>
			<header className='px-4 py-12 text-orange-600 bg-gradient-to-r from-orange-100 to-orange-200 sm:px-6 lg:px-8'>
				<div className='max-w-4xl mx-auto text-center'>
					<h1 className='mb-2 text-4xl font-bold'>Prakritii Vermaa</h1>
					<p className='text-xl'>
						Achieve and Excel through cosmic compass of numbers
					</p>
				</div>
			</header>

			<main className='max-w-4xl px-4 py-12 mx-auto sm:px-6 lg:px-8'>
				<div className='grid items-center grid-cols-1 gap-12 mb-16 md:grid-cols-2'>
					<Image
						src='/images/prakriti-about.jpg'
						alt='Prakritii Vermaa'
						width={400}
						height={400}
						className='rounded-full shadow-lg'
						quality={100}
					/>
					<div>
						<h2 className='mb-4 text-3xl font-bold text-orange-600'>
							About Me
						</h2>
						<p className='mb-4 text-lg'>
							With over 10 years of experience in numerology, I&apos;ve helped
							thousands of individuals unlock their true potential and find
							their path in life.
						</p>
						<p className='mb-4 text-lg'>
							My journey into numerology began when I discovered its profound
							impact on my own life. Since then, I&apos;ve dedicated myself to
							mastering this ancient science and sharing its wisdom with others.
						</p>
						<Link href='/consultations'>
							<Button className='px-4 py-2 font-bold text-white bg-orange-600 hover:bg-orange-700'>
								Book a Consultation
							</Button>
						</Link>
					</div>
				</div>

				<Card className='mb-16 bg-orange-50'>
					<CardHeader>
						<CardTitle className='text-2xl text-orange-600'>
							My Approach
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='mb-4 text-gray-700'>
							I believe that numerology is more than just assigning meaning to
							numbers. It&apos;s about uncovering the hidden patterns in your
							life and using that knowledge to make informed decisions.
						</p>
						<ul className='space-y-2 list-none'>
							<li className='flex items-center'>
								<StarIcon className='mr-2 text-orange-600' />
								<span>
									Personalized analysis tailored to your unique numerological
									profile
								</span>
							</li>
							<li className='flex items-center'>
								<StarIcon className='mr-2 text-orange-600' />
								<span>
									Practical advice for applying numerological insights in daily
									life
								</span>
							</li>
							<li className='flex items-center'>
								<StarIcon className='mr-2 text-orange-600' />
								<span>
									Ongoing support to help you navigate life&apos;s challenges
								</span>
							</li>
						</ul>
					</CardContent>
				</Card>

				<div className='mb-16'>
					<h2 className='mb-8 text-3xl font-bold text-center text-orange-600'>
						Achievements
					</h2>
					<div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
						<Card className='bg-orange-50'>
							<CardContent className='p-6 text-center'>
								<AwardIcon className='w-12 h-12 mx-auto mb-4 text-orange-600' />
								<h3 className='mb-2 text-xl font-semibold'>
									Certified Numerology Expert
								</h3>
								<p>Trusted by clients worldwide</p>
							</CardContent>
						</Card>
						<Card className='bg-orange-50'>
							<CardContent className='p-6 text-center'>
								<Users className='w-12 h-12 mx-auto mb-4 text-orange-600' />
								<h3 className='mb-2 text-xl font-semibold'>
									500+ Satisfied Clients
								</h3>
								<p>Helped hundreds achieve personal growth and insight</p>
							</CardContent>
						</Card>
						<Card className='bg-orange-50'>
							<CardContent className='p-6 text-center'>
								<Target className='w-12 h-12 mx-auto mb-4 text-orange-600' />
								<h3 className='mb-2 text-xl font-semibold'>
									99% Accuracy Rate
								</h3>
								<p>Consistently delivering precise numerological readings</p>
							</CardContent>
						</Card>
					</div>
				</div>

				<Card className='mb-16'>
					<CardHeader>
						<CardTitle className='text-2xl text-orange-600'>
							My Commitment
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='mb-4 text-gray-700'>
							Your growth and success are my top priorities. I&apos;m committed
							to providing you with:
						</p>
						<ul className='space-y-2 text-gray-700 list-disc list-inside'>
							<li>Accurate and insightful numerology readings</li>
							<li>
								Practical guidance for personal and professional development
							</li>
							<li>
								A supportive and non-judgmental environment for your journey
							</li>
							<li>
								Continuous learning and improvement in my practice to serve you
								better
							</li>
						</ul>
					</CardContent>
				</Card>

				<ServicesOffered />

				<div className='mt-16 text-center'>
					<h2 className='mb-4 text-3xl font-bold text-orange-600'>
						Ready to Discover Your Path?
					</h2>
					<p className='mb-8 text-lg'>
						Let&apos;s embark on this enlightening journey together and unlock
						the transformative power of numbers in your life!
					</p>
					<Link href='/consultations'>
						<Button className='px-6 py-3 text-lg font-bold text-white bg-orange-600 hover:bg-orange-700'>
							Schedule Your Reading
						</Button>
					</Link>
				</div>
			</main>
		</div>
	);
}
