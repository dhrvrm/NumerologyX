import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
	persist(
		(set, get) => ({
			cartItems: [],
			totalItems: 0,
			totalAmount: 0,

			// Add product to cart with quantity
			addToCart: (product, quantity = 1) => {
				// Check if product already exists in the cart by unique ID (use slug or $id)
				const existingItem = get().cartItems.find(
					(item) => item.$id === product.$id || item.slug === product.slug
				);

				if (existingItem) {
					// If the product exists, update the quantity
					set((state) => ({
						cartItems: state.cartItems.map((item) =>
							item.$id === product.$id || item.slug === product.slug
								? { ...item, quantity: item.quantity + quantity }
								: item
						),
						totalItems: state.totalItems + quantity,
						totalAmount: state.totalAmount + product.current_price * quantity,
					}));
				} else {
					// If the product doesn't exist, add it to the cart
					set((state) => ({
						cartItems: [
							...state.cartItems,
							{ ...product, quantity }, // Add new product with the specified quantity
						],
						totalItems: state.totalItems + quantity,
						totalAmount: state.totalAmount + product.current_price * quantity,
					}));
				}
			},

			// Remove product from cart
			removeFromCart: (productId) => {
				const product = get().cartItems.find((item) => item.$id === productId);

				if (!product) return;

				set((state) => ({
					cartItems: state.cartItems.filter((item) => item.$id !== productId),
					totalItems: state.totalItems - product.quantity,
					totalAmount:
						state.totalAmount - product.current_price * product.quantity,
				}));
			},

			// Clear the cart
			clearCart: () =>
				set({
					cartItems: [],
					totalItems: 0,
					totalAmount: 0,
				}),
		}),
		{
			name: 'cart-store', // Name of the key in localStorage
			storage: {
				getItem: (name) => {
					const storedValue = localStorage.getItem(name);
					return storedValue ? JSON.parse(storedValue) : null; // Properly parse the JSON string
				},
				setItem: (name, value) => {
					localStorage.setItem(name, JSON.stringify(value)); // Properly stringify the object
				},
				removeItem: (name) => {
					localStorage.removeItem(name);
				},
			},
		}
	)
);
