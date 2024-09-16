import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug, getAllPosts } from '../../../lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '../../../components/ui/badge';

export async function generateStaticParams() {
	const posts = getAllPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export async function generateMetadata({ params }) {
	const post = getPostBySlug(params.slug);

	if (!post) {
		return {
			title: 'Post Not Found',
			description: 'The requested blog post could not be found.',
		};
	}

	return {
		title: post.title,
		description: post.excerpt,
		openGraph: {
			title: post.title,
			description: post.excerpt,
			type: 'article',
			publishedTime: post.date,
			authors: [post.author],
			tags: post.tags,
		},
	};
}

export default async function Post({ params }) {
	const post = getPostBySlug(params.slug);

	if (!post) {
		notFound();
	}

	return (
		<article className='container max-w-3xl px-4 py-8 mx-auto'>
			<Image
				src={post.coverImage || '/images/services/career-service.jpg'}
				alt={post.title}
				width={800}
				height={400}
				className='object-cover w-full h-64 mb-8 rounded-lg'
			/>
			<h1 className='mb-4 text-4xl font-bold'>{post.title}</h1>
			<div className='flex items-center justify-between mb-8'>
				<p className='text-muted-foreground'>
					By {post.author} | {post.date}
				</p>
				<div className='flex flex-wrap gap-2'>
					{post.tags.map((tag) => (
						<Badge key={tag} variant='secondary'>
							{tag}
						</Badge>
					))}
				</div>
			</div>
			<div className='prose prose-lg max-w-none'>
				<MDXRemote source={post.content} />
			</div>
		</article>
	);
}
