import { fetchProductBySlug } from '../../../lib/appwrite/database';
import Image from 'next/image';
import StarRating from '../../../components/store/StarRating.component';

const ProductPage = async ({ params }) => {
	const product = await fetchProductBySlug(params.slug);

	if (!product) {
		return <div>Product not found</div>;
	}

	return (
		<div>
			<h1>{product.title}</h1>
			<Image
				src={product.images[0]}
				alt={product.title}
				width={500}
				height={500}
			/>
			<p>{product.description}</p>
			<StarRating rating={product.rating} />
			<p>Price: ₹{product.current_price.toFixed(2)}</p>
			{/* Add more product details here */}
		</div>
	);
};

export default ProductPage;
