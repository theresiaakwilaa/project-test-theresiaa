import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png'; // ⬅️ pastikan path sesuai

const Header = () => {
  const [show, setShow] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setShow(currentScrollPos < scrollPos || currentScrollPos < 50);
      setScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPos]);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-orange-500 ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="container mx-10 px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Suitmedia */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img 
                src={Logo} 
                alt="Suitmedia Logo" 
                className="h-15 w-auto brightness-0 invert drop"
              />
            </a>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:block mx-10">
            <ul className="flex items-center space-x-10">
              {['Work', 'About', 'Services', 'Ideas', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase()}`}
                    className={`text-white hover:text-orange-100 transition-colors duration-200 font-normal text-base pb-1 ${
                      item === 'Ideas' ? 'border-b-2 border-white' : ''
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-white hover:text-orange-100 focus:outline-none focus:text-orange-100"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
