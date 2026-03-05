import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar({ currentPage, setCurrentPage, cartCount }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner">
                {/* Logo */}
                <button className="navbar__logo" onClick={() => setCurrentPage('home')}>
                    <img
                        src="/fc.svg"
                        alt="First Cup"
                        className="navbar__logo-img"
                    />
                </button>

                {/* Desktop Nav Links */}
                <ul className="navbar__links">
                    {['Menu', 'Builder', 'Locations', 'Rewards'].map((item) => (
                        <li key={item}>
                            <button
                                className={`navbar__link ${currentPage === item.toLowerCase() ? 'active' : ''}`}
                                onClick={() => setCurrentPage(item === 'Builder' ? 'builder' : 'home')}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Right Actions */}
                <div className="navbar__actions">
                    <button className="navbar__cart" aria-label="Cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>
                    <button className="btn-gold btn-gold--sm" onClick={() => setCurrentPage('builder')}>
                        <span>Order Now</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                    {/* Mobile hamburger */}
                    <button className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                        <span className={menuOpen ? 'open' : ''} />
                        <span className={menuOpen ? 'open' : ''} />
                        <span className={menuOpen ? 'open' : ''} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`navbar__mobile-menu ${menuOpen ? 'open' : ''}`}>
                {['Menu', 'Builder', 'Locations', 'Rewards'].map((item) => (
                    <button
                        key={item}
                        className="mobile-link"
                        onClick={() => { setCurrentPage(item === 'Builder' ? 'builder' : 'home'); setMenuOpen(false); }}
                    >
                        {item}
                    </button>
                ))}
                <button className="btn-gold mobile-cta" onClick={() => { setCurrentPage('builder'); setMenuOpen(false); }}>
                    <span>Order Now</span>
                </button>
            </div>
        </nav>
    );
}
