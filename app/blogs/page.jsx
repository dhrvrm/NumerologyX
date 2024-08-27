import Link from 'next/link';
import { getAllPosts } from '../../lib/posts';

export default function BlogIndex() {
	const posts = getAllPosts();

	return (
		<div>
			<h1>Blog Posts</h1>
			<ul>
				{posts.map((post) => (
					<li key={post.slug}>
						<Link href={`/blogs/${post.slug}`}>
							<h2>{post.title}</h2>
						</Link>
						<p>{post.excerpt}</p>
						<p>
							By {post.author} | {post.date}
						</p>
						<p>Tags: {post.tags.join(', ')}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
