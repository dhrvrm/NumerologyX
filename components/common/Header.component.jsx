'use client';

import { User } from 'lucide-react';
import GetStartedButton from '../animata/button/get-started-button';
import NavTabs from '../animata/container/nav-tabs';
import Link from 'next/link';
import { useUserStore } from '../../lib/zustand/userStore';

const Header = () => {
	const { user } = useUserStore(); // Access Zustand user state

	const tabs = ['Store', 'Consultations', 'About', 'Blogs'];

	return (
		<header className='sticky flex items-center justify-between px-10 py-4 border-2 border-grey-50'>
			<a href='/' className='logo font-2xl font-heading'>
				NumerelogyX
			</a>
			<nav className='hidden lg:flex'>
				<NavTabs tabs={tabs} />
			</nav>
			<div className='flex items-center gap-4'>
				<GetStartedButton
					text='Get Consultation'
					className='w-max whitespace-nowrap'
				/>

				{/* Render the user icon if the user exists */}
				{user && (
					<Link
						className='p-2 bg-blue-100 rounded-full pointer'
						href='/profile'
					>
						<User className='w-6 h-6 text-blue-500' />
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;
