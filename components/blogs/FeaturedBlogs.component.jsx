import Link from 'next/link';
import { getAllPosts } from '../../lib/posts';

export default function FeaturedPosts() {
	const posts = getAllPosts();
	const featuredPosts = posts.filter((post) => post.featured);

	return (
		<div>
			<h1>Featured Posts</h1>
			<ul>
				{featuredPosts.map((post) => (
					<li key={post.slug}>
						<Link href={`/blog/${post.slug}`}>
							<h2>{post.title}</h2>
						</Link>
						<p>{post.excerpt}</p>
						<p>
							By {post.author} | {post.date}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
}
