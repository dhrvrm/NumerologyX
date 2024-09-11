'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export default function ProductImageSlider({ images }) {
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
				{images?.map((image, index) => (
					<SwiperSlide key={index}>
						<Image
							src={image}
							alt={`Product image ${index + 1}`}
							width={500}
							height={500}
							className='w-full h-auto'
							quality={100}
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
							quality={50}
							className='w-full h-auto cursor-pointer'
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
