import { FiArrowLeft, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <div className="flex justify-between items-center p-4 bg-transparent">
                <Link href="/blog" className="px-4 py-2 ml-2 md:mt-4 md:ml-4 rounded-lg custom-card">
                    <FiArrowLeft className="w-5 h-auto" />
                </Link>
                <button
                    type="button"
                    className="px-4 py-2 mr-2 md:mt-4 md:mr-4 rounded-lg custom-card"
                    onClick={toggleTheme}
                >
                    <span>{theme === 'dark' ? <FiSun className="w-5 h-auto" /> : <FiMoon className="w-5 h-auto" />}</span>
                </button>
            </div>
        </div>
    );
}