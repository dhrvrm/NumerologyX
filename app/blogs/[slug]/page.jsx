import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '../../../lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';

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
		<article className='max-w-3xl mx-auto mt-10'>
			<h1>{post.title}</h1>
			<p>
				By {post.author} | {post.date}
			</p>
			<MDXRemote source={post.content} />
		</article>
	);
}
