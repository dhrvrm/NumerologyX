import Image from 'next/image';
import FeaturedProducts from '../store/FeatureProducts.component';

const StoreOverviewSection = async () => {
	return (
		<section>
			<FeaturedProducts />
		</section>
	);
};

export default StoreOverviewSection;
