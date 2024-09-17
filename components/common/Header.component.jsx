'use client';

import { useState } from 'react';
import { User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useUserStore } from '../../lib/zustand/userStore';
import GetStartedButton from '../animata/button/get-started-button';
import NavTabs from '../animata/container/nav-tabs';

const Header = () => {
	const { user } = useUserStore();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const tabs = ['Store', 'Consultations', 'About', 'Blogs'];

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<header className='sticky top-0 z-50 flex items-center justify-between px-4 py-2 bg-white border-b-2 md:py-4 border-grey-50 md:px-10'>
			<Link href='/' className='flex items-center' title='Home Page Link'>
				<Image
					src='/images/logo/adept-numero.webp'
					alt='Adept Numero Company Logo'
					title='Logo'
					width={150}
					height={50}
					quality={100}
					className='w-auto h-12 md:h-10'
				/>
			</Link>

			{/* Desktop Navigation */}
			<nav className='hidden lg:flex'>
				<NavTabs tabs={tabs} />
			</nav>

			<div className='flex items-center gap-4'>
				<GetStartedButton
					text='Get Consultation'
					className='hidden sm:flex w-max whitespace-nowrap'
				/>

				{user && (
					<Link
						className='p-2 bg-blue-100 rounded-full pointer'
						href='/profile'
					>
						<User className='w-6 h-6 text-blue-500' />
					</Link>
				)}

				{/* Hamburger Menu Button */}
				<button
					className='p-2 lg:hidden'
					onClick={toggleMenu}
					aria-label='Toggle menu'
				>
					{isMenuOpen ? (
						<X className='w-6 h-6' />
					) : (
						<Menu className='w-6 h-6' />
					)}
				</button>
			</div>

			{/* Mobile Navigation */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className='fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden'
						onClick={toggleMenu}
					>
						<motion.div
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ type: 'spring', stiffness: 300, damping: 30 }}
							className='fixed inset-y-0 right-0 w-64 bg-white shadow-lg'
							onClick={(e) => e.stopPropagation()} // Prevent closing on clicking inside the menu
						>
							<div className='flex flex-col h-full p-4'>
								<button
									className='self-end p-2 mb-4'
									onClick={toggleMenu}
									aria-label='Close menu'
								>
									<X className='w-6 h-6' />
								</button>
								<nav className='flex flex-col gap-4'>
									{tabs.map((tab) => (
										<Link
											key={tab}
											href={`/${tab.toLowerCase()}`}
											className='text-lg font-medium hover:text-orange-600'
											onClick={toggleMenu}
										>
											{tab}
										</Link>
									))}
								</nav>
								<GetStartedButton
									text='Get Consultation'
									className='w-full mt-4 md:mt-auto'
								/>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
};

export default Header;
