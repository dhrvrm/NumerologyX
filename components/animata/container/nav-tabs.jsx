'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '../../../lib/utils';

export default function NavTabs({ tabs }) {
	const router = useRouter();
	const pathname = usePathname();
	const [selected, setSelected] = useState('');

	useEffect(() => {
		const currentTab = tabs.find((tab) =>
			pathname.toLowerCase().startsWith(`/${tab.toLowerCase()}`)
		);
		if (currentTab) {
			setSelected(currentTab);
		}
	}, [pathname, tabs]);

	const handleTabClick = (tab) => {
		setSelected(tab);
		router.push(`/${tab.toLowerCase()}`);
	};

	return (
		<div className='flex flex-wrap items-center justify-center gap-4 rounded-md'>
			{tabs.map((tab) => (
				<Tab
					key={tab}
					text={tab}
					selected={selected === tab}
					onClick={() => handleTabClick(tab)}
				/>
			))}
		</div>
	);
}

const Tab = ({ text, selected, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={cn(
				'relative rounded-md p-2 text-sm transition-all',
				selected ? 'text-orange-600 font-bold' : 'hover:font-bold'
			)}
		>
			<p className='relative z-50 min-w-20'>{text}</p>
			{selected && (
				<motion.span
					layoutId='tabs'
					transition={{ type: 'spring', duration: 0.5 }}
					className='absolute inset-0 rounded-sm bg-amber-100'
				/>
			)}
		</button>
	);
};
