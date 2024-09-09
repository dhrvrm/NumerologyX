'use client';
import { fetchProductBySlug } from '../../../lib/appwrite/database';
import Image from 'next/image';
import StarRating from '../../../components/store/StarRating.component';
import { ProductDescriptionAccordion } from '../../../components/ui/CollapsingAccordion';
import { Minus, Plus } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useState, useEffect } from 'react';

const ProductPage = ({ params }) => {
	const [quantity, setQuantity] = useState(1);
	const [product, setProduct] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const productData = await fetchProductBySlug(params.slug);
			setProduct(productData);
		};
		fetchData();
	}, [params.slug]);

	const incrementQuantity = () => setQuantity((prev) => prev + 1);
	const decrementQuantity = () =>
		setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
	const handleQuantityChange = (e) => setQuantity(Number(e.target.value));

	if (!product) return <div>Product not found</div>;

	return (
		<section className='py-8 antialiased bg-white md:py-16 dark:bg-gray-900'>
			<div className='max-w-screen-xl px-4 mx-auto 2xl:px-0'>
				<div className='lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16'>
					<div className='max-w-md mx-auto shrink-0 lg:max-w-lg'>
						<Image
							src={product.images[0]}
							alt={product.title}
							width={500}
							height={500}
						/>
					</div>
					<div className='mt-6 sm:mt-8 lg:mt-0'>
						<h1 className='text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white'>
							{product.title}
						</h1>
						<div className='flex items-center gap-2 mt-2'>
							<StarRating rating={product?.rating} />
							<p className='text-sm font-medium leading-none text-gray-500 dark:text-gray-400'>
								({product?.rating})
							</p>
						</div>
						<div className='mt-4 sm:items-center sm:gap-4 sm:flex'>
							<div className='flex flex-col items-start gap-4'>
								<div className='px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground'>
									{`${(
										((product.actual_price - product.current_price) /
											product.actual_price) *
										100
									).toFixed(0)}% OFF`}
								</div>
								<div className='grid gap-1'>
									<div className='flex items-center gap-2'>
										<span className='line-through text-muted-foreground'>
											₹{product.actual_price.toFixed(2)}
										</span>
										<span className='text-2xl font-bold'>
											₹{product.current_price.toFixed(2)}
										</span>
									</div>
									<p className='text-sm text-muted-foreground'>
										Save ₹
										{(product.actual_price - product.current_price).toFixed(2)}{' '}
										on this product
									</p>
								</div>
							</div>
						</div>
						<div className='mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8'>
							<div className='flex items-center space-x-2'>
								<Button
									variant='outline'
									size='icon'
									onClick={decrementQuantity}
									aria-label='Decrease quantity'
								>
									<Minus className='w-4 h-4' />
								</Button>
								<Input
									type='number'
									min='1'
									value={quantity}
									onChange={handleQuantityChange}
									className='w-16 text-center'
									aria-label='Quantity'
								/>
								<Button
									variant='outline'
									size='icon'
									onClick={incrementQuantity}
									aria-label='Increase quantity'
								>
									<Plus className='w-4 h-4' />
								</Button>
							</div>

							<a
								href='#'
								className='text-white mt-4 sm:mt-0 bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center'
								role='button'
							>
								<svg
									class='w-5 h-5 -ms-2 me-2'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									fill='none'
									viewBox='0 0 24 24'
								>
									<path
										stroke='currentColor'
										stroke-linecap='round'
										stroke-linejoin='round'
										stroke-width='2'
										d='M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6'
									/>
								</svg>
								Add to cart
							</a>
						</div>
						<hr className='my-6 border-gray-200 md:my-8 dark:border-gray-800' />
						<p className='mb-6 text-gray-500 dark:text-gray-400'>
							{product.description}
						</p>
						<ProductDescriptionAccordion
							benefits={product?.benefits}
							features={product?.features}
							careInstructions={product?.care_instructions}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductPage;
