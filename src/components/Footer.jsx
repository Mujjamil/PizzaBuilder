import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="container footer__grid">
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <span className="logo-slice">First</span><span className="logo-craft">Cup</span>
                        </div>
                        <p className="footer__tagline">
                            Handcrafted with premium ingredients.<br />Wood-fired perfection in every bite.
                        </p>
                        <div className="footer__social">
                            {['fb', 'yt', 'ig'].map((s) => (
                                <a key={s} href="#" className="social-link" aria-label={s}>
                                    {s === 'fb' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>}
                                    {s === 'yt' && <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" /></svg>}
                                    {s === 'ig' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__col-title">Menu</h4>
                        <ul className="footer__links">
                            {['Signature Pizzas', 'Seasonal Specials', 'Sides & Salads', 'Desserts', 'Beverages'].map((l) => (
                                <li key={l}><a href="#" className="footer__link">{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__col-title">Experience</h4>
                        <ul className="footer__links">
                            {['Pizza Builder', 'Catering', 'Private Events', 'Gift Cards', 'Rewards Program'].map((l) => (
                                <li key={l}><a href="#" className="footer__link">{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__col-title">Visit Us</h4>
                        <div className="footer__address">
                            <p>123 Artisan Way</p>
                            <p>New York, NY 10001</p>
                            <p className="footer__hours">Mon – Sun: 11am – 11pm</p>
                            <a href="tel:+12125550199" className="footer__phone">+1 (212) 555-0199</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <div className="container footer__bottom-inner">
                    <span className="footer__logo footer__logo--sm">
                        🍕 <span className="logo-craft">FirstCup</span>
                    </span>
                    <p className="footer__copy">© 2025 FirstCup Pizza Co. All rights reserved.</p>
                    <div className="footer__legal">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                        <a href="#">Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
