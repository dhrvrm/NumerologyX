import Image from 'next/image';

const serviceProblems = [
	{
		id: 1,
		title: 'Career and Finance',
		exerpt: 'Navigate Your Career and Finances with Confidence',
		src: '/images/astrology-horoscope.svg',
		height: 40,
		width: 40,
	},
	{
		id: 2,
		title: 'Relationships and Love',
		exerpt: 'Enhance Your Relationships and Love Life',
		src: '/images/astrology-horoscope.svg',
		height: 40,
		width: 40,
	},
	{
		id: 3,
		title: 'Personal Development',
		exerpt: 'Discover Your True Self and Achieve Your Goals',
		src: '/images/astrology-horoscope.svg',
		height: 40,
		width: 40,
	},
	{
		id: 4,
		title: 'Health and Wellbeing',
		exerpt: 'Prioritize Your Health and Wellbeing',
		src: '/images/astrology-horoscope.svg',
		height: 40,
		width: 40,
	},
	{
		id: 5,
		title: 'Life Events and Decisions',
		exerpt: 'Make Informed Life Decisions with Confidence',
		src: '/images/astrology-horoscope.svg',
		height: 40,
		width: 40,
	},
	{
		id: 6,
		title: 'Luck and Fortune',
		exerpt: 'Harness Your Personal Luck and Fortune',
		src: '/images/astrology-horoscope.svg',
		height: 40,
		width: 40,
	},
];

const ServiceOverviewSection = () => {
	return (
		<section className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
			<div className=''>
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
			</div>
			<div className='grid grid-cols-1 gap-4 mt-4 md:grid-cols-2'>
				{serviceProblems.map((service) => (
					<ServicePain key={service.id} {...service} />
				))}
			</div>
		</section>
	);
};

const ServicePain = ({ src, title, exerpt, width, height }) => {
	return (
		<div className='flex gap-2 p-2 '>
			{/* <Image alt='Astrology Icon' src={src} width={width} height={height} /> */}
			<div class='flex flex-col gap-1'>
				<h3 className='text-2xl'>{title}</h3>
				<p>{exerpt}</p>
			</div>
		</div>
	);
};

export default ServiceOverviewSection;
