import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

export default function GetStartedButton({ text = 'Get started', className }) {
	return (
		<div>
			<button
				className={cn(
					'group flex items-center justify-center gap-3 rounded-lg bg-amber-100 py-2 px-4 font-bold transition-colors duration-100 ease-in-out hover:bg-orange-600',
					className
				)}
			>
				<span
					className={cn(
						'text-orange-600 transition-colors duration-100 ease-in-out group-hover:text-amber-100'
					)}
				>
					{text}
				</span>
				<div
					className={cn(
						'relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full transition-transform duration-100',
						'bg-orange-600 group-hover:bg-amber-100'
					)}
				>
					<div className='absolute left-0 flex items-center justify-center transition-all duration-200 ease-in-out -translate-x-1/2 h-7 w-14 group-hover:translate-x-0'>
						<ArrowRight
							size={16}
							className={cn(
								'size-7 transform p-1 text-orange-600 opacity-0 group-hover:opacity-100'
							)}
						/>
						<ArrowRight
							size={16}
							className={cn(
								'size-7 transform p-1 text-amber-100 opacity-100 transition-transform duration-300 ease-in-out group-hover:opacity-0'
							)}
						/>
					</div>
				</div>
			</button>
		</div>
	);
}
