import React from 'react';

const StarRating = ({ rating }) => {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 >= 0.5;

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

	return (
		<div className='flex flex-row items-center content-center gap-2'>
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

			<div className='bg-yellow-100 text-orange-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3'>
				{rating}
			</div>
		</div>
	);
};

export default StarRating;
