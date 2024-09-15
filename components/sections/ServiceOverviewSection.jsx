import Link from 'next/link';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardDescription,
	CardTitle,
} from '../../components/ui/card';
import { ArrowRight } from 'lucide-react';
import GetStartedButton from '../animata/button/get-started-button';
import Image from 'next/image';

const consultations = [
	{
		title: 'Career and Finance',
		description: 'Navigate Your Career and Finances with Confidence',
		image: '/images/services/career-service.jpg',
		href: '/consultations/career-finance',
	},
	{
		title: 'Relationships and Love',
		description: 'Enhance Your Relationships and Love Life',
		image: '/images/services/career-service.jpg',
		href: '/consultations/relationships-love',
	},
	{
		title: 'Personal Development',
		description: 'Discover Your True Self and Achieve Your Goals',
		image: '/images/services/career-service.jpg',
		href: '/consultations/personal-development',
	},
	{
		title: 'Health and Wellbeing',
		description: 'Prioritize Your Health and Wellbeing',
		image: '/images/services/career-service.jpg',
		href: '/consultations/health-wellbeing',
	},
	{
		title: 'Life Events and Decisions',
		description: 'Make Informed Life Decisions with Confidence',
		image: '/images/services/career-service.jpg',
		href: '/consultations/life-events-decisions',
	},
	{
		title: 'Luck and Fortune',
		description: 'Harness Your Personal Luck and Fortune',
		image: '/images/services/career-service.jpg',
		href: '/consultations/luck-fortune',
	},
];

const ServiceOverviewSection = () => {
	return (
		<section className='container px-4 py-8 mx-auto'>
			<div className='mb-12'>
				<h2 className='mb-4 text-3xl'>
					We Understand Your Struggles and Are Here to Help
				</h2>
				<p className='max-w-xl'>
					Life is filled with important decisions and challenges that can leave
					you feeling overwhelmed or uncertain. Whether you&apos;re facing
					career dilemmas, relationship struggles, or searching for personal
					growth, our tailored consultations offer the clarity and guidance you
					need. Explore our services below and discover how numerology and
					astrology can help you navigate your path with confidence.
				</p>
				<GetStartedButton
					text='View all consultations'
					className='mt-4 w-max whitespace-nowrap'
				/>
			</div>

			<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
				{consultations.map((consultation, index) => (
					<Link key={index} href={consultation.href} className='group'>
						<Card className='h-full transition-transform duration-300 ease-in-out transform hover:scale-105'>
							<CardHeader className='p-0'>
								<Image
									src={consultation.image}
									alt={consultation.title}
									width={150}
									height={100}
									className='object-cover w-full h-40 rounded-t-lg'
								/>
							</CardHeader>
							<CardContent className='p-4'>
								<CardTitle className='mb-2 text-lg leading-none '>
									{consultation.title}
								</CardTitle>
								<CardDescription className='text-sm'>
									{consultation.description}
								</CardDescription>
							</CardContent>
							{/* <CardFooter className='p-4 pt-0'>
								<div className='flex items-center text-sm text-orange-600 group-hover:underline'>
									Book Consultation
									<ArrowRight className='w-4 h-4 ml-1' />
								</div>
							</CardFooter> */}
						</Card>
					</Link>
				))}
			</div>
		</section>
	);
};

export default ServiceOverviewSection;
