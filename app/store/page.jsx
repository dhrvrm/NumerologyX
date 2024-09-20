'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { fetchAllProducts } from '../../lib/appwrite/database';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import StickyCart from './_components/StickyCart';
import { useCartStore } from '../../lib/zustand/cartStore';
import { toast } from '../../components/ui/use-toast';
import { Toaster } from '../../components/ui/toaster';

const categories = [
	'Raw Stone',
	'Pendant',
	'Bracelet',
	'Decor',
	'Rudraksha',
	'Tree',
	'Mala',
];

const ProductCard = ({ product }) => {
	const [imageIndex, setImageIndex] = useState(0);
	const { addToCart } = useCartStore();

	const discountPercentage = Math.round(
		((product.actual_price - product.current_price) / product.actual_price) *
			100
	);

	const handleAddToCart = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (product.quantity_available > 0) {
			addToCart(product, 1);
			toast({
				title: 'Added to Cart',
				description: `${product.title} has been added to your cart.`,
				duration: 2000,
			});
		}
	};

	return (
		<Link href={`/store/${product.slug}`} passHref>
			<motion.div
				layout
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='cursor-pointer'
			>
				<Card className='h-full overflow-hidden'>
					<div className='relative'>
						<motion.div
							className='relative aspect-square'
							whileHover={{ scale: 1.05 }}
							onHoverStart={() =>
								product?.images.length > 1 && setImageIndex(1)
							}
							onHoverEnd={() => setImageIndex(0)}
						>
							<AnimatePresence mode='wait'>
								<motion.img
									key={imageIndex}
									src={product?.images[imageIndex]}
									alt={product?.title}
									title={product?.title}
									className='absolute top-0 left-0 object-cover w-full h-full'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.3 }}
								/>
							</AnimatePresence>
						</motion.div>
						<div className='absolute z-10 flex flex-col gap-1 top-2 left-2'>
							{product?.featured && (
								<Badge className='bg-yellow-400 text-yellow-900 px-2 py-0.5 text-xs font-semibold rounded hover:bg-yellow-300 cursor-default'>
									Best Seller
								</Badge>
							)}
							{discountPercentage > 0 && (
								<Badge className='bg-red-500 text-white px-2 py-0.5 text-xs font-semibold rounded hover:bg-red-600 cursor-default'>
									{discountPercentage}% OFF
								</Badge>
							)}
						</div>
					</div>
					<CardContent className='p-4'>
						<h2 className='text-lg font-semibold line-clamp-1'>
							{product?.title}
						</h2>
						<div className='flex items-baseline gap-2 mt-1'>
							<span className='text-sm font-medium text-gray-900'>
								₹{product?.current_price.toFixed(2)}
							</span>
							{product.actual_price > product.current_price && (
								<span className='text-sm text-gray-500 line-through'>
									₹{product?.actual_price.toFixed(2)}
								</span>
							)}
						</div>
						<Button
							onClick={handleAddToCart}
							disabled={product.quantity_available <= 0}
							className='w-full mt-2 bg-orange-600 hover:bg-orange-700'
						>
							{product.quantity_available > 0 ? 'Add to Cart' : 'Out of Stock'}
						</Button>
					</CardContent>
				</Card>
			</motion.div>
		</Link>
	);
};

const ProductCardSkeleton = () => (
	<Card className='h-full overflow-hidden'>
		<Skeleton className='w-full aspect-square' />
		<CardContent className='p-4'>
			<Skeleton className='w-3/4 h-6 mb-2' />
			<Skeleton className='w-1/4 h-4' />
			<Skeleton className='w-full h-10 mt-2' />
		</CardContent>
	</Card>
);

const Store = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const searchParams = useSearchParams();
	const router = useRouter();
	const categoryFromUrl = searchParams.get('category') || '';

	useEffect(() => {
		const fetchData = async () => {
			try {
				const cachedProducts = sessionStorage.getItem('cachedProducts');
				if (cachedProducts) {
					setProducts(JSON.parse(cachedProducts));
					setFilteredProducts(JSON.parse(cachedProducts));
					setLoading(false);
				} else {
					const fetchedProducts = await fetchAllProducts();
					setProducts(fetchedProducts);
					setFilteredProducts(fetchedProducts);
					sessionStorage.setItem(
						'cachedProducts',
						JSON.stringify(fetchedProducts)
					);
					setLoading(false);
				}
			} catch (err) {
				setError('Failed to fetch products');
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		setSelectedCategory(categoryFromUrl);
	}, [categoryFromUrl]);

	useEffect(() => {
		const filtered = products.filter(
			(product) =>
				product?.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
				(!selectedCategory ||
					product?.categories
						.map((category) => category.toLowerCase())
						.includes(selectedCategory.toLowerCase()))
		);
		setFilteredProducts(filtered);
	}, [searchTerm, selectedCategory, products]);

	const handleCategoryChange = (category) => {
		const newCategory = category === selectedCategory ? '' : category;
		router.push(`/store?category=${encodeURIComponent(newCategory)}`);
	};

	if (error) {
		return (
			<div className='flex items-center justify-center h-screen text-red-500'>
				Error: {error}
			</div>
		);
	}

	return (
		<>
			<motion.h1
				className='container mt-8 text-3xl font-medium text-gray-800'
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				Our Curated Products
			</motion.h1>
			<div className='container px-4 py-8 mx-auto'>
				<div className='flex flex-col gap-4 mb-8 sm:flex-row'>
					<Input
						type='text'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder='Search products'
						className='flex-grow'
					/>
				</div>

				<div className='flex flex-wrap gap-2 mb-4'>
					{categories.map((category) => (
						<Badge
							key={category}
							variant={selectedCategory === category ? 'default' : 'outline'}
							className='cursor-pointer'
							onClick={() => handleCategoryChange(category)}
						>
							{category}
						</Badge>
					))}
				</div>

				<motion.div
					className='grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
					layout
				>
					<AnimatePresence>
						{loading
							? Array(8)
									.fill(0)
									.map((_, index) => <ProductCardSkeleton key={index} />)
							: filteredProducts.map((product) => (
									<ProductCard key={product?.$id} product={product} />
							  ))}
					</AnimatePresence>
				</motion.div>
			</div>
			<StickyCart />
			<Toaster />
		</>
	);
};

const StorePage = () => {
	return (
		<Suspense fallback={<ProductCardSkeleton />}>
			<Store />
		</Suspense>
	);
};

export default StorePage;
