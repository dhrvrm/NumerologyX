import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '../../lib/posts';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

export default function BlogIndex() {
	const posts = getAllPosts();

	return (
		<div className='container px-4 py-8 mx-auto'>
			<h1 className='mb-8 text-4xl font-bold'>Blog Posts</h1>
			<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{posts.map((post) => (
					<Card
						key={post.slug}
						className='transition-shadow duration-300 hover:shadow-lg'
					>
						<Link href={`/blogs/${post.slug}`}>
							<CardHeader>
								<Image
									src={
										post.coverImage || '/images/services/vedic-remedies.webp'
									}
									alt={post.title}
									width={400}
									height={200}
									className='object-cover w-full h-48 rounded-t-lg'
								/>
								<CardTitle className='mt-4'>{post.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-muted-foreground'>{post.excerpt}</p>
							</CardContent>
							<CardFooter className='flex flex-col items-start'>
								<p className='mb-2 text-sm text-muted-foreground'>
									By {post.author} | {post.date}
								</p>
								<div className='flex flex-wrap gap-2'>
									{post.tags.map((tag) => (
										<Badge key={tag} variant='secondary'>
											{tag}
										</Badge>
									))}
								</div>
							</CardFooter>
						</Link>
					</Card>
				))}
			</div>
		</div>
	);
}
