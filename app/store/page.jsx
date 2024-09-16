'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchAllProducts, searchProducts } from '../../lib/appwrite/database';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Checkbox } from '../../components/ui/checkbox';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import StickyCart from './_components/StickyCart';

const ProductCard = ({ product }) => {
	const [imageIndex, setImageIndex] = useState(0);

	const discountPercentage = Math.round(
		((product.actual_price - product.current_price) / product.actual_price) *
			100
	);

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
						<h3 className='text-lg font-semibold line-clamp-1'>
							{product?.title}
						</h3>
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
		</CardContent>
	</Card>
);

const StorePage = () => {
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedTags, setSelectedTags] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const router = useRouter();

	const categories = ['Category 1', 'Category 2', 'Category 3']; // Replace with actual categories
	const tags = ['Tag 1', 'Tag 2', 'Tag 3']; // Replace with actual tags

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
		const filtered = products.filter(
			(product) =>
				product?.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
				(!selectedCategory || product?.categories.includes(selectedCategory)) &&
				(selectedTags.length === 0 ||
					selectedTags.every((tag) => product?.tags.includes(tag)))
		);
		setFilteredProducts(filtered);
	}, [searchTerm, selectedCategory, selectedTags, products]);

	const handleSearch = async () => {
		setLoading(true);
		try {
			const results = await searchProducts(searchTerm);
			setProducts(results);
			setFilteredProducts(results);
		} catch (err) {
			setError('Search failed');
		}
		setLoading(false);
	};

	const handleCategoryChange = (category) => {
		setSelectedCategory(category === selectedCategory ? '' : category);
	};

	const handleTagChange = (tag) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
		);
	};

	if (error)
		return (
			<div className='flex items-center justify-center h-screen text-red-500'>
				Error: {error}
			</div>
		);

	return (
		<div className='container px-4 py-8 mx-auto'>
			<div className='flex flex-col gap-4 mb-8 sm:flex-row'>
				<Input
					type='text'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder='Search products'
					className='flex-grow'
				/>
				<Button onClick={handleSearch} className='w-full sm:w-auto'>
					Search
				</Button>
			</div>

			<div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
				<div className='space-y-8 lg:sticky lg:top-4 lg:self-start'>
					<div className='p-6 bg-white rounded-lg shadow'>
						<h3 className='mb-4 text-lg font-semibold'>Categories</h3>
						<div className='space-y-2'>
							{categories.map((category) => (
								<div key={category} className='flex items-center space-x-2'>
									<Checkbox
										id={category}
										checked={selectedCategory === category}
										onCheckedChange={() => handleCategoryChange(category)}
									/>
									<Label htmlFor={category} className='cursor-pointer'>
										{category}
									</Label>
								</div>
							))}
						</div>
					</div>
					<div className='p-6 bg-white rounded-lg shadow'>
						<h3 className='mb-4 text-lg font-semibold'>Tags</h3>
						<div className='space-y-2'>
							{tags.map((tag) => (
								<div key={tag} className='flex items-center space-x-2'>
									<Checkbox
										id={tag}
										checked={selectedTags.includes(tag)}
										onCheckedChange={() => handleTagChange(tag)}
									/>
									<Label htmlFor={tag} className='cursor-pointer'>
										{tag}
									</Label>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className='lg:col-span-3'>
					<motion.div
						className='grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'
						layout
					>
						<AnimatePresence>
							{loading
								? Array(6)
										.fill(0)
										.map((_, index) => <ProductCardSkeleton key={index} />)
								: filteredProducts.map((product) => (
										<ProductCard key={product?.$id} product={product} />
								  ))}
						</AnimatePresence>
					</motion.div>
				</div>
			</div>

			<StickyCart />
		</div>
	);
};

export default StorePage;
