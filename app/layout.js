import Header from '../components/common/Header.component';
import './globals.css';
import { Lora, Nunito } from 'next/font/google';
import Footer from '../components/common/Footer.component';

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

export default function RootLayout({ children }) {
	return (
		<html lang='en' className={`${lora.variable} ${nunito.variable}`}>
			<body>
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
