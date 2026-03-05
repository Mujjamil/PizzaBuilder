import { useState } from 'react';
import { signaturePizzas } from '../data/pizzas';
import './SignatureGrid.css';

const CATEGORIES = ['All', 'Meat Lovers', 'Vegetarian', 'Spicy Heat', 'Vegan'];

const tagColors = {
    spicy: { bg: 'rgba(224, 108, 46, 0.15)', color: '#e06c2e', border: 'rgba(224, 108, 46, 0.3)' },
    veggie: { bg: 'rgba(52, 168, 83, 0.12)', color: '#5cb85c', border: 'rgba(52, 168, 83, 0.25)' },
    bestseller: { bg: 'rgba(201, 168, 76, 0.15)', color: '#c9a84c', border: 'rgba(201, 168, 76, 0.3)' },
};

export default function SignatureGrid({ setCurrentPage }) {
    const [activeFilter, setActiveFilter] = useState('All');

    return (
        <section className="sig-grid" id="menu">
            <div className="container">
                <div className="section-header">
                    <span className="section-label">Our Menu</span>
                    <h2 className="section-title">
                        Curated Slices for the<br />
                        <em>Discerning Palate</em>
                    </h2>
                    <div className="gold-line" />
                    <p className="section-subtitle">
                        Explore our chef-designed signature pies. Tailor any pizza to your exacting
                        standards, or experience our culinary vision as intended.
                    </p>
                </div>

                {/* Filter tabs */}
                <div className="sig-grid__filters">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                            onClick={() => setActiveFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Pizza Cards Grid */}
                <div className="sig-grid__cards">
                    {signaturePizzas.map((pizza) => (
                        <PizzaCard key={pizza.id} pizza={pizza} setCurrentPage={setCurrentPage} />
                    ))}
                </div>

                {/* Discover More */}
                <div className="sig-grid__footer">
                    <button className="discover-btn">
                        Discover More Creations
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}

function PizzaCard({ pizza, setCurrentPage }) {
    const [hovered, setHovered] = useState(false);
    const tag = pizza.tag ? tagColors[pizza.tag] : null;

    return (
        <div
            className={`pizza-card ${hovered ? 'pizza-card--hovered' : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Image */}
            <div className="pizza-card__img-wrap">
                {pizza.tagLabel && (
                    <span
                        className="pizza-card__tag"
                        style={tag ? { background: tag.bg, color: tag.color, borderColor: tag.border } : {}}
                    >
                        {pizza.tagLabel}
                    </span>
                )}
                <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="pizza-card__img"
                    loading="lazy"
                />
                <div className="pizza-card__img-overlay" />
            </div>

            {/* Content */}
            <div className="pizza-card__content">
                <div className="pizza-card__header">
                    <h3 className="pizza-card__name">{pizza.name}</h3>
                    <span className="pizza-card__price">₹{pizza.price}</span>
                </div>
                <p className="pizza-card__desc">{pizza.description}</p>

                <div className="pizza-card__footer">
                    <div className="pizza-card__badges">
                        {pizza.badges.map((b) => (
                            <span key={b} className="badge-chip">{b}</span>
                        ))}
                    </div>
                    <button
                        className="pizza-card__cta"
                        onClick={() => setCurrentPage('builder')}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="3" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                        Tailor Your Pizza
                    </button>
                </div>
            </div>
        </div>
    );
}
