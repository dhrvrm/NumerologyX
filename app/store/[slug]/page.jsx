import { notFound } from 'next/navigation';
import { getAllProducts, getProductBySlug } from '../../../lib/products';
import ProductPageClient from './_components/ProductPageClient';

export function generateStaticParams() {
	return getAllProducts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
	const product = getProductBySlug(params.slug);

	if (!product) {
		return {
			title: 'Product Not Found',
			description: 'The requested product could not be found.',
		};
	}

	return {
		title: `${product.title} | Genuine, Satisfactory, Best Price`,
		description: `${product.description.slice(0, 155)}...`,
		openGraph: {
			images: [{ url: product?.images[0] }],
		},
		other: {
			'og:price:amount': product.current_price.toString(),
			'og:price:currency': 'INR',
			'og:availability':
				product.quantity_available > 0 ? 'in stock' : 'out of stock',
			'product:price:amount': product.current_price.toString(),
			'product:price:currency': 'INR',
			'product:availability':
				product.quantity_available > 0 ? 'in stock' : 'out of stock',
		},
	};
}

export default async function ProductPage({ params }) {
	const product = getProductBySlug(params.slug);

	if (!product) {
		notFound();
	}

	return <ProductPageClient product={product} />;
}
