import { useState, useRef, useEffect } from 'react';
import { FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';

function useClickOutside(ref: React.RefObject<HTMLDivElement>, buttonRef: React.RefObject<HTMLButtonElement>, onClickOutside: () => void) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                onClickOutside();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, buttonRef, onClickOutside]);
}

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const router = useRouter();

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const handleRedirect = (path: string) => {
        router.push(path);
        setIsNavOpen(false);
    };

    useClickOutside(navRef, buttonRef, () => setIsNavOpen(false));

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <div className="flex justify-between items-center p-4 bg-transparent">
                <button
                    ref={buttonRef}
                    className="px-4 py-2 ml-2 mt-2 md:mt-4 md:ml-4 rounded-lg custom-card"
                    onClick={toggleNav}
                >
                    <FiMenu className="w-5 h-auto" />
                </button>
                <button
                    className={`px-4 py-2 mr-2 mt-2 md:mt-4 md:mr-4 rounded-lg custom-card ${isNavOpen && 'z-10'}`}
                    onClick={toggleTheme}
                >
                    {theme === 'dark' ? <FiSun className="w-5 h-auto" /> : <FiMoon className="w-5 h-auto" />}
                </button>
            </div>
            {isNavOpen && (
                <div ref={navRef} className="absolute left-6 md:left-10 w-48 rounded-md">
                    <div className='text-black dark:text-white rounded-xl focus:outline-none custom-card'>
                        <ul>
                            <li className="py-2 px-4 hover:underline cursor-pointer rounded-xl" onClick={() => handleRedirect('/')}>
                                /
                            </li>
                            <li className="py-2 px-4 hover:underline cursor-pointer rounded-xl" onClick={() => handleRedirect('/projects')}>
                                /projects
                            </li>
                            <li className="py-2 px-4 hover:underline cursor-pointer rounded-xl" onClick={() => handleRedirect('/blog')}>
                                /blog
                            </li>
                            <li className="py-2 px-4 hover:underline cursor-pointer rounded-xl" onClick={() => handleRedirect('/contact')}>
                                /contact
                            </li>
                            <li className="py-2 px-4 hover:underline cursor-pointer rounded-xl" onClick={() => handleRedirect('/stats')}>
                                /stats
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}