import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mx-auto flex max-w-3xl items-center justify-center px-6 pb-12 text-sm text-neutral-600 dark:text-gray-400 [&_a:hover]:underline [&_a]:p-4 [&_a]:transition-colors">
            <Link href="https://muhammad-zulfikar.github.io">/</Link>
            <Link href="https://muhammad-zulfikar.github.io/stats">/stats</Link>
            <Link href="https://github.com/muhammad-zulfikar/blog" target='_blank' rel="noopener noreferrer">/source</Link>
        </footer>
    );
}