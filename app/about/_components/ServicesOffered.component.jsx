import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../../../components/ui/card';

export default function ServicesOffered() {
	const services = [
		'Advance Numerology Readings',
		'Name Correction Consultations',
		'Relationship Counseling',
		'Career Guidance',
		'Signature Expert',
		'Marriage Consultation',
		'Compatibility Match Making',
		'Baby Name Suggestions',
		'Baby Delivery Due Date Consultation',
		'Strategic Business Consultation',
		'Crystal Recommendation',
		'Astrology Chart Readings',
		'Rudraksh Recommendation',
		'Gemstone Recommendation',
		'Personalized Remedies and Recommendations',
	];

	return (
		<Card className='overflow-hidden bg-white rounded-lg shadow-lg'>
			<CardHeader className='text-white bg-orange-600'>
				<CardTitle className='text-2xl font-bold'>Services Offered</CardTitle>
			</CardHeader>
			<CardContent className='p-6'>
				<ul className='grid grid-cols-1 gap-4 md:grid-cols-2'>
					{services.map((service, index) => (
						<li key={index} className='flex items-center'>
							<svg
								className='w-6 h-6 mr-2 text-orange-600'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M5 13l4 4L19 7'
								/>
							</svg>
							{service}
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
}
