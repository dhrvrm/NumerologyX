'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useCartStore } from '../../../lib/zustand/cartStore';
import Link from 'next/link';
const StickyCart = () => {
	const { totalItems, totalAmount } = useCartStore();

	if (totalItems === 0) return null; // Hide if the cart is empty

	return (
		<div className='fixed bottom-0 left-0 right-0 z-50 px-4 py-2 text-orange-800 shadow-lg bg-amber-50 md:px-6 md:py-3'>
			<div className='container flex items-center justify-between mx-auto'>
				<div className='flex flex-col items-start md:gap-4 md:flex-row'>
					<p className='text-sm font-semibold md:text-base'>
						Cart ({totalItems} item{totalItems !== 1 ? 's' : ''})
					</p>
					<p className='text-sm font-semibold md:text-base'>
						Total: ₹{totalAmount.toFixed(2)}
					</p>
				</div>
				<Link href='/cart'>
					<Button variant='orange' className='whitespace-nowrap'>
						<ShoppingCart className='w-4 h-4 mr-2' /> View Cart
					</Button>
				</Link>
			</div>
		</div>
	);
};
export default StickyCart;
