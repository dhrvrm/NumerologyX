import Image from 'next/image';
import Link from 'next/link';
import StarRating from './StarRating.component';

const ProductCard = ({ product, isOverview }) => {
	const { title, current_price, rating, images, slug } = product;

	return (
		<div className='w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
			<Link href={`/store/${slug}`}>
				<div className='w-full relative pb-[100%] mb-2'>
					<Image
						src={images[0]}
						alt={title}
						layout='fill'
						objectFit='cover'
						objectPosition='center'
					/>
				</div>
			</Link>

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
				{!isOverview && (
					<div className='flex items-center justify-between'>
						<span className='text-3xl font-bold text-gray-900 dark:text-white'>
							₹{current_price.toFixed(2)}
						</span>
						<Link href={`/store/${slug}`}>
							<button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
								View Details
							</button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductCard;
