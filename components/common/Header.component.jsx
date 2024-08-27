import GetStartedButton from '../animata/button/get-started-button';
import NavTabs from '../animata/container/nav-tabs';
import Link from 'next/navigation';

const Header = () => {
	const tabs = ['Store', 'Services', 'About', 'Blogs'];
	return (
		<header className='sticky flex items-center justify-between px-10 py-4 border-2 border-grey-50'>
			<a href='/' className='logo font-2xl font-heading'>
				NumerelogyX
			</a>
			<nav className='hidden lg:flex'>
				<NavTabs tabs={tabs} />
			</nav>
			<GetStartedButton
				text='Get Consulation'
				className='w-max whitespace-nowrap'
			/>
		</header>
	);
};

export default Header;
