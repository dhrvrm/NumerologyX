import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { consultations } from '../../lib/Consulations';

export default function Footer() {
	return (
		<footer className='py-12 text-gray-600 bg-gray-100'>
			<div className='container px-4 mx-auto'>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
					{/* Shop Section */}
					<div>
						<h3 className='mb-4 text-lg font-semibold'>Shop</h3>
						<ul className='space-y-2'>
							{[
								'Raw Stone',
								'Pendant',
								'Bracelet',
								'Decor',
								'Rudraksha',
								'Tree',
								'Mala',
							].map((item) => (
								<li key={item}>
									<Link
										href={{
											pathname: '/store',
											query: { category: item }, // Pass the original category name
										}}
										className='transition-colors duration-200 hover:text-gray-900'
									>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Consultations Section */}
					<div>
						<h3 className='mb-4 text-lg font-semibold'>Consultations</h3>
						<ul className='space-y-2'>
							{consultations.map((consultation) => (
								<li key={consultation.title}>
									<Link
										href={consultation.link}
										className='transition-colors duration-200 hover:text-gray-900'
									>
										{consultation.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company Section */}
					<div>
						<h3 className='mb-4 text-lg font-semibold'>Company</h3>
						<ul className='space-y-2'>
							{['About', 'Blogs', 'FAQs', 'Track Order', 'Contact Us'].map(
								(item) => (
									<li key={item}>
										<Link
											href={`/${item.toLowerCase().replace(' ', '-')}`}
											className='transition-colors duration-200 hover:text-gray-900'
										>
											{item}
										</Link>
									</li>
								)
							)}
							<li>
								<Link
									href={`/consultations/booking-status`}
									className='transition-colors duration-200 hover:text-gray-900'
								>
									Booking Status
								</Link>
							</li>
						</ul>
					</div>

					{/* Policies Section */}
					<div>
						<h3 className='mb-4 text-lg font-semibold'>Policies</h3>
						<ul className='space-y-2'>
							{[
								'Privacy Policy',
								'Shipping Policy',
								'Refund Policy',
								'Terms and conditions',
								'Terms of Use',
							].map((item) => (
								<li key={item}>
									<Link
										href={`/${item.toLowerCase().replace(/ /g, '-')}`}
										className='transition-colors duration-200 hover:text-gray-900'
									>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Contact Section */}
				<div className='pt-8 mt-12 border-t border-gray-200'>
					<h3 className='mb-4 text-lg font-semibold'>Contact us</h3>
					<p className='mb-4'>
						Questions? We&apos;re here for you Monday - Friday 10am-6pm IST.
					</p>
					<ul className='space-y-2'>
						<li>Prakriti</li>
						<li>
							Phone:{' '}
							<a
								href='tel:+919625183125'
								className='transition-colors duration-200 hover:text-gray-900'
							>
								+91-9625183125
							</a>
						</li>
						<li>
							Email:{' '}
							<a
								href='mailto:support@apdeptnumero.in'
								className='transition-colors duration-200 hover:text-gray-900'
							>
								support@apdeptnumero.in
							</a>
						</li>
						<li>
							WhatsApp:{' '}
							<a
								href='https://wa.me/919625183125?text=Hello!%20I%20came%20from%20the%20website%20and%20would%20like%20to%20ask%20about%20your%20services.'
								className='transition-colors duration-200 hover:text-gray-900'
							>
								+91-9625183125
							</a>
						</li>
					</ul>
				</div>

				{/* Social Media Links */}
				<div className='flex justify-center mt-8 space-x-6'>
					<a
						href='https://www.facebook.com/adeptnumeroprakritiivermaa'
						className='text-gray-400 transition-all duration-300 transform hover:text-blue-600 hover:scale-110'
					>
						<span className='sr-only'>Facebook</span>
						<Facebook className='w-8 h-8' />
					</a>
					<a
						href='https://www.instagram.com/adeptnumero'
						className='text-gray-400 transition-all duration-300 transform hover:text-pink-600 hover:scale-110'
					>
						<span className='sr-only'>Instagram</span>
						<Instagram className='w-8 h-8' />
					</a>
					<a
						href='https://youtube.com/@adeptnumero?si=qS0TSypbKyrfocKT'
						className='text-gray-400 transition-all duration-300 transform hover:text-red-600 hover:scale-110'
					>
						<span className='sr-only'>YouTube</span>
						<Youtube className='w-8 h-8' />
					</a>
				</div>

				{/* Copyright */}
				<div className='mt-8 text-center'>
					<p>&copy; 2024, Adept Numero. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
