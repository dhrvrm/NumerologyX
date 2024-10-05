import ContactForm from './_components/ContactForm.component';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '../../..//components/ui/card';
import {
	PhoneIcon,
	MailIcon,
	MessageCircleIcon,
	FacebookIcon,
	InstagramIcon,
	YoutubeIcon,
} from 'lucide-react';
import { Toaster } from '../../../components/ui/toaster';

export default function ContactPage() {
	return (
		<div className='container px-4 py-8'>
			<h1 className='mb-4 text-3xl font-medium'>Contact Us</h1>
			<p className='mb-8'>
				Questions? We&apos;re here for you Monday - Friday 10am-6pm IST.
			</p>

			<div className='grid gap-8 md:grid-cols-2'>
				<Card>
					<CardHeader>
						<CardTitle>Contact Information</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className='space-y-4'>
							<li className='flex items-center'>
								<PhoneIcon className='mr-2' />
								<span>
									Phone:{' '}
									<a
										href='tel:+919625183125'
										className='transition-colors duration-200 hover:text-gray-900'
									>
										+91-9625183125
									</a>
								</span>
							</li>
							<li className='flex items-center'>
								<MailIcon className='mr-2' />
								<span>
									Email:{' '}
									<a
										href='mailto:support@apdeptnumero.in'
										className='transition-colors duration-200 hover:text-gray-900'
									>
										support@apdeptnumero.in
									</a>
								</span>
							</li>
							<li className='flex items-center'>
								<MessageCircleIcon className='mr-2' />
								<span>
									WhatsApp:{' '}
									<a
										href='https://wa.me/919625183125?text=Hello!%20I%20came%20from%20the%20website%20and%20would%20like%20to%20ask%20about%20your%20services.'
										className='transition-colors duration-200 hover:text-gray-900'
									>
										+91-9625183125
									</a>
								</span>
							</li>
							<h4>Social Media</h4>
							<li className='flex flex-col gap-4'>
								<a
									href='https://www.facebook.com/adeptnumeroprakritiivermaa'
									className='flex gap-2 transition-all duration-300 transform hover:text-blue-600 hover:scale-101'
								>
									<FacebookIcon className='w-6 h-6 p-1 rounded-sm bg-slate-100' />
									<span>Facebook</span>
								</a>
								<a
									href='https://www.instagram.com/adeptnumero'
									className='flex gap-2 transition-all duration-300 transform hover:text-pink-600 hover:scale-101'
								>
									<InstagramIcon className='w-6 h-6 p-1 rounded-sm bg-slate-100' />
									<span>Instagram</span>
								</a>
								<a
									href='https://youtube.com/@adeptnumero?si=qS0TSypbKyrfocKT'
									className='flex items-end gap-2 transition-all duration-300 transform hover:text-red-600 hover:scale-101'
								>
									<YoutubeIcon className='w-6 h-6 p-1 rounded-sm bg-slate-100' />
									<span>YouTube</span>
								</a>
							</li>
						</ul>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Send us a message</CardTitle>
					</CardHeader>
					<CardContent>
						<ContactForm />
					</CardContent>
				</Card>
			</div>

			<Card className='mt-8'>
				<CardHeader>
					<CardTitle>Company Information</CardTitle>
				</CardHeader>
				<CardContent>
					<p>
						<strong>Merchant Legal entity name:</strong> PRAKRITI
					</p>
					<p>
						<strong>Registered Address:</strong> WZ- 9 and 10 Front Side, 4th
						Floor, Om Vihar Phase 3, Delhi, Delhi, PIN: 110059
					</p>
					<p>
						<strong>Operational Address:</strong> WZ- 9 and 10 Front Side, 4th
						Floor, Om Vihar Phase 3, Delhi, Delhi, PIN: 110059
					</p>
					<p>
						<strong>Telephone No:</strong> 9625183125
					</p>
					<p>
						<strong>E-Mail ID:</strong> adeptnumero@gmail.com
					</p>
				</CardContent>
			</Card>
			<Toaster />
		</div>
	);
}
