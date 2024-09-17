import { consultations } from '../../../lib/Consulations';
import ConsultationPageClient from './_components/ConsultationPageClient'; // Client component for UI

// Function to generate dynamic metadata based on the consultation slug
export async function generateMetadata({ params }) {
	const consultation = consultations.find((c) => c.slug === params.slug);

	if (!consultation) {
		return {
			title: 'Consultation Not Found',
			description: 'The requested consultation could not be found.',
		};
	}

	return {
		title: `${consultation.title} | AdeptNumero Consultations`,
		description: `${consultation.description.slice(0, 155)}...`,
		openGraph: {
			images: [{ url: consultation.image }],
		},
		other: {
			'og:type': 'article',
			'og:url': `https://www.adeptnumero.in/consultations/${consultation.slug}`,
		},
	};
}

// Server-side component to fetch consultation details
export default async function ConsultationPage({ params }) {
	const consultation = consultations.find((c) => c.slug === params.slug);

	if (!consultation) {
		return <div>Consultation not found</div>;
	}

	// Pass consultation details to a client component for interactive UI
	return <ConsultationPageClient consultation={consultation} />;
}
