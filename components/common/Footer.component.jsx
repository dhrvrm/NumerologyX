import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
	return (
		<footer className='py-12 text-gray-600 bg-gray-100'>
			<div className='container px-4 mx-auto'>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
					{/* Shop Section */}
					<div>
						<h3 className='mb-4 text-lg font-semibold'>Shop</h3>
						<ul className='space-y-2'>
							{['Raw Stone', 'Mala', 'Bracelet', 'Pendant', 'Ring'].map(
								(item) => (
									<li key={item}>
										<Link
											href={`/store/collection/${item.toLowerCase()}`}
											className='transition-colors duration-200 hover:text-gray-900'
										>
											{item}
										</Link>
									</li>
								)
							)}
						</ul>
					</div>

					{/* Consultations Section */}
					<div>
						<h3 className='mb-4 text-lg font-semibold'>Consultations</h3>
						<ul className='space-y-2'>
							{[
								'Numerology Consultation',
								'Name Correction Consultation',
								'Relationship Consultation',
								'General Consultation',
								'Mobile Numerology Consultation',
								'Yantra Recommnedation',
							].map((item) => (
								<li key={item}>
									<Link
										href={`/consultations/${item
											.toLowerCase()
											.replace(' ', '-')}`}
										className='transition-colors duration-200 hover:text-gray-900'
									>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Company Section */}
					<div>
						<h3 className='mb-4 text-lg font-semibold'>Company</h3>
						<ul className='space-y-2'>
							{['About', 'Blogs', 'FAQs', 'Track Order'].map((item) => (
								<li key={item}>
									<Link
										href={`/${item.toLowerCase().replace(' ', '-')}`}
										className='transition-colors duration-200 hover:text-gray-900'
									>
										{item}
									</Link>
								</li>
							))}
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
								'Terms of Service',
							].map((item) => (
								<li key={item}>
									<Link
										href={`/policies/${item.toLowerCase().replace(/ /g, '-')}`}
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
						Questions? We&apos;re here for you Monday - Saturday 10am-6pm IST.
					</p>
					<ul className='space-y-2'>
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
								href='mailto:care@adept.com'
								className='transition-colors duration-200 hover:text-gray-900'
							>
								care@adept.com
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
						href='https://youtube.com/@advancnumerologer'
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
