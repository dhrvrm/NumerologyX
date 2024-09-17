import AutoSlidingReviews from '../../components/sections/AutoSlidingReviewsSection';
import StickyCart from './_components/StickyCart';

export const metadata = {
	title: 'Mystical Gems & Yantras | AdeptNumero Store',
	description:
		'Explore our curated collection of powerful gemstones, yantras, and spiritual pendants. Enhance your numerology journey with authentic, energy-infused accessories crafted for your unique life path.',
	keywords:
		'gemstones, yantras, spiritual pendants, numerology accessories, energy jewelry, mystical products',
	openGraph: {
		title: 'Mystical Gems & Yantras | AdeptNumero Store',
		description:
			'Discover authentic gemstones, yantras, and spiritual pendants to amplify your numerology practice. Find energy-infused accessories tailored to your life path.',
		type: 'website',
		url: 'https://www.adeptnumero.in/store',
		image: 'https://www.adeptnumero.in/images/store-og-image.jpg',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Mystical Gems & Yantras | AdeptNumero Store',
		description:
			'Discover authentic gemstones, yantras, and spiritual pendants to amplify your numerology practice. Find energy-infused accessories tailored to your life path.',
		image: 'https://www.adeptnumero.in/images/store-twitter-image.jpg',
	},
};

const StoreLayout = ({ children }) => {
	return (
		<div className='relative min-h-screen'>
			{children}
			<AutoSlidingReviews />
			{/* StickyCart at the bottom */}
			<StickyCart />
		</div>
	);
};

export default StoreLayout;
