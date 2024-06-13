import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import Navbar from '../components/blog/navbar';

export default function Page404() {
    return (
        <div className="flex justify-center items-center mt-20">
            <main className="mx-auto grid max-w-2xl grid-cols-4 mb-6">
                <Navbar />
                <div className="col-span-4 flex h-52 flex-col justify-center items-center overflow-hidden rounded-xl px-8 py-10 relative custom-card">
                    <Link
                        className="absolute top-4 left-4 px-4 py-2 rounded-xl focus:outline-none custom-card"
                        href="/"
                    >
                        <FiArrowLeft className="text-black dark:text-white" size={24} />
                    </Link>

                    <div className="space-y-4 text-center">
                        <div>
                            <h1 className="text-xl text-black dark:text-white dark:text-glow-white">
                                404
                            </h1>
                            <p className="text-black dark:text-white dark:text-opacity-70">
                                Sorry, I couldn't locate that page for you
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
