import HeroSection from '../components/sections/HeroSection';
import ProblemStatementSection from '../components/sections/ProblemStatementSection';
import ServiceOverviewSection from '../components/sections/ServiceOverviewSection';
import StoreOverviewSection from '../components/sections/StoreOverviewSection';
import TestimonialSection from '../components/sections/TestimonialSection';
import StylishTestimonial from '../components/sections/SingularTestimonial';

export const metadata = {
	alternates: {
		canonical: 'https://www.adeptnumero.in',
	},
};

export default function Home() {
	return (
		<main>
			<HeroSection />
			<StylishTestimonial />
			<ServiceOverviewSection />
			{/* <StoreOverviewSection /> */}
			{/* <ProblemStatementSection /> */}
			<TestimonialSection />
		</main>
	);
}
