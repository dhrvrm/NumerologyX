'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useCartStore } from '../../../lib/zustand/cartStore';
import Link from 'next/link';

const StickyCart = () => {
	const { cartItems, totalItems, totalAmount } = useCartStore();

	if (totalItems === 0) return null; // Hide if the cart is empty

	return (
		<div className='fixed bottom-0 left-0 right-0 z-50 p-2 text-orange-800 shadow-lg bg-amber-50 md:p-4'>
			<div className='container flex items-center justify-between mx-auto'>
				<div className='flex items-center gap-2'>
					<p className='text-sm font-semibold md:text-lg'>
						Cart ({totalItems} items)
					</p>
					<p className='text-sm font-semibold md:text-lg'>
						Total: ${totalAmount.toFixed(2)}
					</p>
				</div>
				<Link href='/cart'>
					<Button variant='orange'>
						<ShoppingCart className='w-4 h-4 mr-2' /> View Cart
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default StickyCart;
