import BlogListSkeleton from '../../components/skeletons/BlogListSkeleton';

const loading = () => {
	return (
		<div className='grid grid-cols-1 gap-4 mt-10 md:grid-cols-4'>
			<BlogListSkeleton />
			<BlogListSkeleton />
			<BlogListSkeleton />
			<BlogListSkeleton />
		</div>
	);
};

export default loading;
