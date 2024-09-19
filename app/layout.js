import { Lora, Nunito } from 'next/font/google';
import Header from '../components/common/Header.component';
import Footer from '../components/common/Footer.component';
import './globals.css';

const lora = Lora({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-lora',
});

const nunito = Nunito({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-nunito',
});

export const metadata = {
	title: 'AdeptNumero | Expert Numerology Consulation & Mystical Products',
	description:
		'Discover your life path with personalized numerology consultations. Shop authentic stones, yantras, and pendants for spiritual growth at AdeptNumero.',
	keywords:
		'numerology, consultations, gemstones, yantras, pendants, spiritual products, life path guidance',
	openGraph: {
		title: 'AdeptNumero | Expert Numerology Consulation & Mystical Products',
		description:
			'Discover your life path with personalized numerology consultations. Shop authentic stones, yantras, and pendants for spiritual growth at AdeptNumero.',
		type: 'website',
		url: 'https://www.adeptnumero.in',
		image: 'https://www.adeptnumero.in/images/og-image.jpg',
		site_name: 'AdeptNumero.in',
	},
	twitter: {
		card: 'summary_large_image',
		site: '@adeptnumero',
		title: 'AdeptNumero.in | Expert Numerology Consulation & Mystical Products',
		description:
			'Discover your life path with personalized numerology consultations. Shop authentic stones, yantras, and pendants for spiritual growth at AdeptNumero.in.',
		image: 'https://www.adeptnumero.in/images/twitter-image.jpg',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' className={`${lora.variable} ${nunito.variable}`}>
			<head>
				<link rel='icon' href='/favicon.ico' sizes='any' />
				<link rel='icon' type='image/x-icon' href='/favicon.ico' />
				<link rel='shortcut icon' href='/favicon.ico' />
			</head>
			<body>
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
