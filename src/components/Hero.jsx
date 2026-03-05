import './Hero.css';

export default function Hero({ setCurrentPage }) {
    return (
        <section className="hero">
            {/* Ambient background dots */}
            <div className="hero__bg-grid" />
            <div className="hero__glow hero__glow--1" />
            <div className="hero__glow hero__glow--2" />

            <div className="container hero__container">
                <div className="hero__content">
                    {/* Eyebrow */}
                    <div className="hero__eyebrow">
                        <span className="eyebrow-dot" />
                        <span>Premium  Pizza</span>
                    </div>

                    {/* Headline */}
                    <h1 className="hero__headline">
                        Craft Your
                        <span className="hero__headline-gold"> Perfect<br />Pizza</span>
                    </h1>

                    {/* Subheading */}
                    <p className="hero__sub">
                        Customize your pizza with real-time pricing.<br />
                        Fresh ingredients. Wood-fired perfection.
                    </p>

                    {/* CTAs */}
                    <div className="hero__ctas">
                        <button
                            className="btn-gold hero__btn-primary"
                            onClick={() => setCurrentPage('builder')}
                        >
                            <span>Start Customizing 🍕</span>
                        </button>
                        <button
                            className="btn-ghost hero__btn-secondary"
                            onClick={() => setCurrentPage('home')}
                        >
                            View Signature Pizzas
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="hero__stats">
                        {[
                            { value: '47+', label: 'Ingredients' },
                            { value: '6', label: 'Signature Pizzas' },
                            { value: '4.9★', label: 'Rating' },
                        ].map((s) => (
                            <div key={s.label} className="hero__stat">
                                <span className="stat-value">{s.value}</span>
                                <span className="stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hero Image */}
                <div className="hero__image-wrap">
                    <div className="hero__image-glow" />
                    <div className="hero__image-ring" />
                    <img
                        src="/veggie.png"
                        alt="Artisan pizza"
                        className="hero__image"
                    />
                    {/* Floating badge */}
                    <div className="hero__badge hero__badge--1">
                        <span className="badge-icon">🔥</span>
                        <div>
                            <div className="badge-title">Top-Notch</div>
                            <div className="badge-sub">900°F Oven</div>
                        </div>
                    </div>
                    <div className="hero__badge hero__badge--2">
                        <span className="badge-icon">⚡</span>
                        <div>
                            <div className="badge-title">Live Pricing</div>
                            <div className="badge-sub">Real-time updates</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="hero__scroll">
                <div className="scroll-line" />
                <span>SCROLL</span>
            </div>
        </section>
    );
}
