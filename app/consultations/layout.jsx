import TestimonialsSection from '../../components/sections/TestimonialSection';
export const metadata = {
	title: 'Numerology Consultations | AdeptNumero',
	description:
		'Explore our expert numerology consultation services including name correction, mobile number analysis, business consultation, and more. Discover personalized insights to enhance your life and business success.',
	keywords:
		'numerology consultations, name correction, mobile number correction, business consultation, personal consultation, numerology services, Prakriti Verma',
	openGraph: {
		title: 'Numerology Consultations | AdeptNumero',
		description:
			'Unlock the power of numerology with expert consultations by Prakriti Verma. Offering name correction, mobile number analysis, business consultations, and more for a harmonious and prosperous life.',
		type: 'website',
		url: 'https://www.adeptnumero.in/consultations',
		image: 'https://www.adeptnumero.in/images/consultations-og-image.jpg', // Update with relevant image URL
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Numerology Consultations | AdeptNumero',
		description:
			'Unlock your potential with expert numerology consultations by Prakriti Verma. Services include name correction, mobile number analysis, business consultations, and more.',
		image: 'https://www.adeptnumero.in/images/consultations-twitter-image.jpg', // Update with relevant image URL
	},
};

const ConsulatationLayout = ({ children }) => {
	return (
		<div className='relative min-h-screen'>
			{children}
			<TestimonialsSection />
		</div>
	);
};

export default ConsulatationLayout;
