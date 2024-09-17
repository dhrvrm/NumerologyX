import AutoSlidingReviews from '../../components/sections/AutoSlidingReviewsSection';
import StickyCart from './_components/StickyCart';

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
