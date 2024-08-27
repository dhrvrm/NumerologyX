'use client';
import Image from 'next/image';
import { useState, useContext } from 'react';
// import { CartContext } from '../context/CartContext';

const StoreOverviewSection = () => {
	const products = [
		{
			id: 1,
			title: 'Crystal Quartz Raw Stone',
			price: 2999,
			rating: 4.5,
			image: '/images/products/crystal.webp',
		},
		{
			id: 2,
			title: 'Pyrite Raw Stone',
			price: 1599,
			rating: 3.5,
			image: '/images/products/pyrite.webp',
		},
		{
			id: 3,
			title: 'Rose Quartz Raw Stone',
			price: 1599,
			rating: 4.2,
			image: '/images/products/rose-quarts.webp',
		},
		// Add more products as needed
	];

	return (
		<section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
			{products.map((product) => (
				<ProductCardOverview
					key={product.id}
					product={product}
					isOverview={true}
				/>
			))}
		</section>
	);
};

const ProductCardOverview = ({ product, isOverview }) => {
	const { title, price, rating, image } = product;
	// const { addToCart } = useContext(CartContext);
	const { addToCart } = () => {};
	const [isAdding, setIsAdding] = useState(false);

	const handleAddToCart = () => {
		setIsAdding(true);
		addToCart(product);
		setTimeout(() => setIsAdding(false), 1000);
	};

	return (
		<div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
			<div className='w-full relative pb-[100%] mb-2'>
				<Image
					src={image}
					alt={title}
					layout='fill'
					objectFit='cover'
					objectPosition='center'
				/>
			</div>

			<div className='px-5 pb-5'>
				<h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
					{title}
				</h5>
				<div className='flex items-center mt-2.5 mb-5'>
					<StarRating rating={rating} />
					<span className='bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3'>
						{rating.toFixed(1)}
					</span>
				</div>
				{isOverview ? undefined : (
					<div className='flex items-center justify-between'>
						<span className='text-3xl font-bold text-gray-900 dark:text-white'>
							₹{price.toFixed(2)}
						</span>
						<button
							onClick={handleAddToCart}
							disabled={isAdding}
							className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
						>
							{isAdding ? 'Adding...' : 'Add to cart'}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

const StarRating = ({ rating }) => {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 >= 0.5;

	return (
		<div className='flex items-center space-x-1 rtl:space-x-reverse'>
			{[...Array(5)].map((_, index) => (
				<span key={index}>
					{index < fullStars ? (
						<FullStar />
					) : index === fullStars && hasHalfStar ? (
						<HalfStar />
					) : (
						<EmptyStar />
					)}
				</span>
			))}
		</div>
	);
};

const FullStar = () => (
	<svg
		className='w-4 h-4 text-yellow-300'
		aria-hidden='true'
		xmlns='http://www.w3.org/2000/svg'
		fill='currentColor'
		viewBox='0 0 22 20'
	>
		<path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
	</svg>
);

const HalfStar = () => (
	<svg
		className='w-4 h-4 text-yellow-300'
		aria-hidden='true'
		xmlns='http://www.w3.org/2000/svg'
		fill='currentColor'
		viewBox='0 0 22 20'
	>
		<defs>
			<linearGradient id='halfStarGradient'>
				<stop offset='50%' stopColor='currentColor' />
				<stop offset='50%' stopColor='#E5E7EB' />
			</linearGradient>
		</defs>
		<path
			fill='url(#halfStarGradient)'
			d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z'
		/>
	</svg>
);

const EmptyStar = () => (
	<svg
		className='w-4 h-4 text-gray-300'
		aria-hidden='true'
		xmlns='http://www.w3.org/2000/svg'
		fill='currentColor'
		viewBox='0 0 22 20'
	>
		<path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
	</svg>
);

export default StoreOverviewSection;
