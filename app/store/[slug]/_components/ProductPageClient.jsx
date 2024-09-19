'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import StarRating from '../../../../components/store/StarRating.component';
import { ProductDescriptionAccordion } from '../../../../components/ui/CollapsingAccordion';
import { Minus, Plus, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Badge } from '../../../../components/ui/badge';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '../../../../components/ui/tabs';
import StickyCart from '../../_components/StickyCart';
import { useCartStore } from '../../../../lib/zustand/cartStore';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const ProductImageSlider = ({ images }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	return (
		<div className='product-image-slider'>
			<Swiper
				style={{
					'--swiper-navigation-color': '#fff',
					'--swiper-pagination-color': '#fff',
				}}
				spaceBetween={10}
				navigation={true}
				thumbs={{
					swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
				}}
				modules={[FreeMode, Navigation, Thumbs]}
				className='mySwiper2'
			>
				{images.map((image, index) => (
					<SwiperSlide key={index}>
						<Image
							src={image}
							alt={`Product image ${index + 1}`}
							width={500}
							height={500}
							className='w-full h-auto'
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				spaceBetween={10}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				className='mt-4 mySwiper'
			>
				{images.map((image, index) => (
					<SwiperSlide key={index}>
						<Image
							src={image}
							alt={`Thumbnail ${index + 1}`}
							width={100}
							height={100}
							className='w-full h-auto cursor-pointer'
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

const ProductPageClient = ({ product }) => {
	const { addToCart } = useCartStore();
	const [quantity, setQuantity] = useState(1);

	const incrementQuantity = () =>
		setQuantity((prev) =>
			product && prev < product.quantity_available ? prev + 1 : prev
		);

	const decrementQuantity = () =>
		setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

	const handleQuantityChange = (e) => setQuantity(Number(e.target.value));

	const handleAddToCart = () => {
		if (product && quantity <= product.quantity_available) {
			addToCart(product, quantity);
		} else {
			alert('Insufficient stock');
		}
	};

	return (
		<section className='py-8 antialiased bg-white md:py-16 dark:bg-gray-900'>
			<div className='max-w-screen-xl px-4 mx-auto 2xl:px-0'>
				<div className='lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16'>
					<div className='max-w-md mx-auto shrink-0 lg:max-w-lg'>
						<ProductImageSlider images={product?.images} />
						<p className='mt-2 text-sm italic text-gray-500'>
							Note: Actual product may vary slightly in size, color, or
							appearance.
						</p>
					</div>
					<div className='mt-6 sm:mt-8 lg:mt-0'>
						<div className='flex flex-wrap items-start justify-between gap-2 mb-4'>
							<h1 className='text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white'>
								{product.title}
							</h1>
							<Badge
								variant='outline'
								className={
									product.quantity_available > 0
										? 'bg-green-100 text-green-800'
										: 'bg-red-100 text-red-800'
								}
							>
								{product.quantity_available > 0 ? 'In Stock' : 'Out of Stock'}
							</Badge>
						</div>

						<div className='flex items-center gap-4 mb-4'>
							<StarRating rating={product?.rating} />
							<span className='text-sm text-gray-500'>
								({product.rating} out of 5)
							</span>
						</div>

						<div className='flex items-center gap-4 mb-4'>
							<div className='px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground'>
								{`${(
									((product.actual_price - product.current_price) /
										product.actual_price) *
									100
								).toFixed(0)}% OFF`}
							</div>
							<div className='flex items-center gap-2'>
								<span className='line-through text-muted-foreground'>
									₹{product.actual_price.toFixed(2)}
								</span>
								<span className='text-2xl font-bold'>
									₹{product.current_price.toFixed(2)}
								</span>
							</div>
						</div>

						<p className='mb-4 text-sm text-muted-foreground'>
							Save ₹{(product.actual_price - product.current_price).toFixed(2)}{' '}
							on this product
							<br />
							(Inclusive of all taxes)
						</p>

						<div className='flex items-center gap-4 mb-6'>
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
									max={product.quantity_available}
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
							<Button
								className='bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center px-5 py-2.5 rounded-lg'
								onClick={handleAddToCart}
								disabled={product.quantity_available <= 0}
							>
								{product.quantity_available > 0
									? 'Add to Cart'
									: 'Out of Stock'}
							</Button>
						</div>

						<div className='p-4 mb-6 bg-gray-100 rounded-lg dark:bg-gray-800'>
							<h3 className='mb-2 text-lg font-semibold'>Why Choose Us?</h3>
							<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
								<div className='flex items-center'>
									<ShieldCheck className='w-6 h-6 mr-2 text-green-600' />
									<span>100% Genuine Products</span>
								</div>
								<div className='flex items-center'>
									<Truck className='w-6 h-6 mr-2 text-blue-600' />
									<span>Fast Shipping</span>
								</div>
								<div className='flex items-center'>
									<CreditCard className='w-6 h-6 mr-2 text-purple-600' />
									<span>100% Secure Payments</span>
								</div>
							</div>
						</div>

						<Tabs defaultValue='description' className='w-full'>
							<TabsList>
								<TabsTrigger value='description'>Description</TabsTrigger>
								<TabsTrigger value='specs'>Specifications</TabsTrigger>
							</TabsList>
							<TabsContent value='description'>
								<p className='text-gray-500 dark:text-gray-400'>
									{product.description}
								</p>
							</TabsContent>
							<TabsContent value='specs'>
								<ul className='pl-5 text-gray-500 list-disc dark:text-gray-400'>
									{product?.specifications?.map((spec, index) => (
										<li key={index}>{spec}</li>
									))}
								</ul>
							</TabsContent>
						</Tabs>

						<ProductDescriptionAccordion
							benefits={product?.benefits}
							features={product?.features}
							careInstructions={product?.care_instructions}
						/>

						<Tabs defaultValue='description' className='w-full'>
							<TabsList>
								<TabsTrigger value='contents'>What&apos;s Included</TabsTrigger>
								<TabsTrigger value='legal'>Legal Information</TabsTrigger>
							</TabsList>

							<TabsContent value='contents'>
								<ul className='pl-5 text-gray-500 list-disc dark:text-gray-400'>
									{product?.contents?.map((item, index) => (
										<li key={index}>{item}</li>
									))}
								</ul>
							</TabsContent>
							<TabsContent value='legal'>
								<p className='text-gray-500 dark:text-gray-400'>
									{product.legal_info}
								</p>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>
			<StickyCart />
		</section>
	);
};

export default ProductPageClient;
