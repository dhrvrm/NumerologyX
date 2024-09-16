import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug, getAllPosts } from '../../../lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

function BlogBreadcrumb({ items }) {
	return (
		<nav aria-label='Breadcrumb' className='mb-4'>
			<ol className='flex items-center space-x-2 text-sm text-muted-foreground'>
				{items.map((item, index) => (
					<li key={item.href} className='flex items-center'>
						{index > 0 && <ChevronRight className='w-4 h-4 mx-2' />}
						{index === items.length - 1 ? (
							<span className='font-medium text-foreground'>{item.label}</span>
						) : (
							<Link href={item.href} className='hover:text-foreground'>
								{item.label}
							</Link>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
}

function BlogCTASection() {
	return (
		<section className='py-12 mt-12 bg-accent'>
			<div className='container px-4 mx-auto'>
				<h2 className='mb-6 text-2xl font-bold text-center'>
					Ready to Explore Numerology?
				</h2>
				<div className='flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
					<Button asChild size='lg'>
						<Link href='/consultations'>Get Consultation</Link>
					</Button>
					<Button asChild size='lg' variant='outline'>
						<Link href='/store'>Visit Store</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}

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

	const breadcrumbItems = [
		{ href: '/', label: 'Home' },
		{ href: '/blogs', label: 'Blog' },
		{ href: `/blogs/${post.slug}`, label: post.title },
	];

	return (
		<article className='container max-w-4xl px-4 py-8 mx-auto'>
			<BlogBreadcrumb items={breadcrumbItems} />
			<Image
				src={post.coverImage}
				alt={post.title}
				width={1200}
				height={600}
				className='object-cover w-full h-64 mb-8 rounded-lg md:h-96'
			/>
			<h1 className='mb-4 text-4xl font-bold'>{post.title}</h1>
			<div className='flex flex-wrap items-center justify-between mb-8'>
				<p className='text-muted-foreground'>
					By {post.author} | {post.date}
				</p>
				<div className='flex flex-wrap gap-2 mt-2 sm:mt-0'>
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
			<BlogCTASection />
		</article>
	);
}
