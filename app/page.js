import HeroSection from '@/components/sections/HeroSection';
import ProblemStatementSection from '@/components/sections/ProblemStatementSection';
import ServiceOverviewSection from '@/components/sections/ServiceOverviewSection';
import StoreOverviewSection from '@/components/sections/StoreOverviewSection';

export default function Home() {
	return (
		<main>
			<HeroSection />
			<ProblemStatementSection />
			<ServiceOverviewSection />
			<StoreOverviewSection />
		</main>
	);
}
