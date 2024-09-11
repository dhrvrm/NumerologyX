'use client';

import { useCartStore } from '../../lib/zustand/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../../components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../components/ui/card';
import { Minus, Plus, Trash2, PackageOpen } from 'lucide-react';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Separator } from '../../components/ui/separator';
import { Skeleton } from '../../components/ui/skeleton';
import { useState, useEffect } from 'react';

export default function CartPage() {
	const { cartItems, totalItems, totalAmount, addToCart, removeFromCart } =
		useCartStore();
	const [isLoading, setIsLoading] = useState(false);

	// Function to increment the quantity of an item
	const handleIncrement = (item) => {
		if (item.quantity < item.quantity_available) {
			addToCart(item, 1); // Increase quantity by 1
		} else {
			alert('No more stock available');
		}
	};

	// Function to decrement the quantity of an item
	const handleDecrement = (item) => {
		if (item.quantity > 1) {
			addToCart(item, -1); // Decrease quantity by 1
		}
	};

	// Function to remove an item from the cart
	const handleRemove = (item) => {
		removeFromCart(item.$id); // Use `$id` to remove the item from the cart
	};

	if (isLoading) {
		return <CartSkeleton />;
	}

	if (totalItems === 0) {
		return <EmptyCart />;
	}

	return (
		<div className='container p-6 mx-auto'>
			<h1 className='mb-6 text-3xl font-bold'>Your Cart</h1>
			<div className='grid gap-6 lg:grid-cols-3'>
				{/* Cart Items List */}
				<Card className='lg:col-span-2'>
					<CardHeader>
						<CardTitle>Cart Items ({totalItems})</CardTitle>
					</CardHeader>
					<CardContent>
						<ScrollArea className='h-[calc(100vh-20rem)]'>
							{cartItems.map((item) => (
								<div key={item.$id} className='flex items-center py-4'>
									<div className='flex-shrink-0 mr-4'>
										<Image
											src={
												item.images[0] || `/placeholder.svg?height=80&width=80`
											}
											alt={item.title}
											width={80}
											height={80}
											className='object-cover rounded-md'
										/>
									</div>
									<div className='flex-1'>
										<h2 className='font-semibold'>{item.title}</h2>
										<p className='text-sm text-gray-500'>
											₹{item.current_price.toFixed(2)} each
										</p>
									</div>
									<div className='flex items-center gap-2'>
										<Button
											variant='outline'
											size='icon'
											onClick={() => handleDecrement(item)}
											aria-label='Decrease quantity'
										>
											<Minus className='w-4 h-4' />
										</Button>
										<span className='w-8 text-center'>{item.quantity}</span>
										<Button
											variant='outline'
											size='icon'
											onClick={() => handleIncrement(item)}
											aria-label='Increase quantity'
										>
											<Plus className='w-4 h-4' />
										</Button>
									</div>
									<p className='w-24 font-semibold text-right'>
										₹{(item.current_price * item.quantity).toFixed(2)}
									</p>
									<Button
										variant='ghost'
										size='icon'
										className='ml-4'
										onClick={() => handleRemove(item)}
										aria-label='Remove item'
									>
										<Trash2 className='w-4 h-4' />
									</Button>
								</div>
							))}
						</ScrollArea>
					</CardContent>
				</Card>

				{/* Order Summary */}
				<Card>
					<CardHeader>
						<CardTitle>Order Summary</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex justify-between mb-2'>
							<span>Subtotal</span>
							<span>₹{totalAmount.toFixed(2)}</span>
						</div>
						<div className='flex justify-between mb-2'>
							<span>Shipping</span>
							<span>Calculated at checkout</span>
						</div>
						<Separator className='my-4' />
						<div className='flex justify-between font-semibold'>
							<span>Total</span>
							<span>₹{totalAmount.toFixed(2)}</span>
						</div>
					</CardContent>
					<CardFooter>
						<Link href='/checkout' passHref className='w-full'>
							<Button className='w-full'>Proceed to Checkout</Button>
						</Link>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}

// Function to display when the cart is empty
function EmptyCart() {
	return (
		<div className='flex flex-col items-center justify-center h-[calc(100vh-4rem)]'>
			<PackageOpen className='w-16 h-16 mb-4 text-gray-400' />
			<h1 className='text-2xl font-semibold text-gray-700'>
				Your cart is empty
			</h1>
			<p className='mt-2 text-gray-500'>
				Looks like you haven&apos;t added any items to your cart yet.
			</p>
			<Link href='/' passHref>
				<Button className='mt-6'>Start Shopping</Button>
			</Link>
		</div>
	);
}

// Function to display a skeleton loader while data is being loaded
function CartSkeleton() {
	return (
		<div className='container p-6 mx-auto'>
			<Skeleton className='w-48 h-8 mb-6' />
			<div className='grid gap-6 lg:grid-cols-3'>
				<Card className='lg:col-span-2'>
					<CardHeader>
						<Skeleton className='w-32 h-6' />
					</CardHeader>
					<CardContent>
						{[...Array(3)].map((_, index) => (
							<div key={index} className='flex items-center py-4'>
								<div className='flex-1'>
									<Skeleton className='w-3/4 h-5 mb-2' />
									<Skeleton className='w-1/2 h-4' />
								</div>
								<Skeleton className='w-24 h-8 mx-2' />
								<Skeleton className='w-16 h-6' />
							</div>
						))}
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<Skeleton className='w-32 h-6' />
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							<Skeleton className='w-full h-4' />
							<Skeleton className='w-full h-4' />
							<Skeleton className='w-full h-4' />
						</div>
					</CardContent>
					<CardFooter>
						<Skeleton className='w-full h-10' />
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
