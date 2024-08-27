'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

import { cn } from '../../../lib/utils';
import { useRouter } from 'next/navigation';

export default function NavTabs({ tabs }) {
	const [selected, setSelected] = useState('');

	return (
		<div className='flex flex-wrap items-center justify-center gap-4 rounded-md'>
			{tabs.map((tab) => (
				<Tab
					text={tab}
					selected={selected === tab}
					setSelected={setSelected}
					key={tab}
				/>
			))}
		</div>
	);
}

const Tab = ({ text, selected, setSelected }) => {
	const router = useRouter();
	return (
		<button
			onClick={() => {
				setSelected(text);
				router.push(`/${text.toLowerCase()}`);
			}}
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
