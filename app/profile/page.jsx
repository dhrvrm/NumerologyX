'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../../lib/zustand/userStore';
import { account } from '../../lib/appwrite';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { CheckCircle, Edit2, Save } from 'lucide-react';

export default function ProfilePage() {
	const { user, setUser, clearUser } = useUserStore(); // Zustand hooks for user state
	const router = useRouter();
	const [isEditing, setIsEditing] = useState(false);
	const [editedUser, setEditedUser] = useState(user);

	// Handle logout
	const handleLogout = async () => {
		try {
			await account.deleteSession('current');
			clearUser();
			router.push('/');
		} catch (error) {
			console.error('Failed to log out:', error);
		}
	};

	// Handle edit
	const handleEdit = () => {
		setIsEditing(true);
	};

	// Handle save
	const handleSave = () => {
		// Here you would typically send the updated user data to your backend
		console.log('Saving user data:', editedUser);
		setIsEditing(false);
	};

	// Handle form field changes
	const handleChange = (e) => {
		setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
	};

	// Fetch user data from Appwrite if it's not already in Zustand
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const appwriteUser = await account.get();
				setUser(appwriteUser);
				setEditedUser(appwriteUser); // Set initial values in the edit form
			} catch (error) {
				router.push('/auth'); // Redirect to auth if no user is found
			}
		};

		// Check if user exists in Zustand, if not fetch from Appwrite
		if (!user) {
			fetchUser();
		}
	}, [user, setUser, router]);

	if (!user) return null; // Prevent rendering until user is fetched

	return (
		<div className='container p-6 mx-auto space-y-8'>
			<h1 className='text-3xl font-bold'>Profile</h1>

			<Card>
				<CardHeader>
					<CardTitle className='flex items-center justify-between'>
						Account Information
						{isEditing ? (
							<Button onClick={handleSave} className='flex items-center gap-2'>
								<Save className='w-4 h-4' /> Save
							</Button>
						) : (
							<Button onClick={handleEdit} className='flex items-center gap-2'>
								<Edit2 className='w-4 h-4' /> Edit
							</Button>
						)}
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div>
						<label htmlFor='name' className='text-sm font-medium'>
							Name
						</label>
						<Input
							id='name'
							name='name'
							value={editedUser?.name || ''}
							onChange={handleChange}
							disabled={!isEditing}
						/>
					</div>
					<div>
						<label htmlFor='email' className='text-sm font-medium'>
							Email
						</label>
						<Input
							id='email'
							name='email'
							value={editedUser?.email || ''}
							onChange={handleChange}
							disabled={!isEditing}
						/>
					</div>
					<div>
						<label htmlFor='phone' className='text-sm font-medium'>
							Phone
						</label>
						<div className='flex items-center gap-2'>
							<Input
								id='phone'
								name='phone'
								value={editedUser?.phone || ''}
								onChange={handleChange}
								disabled={true} // Disable phone input since it's not editable
							/>
							<Badge variant='secondary' className='flex items-center gap-1'>
								<CheckCircle className='w-4 h-4 text-green-500' /> Verified
							</Badge>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className='flex items-center justify-between'>
						User Information
						{isEditing ? (
							<Button onClick={handleSave} className='flex items-center gap-2'>
								<Save className='w-4 h-4' /> Save
							</Button>
						) : (
							<Button onClick={handleEdit} className='flex items-center gap-2'>
								<Edit2 className='w-4 h-4' /> Edit
							</Button>
						)}
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div>
						<label htmlFor='dob' className='text-sm font-medium'>
							Date of Birth
						</label>
						<Input
							id='dob'
							name='dob'
							type='date'
							value={editedUser?.dob || ''}
							onChange={handleChange}
							disabled={!isEditing}
						/>
					</div>
					<div>
						<label htmlFor='pob' className='text-sm font-medium'>
							Place of Birth
						</label>
						<Input
							id='pob'
							name='pob'
							value={editedUser?.pob || ''}
							onChange={handleChange}
							disabled={!isEditing}
						/>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Booking List</CardTitle>
				</CardHeader>
				<CardContent>
					{user?.bookings && user.bookings.length > 0 ? (
						<ul className='pl-5 list-disc'>
							{user.bookings.map((booking, index) => (
								<li key={index}>{booking}</li>
							))}
						</ul>
					) : (
						<p>No bookings found.</p>
					)}
				</CardContent>
			</Card>

			<Button onClick={handleLogout} variant='destructive'>
				Log Out
			</Button>
		</div>
	);
}
