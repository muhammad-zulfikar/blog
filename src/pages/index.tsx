import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { ReactNode, SetStateAction } from 'react';
import { posts, sortPosts } from '../posts';
import Navbar from '../components/navbar';
import Footer from '../components/blog/footer';

function BlogLink(props: { readonly href: string; readonly children: ReactNode }) {
	return (
		<li>
			<Link
				className="hover:underline dark:text-white"
				href={props.href}
			>
				{props.children}
			</Link>
		</li>
	);
}

export default function Home() {
	const [searchQuery, setSearchQuery] = useState('');

	const searchInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.key === 'k') {
				event.preventDefault();
				searchInputRef.current?.focus();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	const handleSearchChange = (event: { target: { value: SetStateAction<string> } }) => {
		setSearchQuery(event.target.value);
	};

	const filteredPosts = sortPosts(posts).filter(post => (
		!post.hidden &&
		post.name.toLowerCase().includes(searchQuery.toLowerCase())
	));

	return (
		<div>
			<Navbar />
			<main className="max-w-prose mx-auto px-2 md:px-0">
				<div className='flex justify-center items-center p-4'>
					<div className='relative flex items-center'>
						<input
							type="text"
							placeholder="Search..."
							value={searchQuery}
							ref={searchInputRef}
							className=" md:w-80 bg-transparent border-[1px] border-black rounded-lg shadow-lg hover:shadow-xl dark:border-white text-black dark:text-white placeholder-black dark:placeholder-white p-2 outline-none"
							onChange={handleSearchChange}
						/>
						<div className="hidden md:block absolute inset-y-0 right-0 top-2 flex items-center pr-3">
							<span className="ml-2 text-xs text-gray-500 dark:text-gray-300">
								<kbd className="px-1 py-0.5 shadow-md bg-cream text-gray-700 rounded dark:bg-gray-800 dark:text-gray-300">Ctrl</kbd> + <kbd className="px-1 py-0.5 shadow-md bg-cream text-gray-700 rounded dark:bg-gray-800 dark:text-gray-300">K</kbd>
							</span>
						</div>
					</div>
				</div>
				<div className='custom-card p-4 rounded-xl mx-4 md:mx-0'>
					<h2>
						<Link href="/" className="text-glow-black dark:text-glow-white hover:underline">
							zulfikar
						</Link>
						{'/'}
						<Link href="/blog" className="text-glow-black dark:text-glow-white hover:underline">
							blog
						</Link>
					</h2>

					<ul className="space-y-1 list-disc list-inside mt-4">
						{filteredPosts.map(post => (
							<BlogLink key={post.slug} href={`/${post.slug}`}>
								{post.name}
							</BlogLink>
						))}
					</ul>
				</div>

				<Footer />
			</main>
		</div>
	);
}