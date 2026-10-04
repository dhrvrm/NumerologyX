import { getFeaturedProducts } from '../../lib/products';
import ProductCard from './ProductCard.component';

const FeaturedProducts = () => {
	const products = getFeaturedProducts();

	return (
		<section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
			{products?.map((product) => (
				<ProductCard key={product.$id} product={product} isOverview={true} />
			))}
		</section>
	);
};

export default FeaturedProducts;
