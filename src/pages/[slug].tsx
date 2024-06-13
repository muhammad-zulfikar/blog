import { useState, useEffect } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { posts } from '../posts';
import Navbar from '../components/blog/navbar';
import TableOfContents from '../components/toc';
import Footer from '../components/blog/footer';

type Props = {
	readonly slug: string;
};

export default function PostPage({ slug }: Props) {
	const post = posts.find(post => post.slug === slug)!;
	const [tocVisible, setTocVisible] = useState(true);

	useEffect(() => {
		const headings = document.querySelectorAll('h2, h3, h4, h5, h6');
		if (headings.length === 0) {
			setTocVisible(false);
		}
	}, []);

	return (
		<div className="space-y-4 px-4">
			<Navbar />
			<Head>
				<title>{post.name}</title>
				<meta name="description" content={post.excerpt} />
				<meta name="keywords" content={post.keywords.join(', ')} />
				<meta name="theme-color" content={post.hidden ? '#ebb305' : '#171717'} />
			</Head>

			{post.hidden && (
				<div className="bg-yellow-500 text-yellow-900 rounded-md py-2 px-4">
					<p>Hey! This post is hidden! Please don't share the link for now...</p>
				</div>
			)}

			<div className="flex justify-end px-4 md:px-20">
				<p>
					<time dateTime={post.date.toISOString()}>{post.date.toDateString()}</time>
				</p>
			</div>

			<div className={`flex ${tocVisible ? 'justify-between px-4 md:px-20' : 'justify-center px-2 md:px-20'} gap-8`}>
				<div className={`md:flex ${tocVisible ? 'justify-start md:p-4' : 'justify-center'} w-full md:custom-card rounded-xl`}>
					<main className={`prose prose-hr:border-neutral-200 dark:prose-hr:border-neutral-800 prose-blue prose-img:rounded-md prose-img:w-full dark:prose-invert ${tocVisible ? 'md:max-w-4xl' : 'md:w-full'}`}>
						{post.render()}
					</main>
				</div>
				{tocVisible && (
					<aside className="hidden md:block md:w-1/4 lg:w-1/3">
						<TableOfContents content={post.render()} />
					</aside>
				)}
			</div>

			<Footer />
		</div>
	);
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
	const slug = params!.slug as string;

	const post = posts.find(post => post.slug === slug);

	if (!post) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			slug,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => ({
	paths: posts.map(post => ({ params: { slug: post.slug } })),
	fallback: false,
});