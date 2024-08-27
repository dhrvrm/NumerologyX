import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compareDesc } from 'date-fns';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPosts() {
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		const slug = fileName.replace(/\.mdx$/, '');
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const { data } = matter(fileContents);

		return {
			slug,
			...data,
		};
	});

	return allPostsData.sort((a, b) =>
		compareDesc(new Date(a.date), new Date(b.date))
	);
}

export function getPostBySlug(slug) {
	try {
		const fullPath = path.join(postsDirectory, `${slug}.mdx`);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const { data, content } = matter(fileContents);

		return {
			slug,
			content,
			...data,
		};
	} catch (error) {
		return null;
	}
}
