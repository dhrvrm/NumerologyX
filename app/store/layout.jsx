import StickyCart from './_components/StickyCart';

const StoreLayout = ({ children }) => {
	return (
		<div className='relative min-h-screen'>
			{children}
			{/* StickyCart at the bottom */}
			<StickyCart />
		</div>
	);
};

export default StoreLayout;
