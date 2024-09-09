import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
	persist(
		(set) => ({
			user: null,
			setUser: (userData) => set({ user: userData }),
			clearUser: () => set({ user: null }),
		}),
		{
			name: 'user-store', // Name of the storage key in localStorage
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
