import { useState } from 'react';
import { sauces, cheeses, toppings, signaturePizzas } from '../data/pizzas';
import './PizzaBuilder.css';

const PIZZA_BASE_IMAGE = '/cheesepizza.png';

const TOPPING_POSITIONS = [
    { x: 50, y: 30 }, { x: 70, y: 45 }, { x: 35, y: 55 }, { x: 60, y: 65 },
    { x: 45, y: 42 }, { x: 28, y: 38 }, { x: 65, y: 30 }, { x: 55, y: 56 },
    { x: 38, y: 68 }, { x: 72, y: 58 }, { x: 48, y: 22 }, { x: 30, y: 50 },
];

export default function PizzaBuilder({ setCartItems }) {
    const [selectedBasePizza, setSelectedBasePizza] = useState(null);
    const [selectedSauce, setSelectedSauce] = useState(null);
    const [selectedCheese, setSelectedCheese] = useState(null);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [orderNumber] = useState(() => Math.floor(Math.random() * 9000) + 1000);

    const basePizzaPrice = selectedBasePizza ? selectedBasePizza.price : 0;
    const toppingExtras = selectedToppings.reduce((sum, t) => sum + t.price, 0);
    const cheeseExtra = selectedCheese ? selectedCheese.price : 0;
    const sauceExtra = selectedSauce ? selectedSauce.price : 0;
    const unitPrice = basePizzaPrice + sauceExtra + cheeseExtra + toppingExtras;
    const totalPrice = unitPrice * quantity;

    const toggleTopping = (topping) => {
        setSelectedToppings((prev) =>
            prev.find((t) => t.id === topping.id)
                ? prev.filter((t) => t.id !== topping.id)
                : [...prev, topping]
        );
    };

    const removeSauce = () => setSelectedSauce(null);
    const removeCheese = () => setSelectedCheese(null);
    const removeTopping = (id) => setSelectedToppings((prev) => prev.filter((t) => t.id !== id));

    const handleAddToCart = () => {
        if (!selectedBasePizza) return;
        const additions = [
            ...(selectedSauce ? [`${selectedSauce.label} sauce`] : []),
            ...(selectedCheese ? [selectedCheese.label] : []),
            ...selectedToppings.map((t) => t.label),
        ];
        setCartItems((prev) => [
            ...prev,
            {
                pizzaName: selectedBasePizza.name,
                additions,
                quantity,
                totalPrice: unitPrice,
            },
        ]);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2500);
    };

    return (
        <div className="builder">
            <div className="builder__header">
                <div className="container">
                    <div className="builder__header-inner">
                        <div>
                            <h1 className="builder__title">Craft Your Pie</h1>
                            <p className="builder__subtitle">
                                <span className="builder__subtitle-accent">Premium Ingredients Only</span>
                            </p>
                        </div>
                        <div className="builder__order-info">
                            <span className="order-num">ORDER #{orderNumber}</span>
                            <div className="oven-status">
                                <span className="oven-dot" />
                                Wood Oven Active
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="builder__layout">
                    {/* ===== LEFT PANEL ===== */}
                    <LeftPanel
                        selectedBasePizza={selectedBasePizza}
                        setSelectedBasePizza={setSelectedBasePizza}
                        selectedSauce={selectedSauce}
                        setSelectedSauce={setSelectedSauce}
                        selectedCheese={selectedCheese}
                        setSelectedCheese={setSelectedCheese}
                        selectedToppings={selectedToppings}
                        toggleTopping={toggleTopping}
                    />

                    {/* ===== CENTER PANEL ===== */}
                    <CenterPanel
                        selectedSauce={selectedSauce}
                        selectedToppings={selectedToppings}
                    />

                    {/* ===== RIGHT PANEL ===== */}
                    <RightPanel
                        selectedBasePizza={selectedBasePizza}
                        selectedSauce={selectedSauce}
                        selectedCheese={selectedCheese}
                        selectedToppings={selectedToppings}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        totalPrice={totalPrice}
                        unitPrice={unitPrice}
                        handleAddToCart={handleAddToCart}
                        addedToCart={addedToCart}
                        removeSauce={removeSauce}
                        removeCheese={removeCheese}
                        removeTopping={removeTopping}
                    />
                </div>
            </div>
        </div>
    );
}

/* ===== LEFT PANEL ===== */
function LeftPanel({ selectedBasePizza, setSelectedBasePizza, selectedSauce, setSelectedSauce, selectedCheese, setSelectedCheese, selectedToppings, toggleTopping }) {
    return (
        <aside className="panel panel--left">

            {/* Pizza Size / Base */}
            <BuilderSection title="Choose Your Pizza" icon="🍕">
                <div className="size-options">
                    {signaturePizzas.map((p) => (
                        <button
                            key={p.id}
                            className={`size-btn ${selectedBasePizza?.id === p.id ? 'active' : ''}`}
                            onClick={() => setSelectedBasePizza(p)}
                        >
                            <span className="size-badge">{p.badges[0]}</span>
                            <div className="size-info">
                                <span className="size-name">{p.name}</span>
                                <span className="size-desc">{p.description}</span>
                            </div>
                            <span className="size-price">₹{p.price}</span>
                        </button>
                    ))}
                </div>
            </BuilderSection>

            {/* Sauce */}
            <BuilderSection title="Sauce Base" icon="🍅">
                <div className="sauce-options">
                    {sauces.map((s) => (
                        <button
                            key={s.id}
                            className={`sauce-btn ${selectedSauce?.id === s.id ? 'active' : ''}`}
                            onClick={() => setSelectedSauce(s)}
                            title={s.label}
                        >
                            <span
                                className="sauce-circle"
                                style={{ background: s.color, boxShadow: selectedSauce?.id === s.id ? `0 0 12px ${s.color}88` : 'none' }}
                            />
                            <span className="sauce-label">{s.label}</span>
                            {s.price > 0 && <span className="option-price">+₹{s.price}</span>}
                        </button>
                    ))}
                </div>
            </BuilderSection>

            {/* Cheese */}
            <BuilderSection title="Formaggio" icon="🧀">
                <div className="cheese-options">
                    {cheeses.map((c) => (
                        <button
                            key={c.id}
                            className={`cheese-btn ${selectedCheese?.id === c.id ? 'active' : ''}`}
                            onClick={() => setSelectedCheese(c)}
                        >
                            <div className="cheese-radio">
                                {selectedCheese?.id === c.id && <div className="cheese-radio-dot" />}
                            </div>
                            <div className="cheese-info">
                                <span className="cheese-name">{c.label}</span>
                                <span className="cheese-sub">{c.subtitle}</span>
                            </div>
                            {c.price > 0 && <span className="option-price">+₹{c.price}</span>}
                        </button>
                    ))}
                </div>
            </BuilderSection>

            {/* Toppings */}
            <BuilderSection title="Charcuterie & Extras" icon="🍄">
                <div className="topping-grid">
                    {toppings.map((t) => {
                        const isSelected = selectedToppings.find((s) => s.id === t.id);
                        return (
                            <button
                                key={t.id}
                                className={`topping-card ${isSelected ? 'active' : ''}`}
                                onClick={() => toggleTopping(t)}
                            >
                                {isSelected && (
                                    <span className="topping-check">
                                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </span>
                                )}
                                <span className="topping-emoji">{t.emoji}</span>
                                <span className="topping-name">{t.label}</span>
                                <span className="topping-price">+₹{t.price}</span>
                            </button>
                        );
                    })}
                </div>
            </BuilderSection>
        </aside>
    );
}

/* ===== CENTER PANEL ===== */
function CenterPanel({ selectedSauce, selectedToppings }) {
    return (
        <div className="panel panel--center">
            <div className="pizza-preview">
                <div className="pizza-canvas">
                    <div
                        className="pizza-ring"
                        style={{ boxShadow: selectedSauce ? `0 0 60px ${selectedSauce.color}44, inset 0 0 40px rgba(0,0,0,0.3)` : 'none' }}
                    />
                    <img
                        src={PIZZA_BASE_IMAGE}
                        alt="Your pizza"
                        className="pizza-canvas__img"
                    />
                    {selectedToppings.map((topping, i) => {
                        const pos = TOPPING_POSITIONS[i % TOPPING_POSITIONS.length];
                        return (
                            <div
                                key={topping.id}
                                className="topping-overlay"
                                style={{
                                    left: `${pos.x}%`,
                                    top: `${pos.y}%`,
                                    animationDelay: `${i * 0.08}s`,
                                }}
                            >
                                <span className="topping-overlay__emoji">{topping.emoji}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="pizza-actions">
                    <button className="pizza-action-btn" title="Undo">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="1 4 1 10 7 10" />
                            <path d="M3.51 15a9 9 0 1 0 .49-3.96" />
                        </svg>
                    </button>
                    <button className="pizza-action-btn" title="Refresh">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="23 4 23 10 17 10" />
                            <path d="M20.49 15a9 9 0 1 1-.49-3.96" />
                        </svg>
                    </button>
                    <button className="pizza-action-btn pizza-action-btn--love" title="Save to favorites">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ===== RIGHT PANEL ===== */
function RightPanel({ selectedBasePizza, selectedSauce, selectedCheese, selectedToppings, quantity, setQuantity, totalPrice, unitPrice, handleAddToCart, addedToCart, removeSauce, removeCheese, removeTopping }) {
    const hasAdditions = (selectedSauce && selectedSauce.price > 0) || (selectedCheese && selectedCheese.price > 0) || selectedToppings.length > 0;

    return (
        <aside className="panel panel--right">
            <div className="order-summary">
                <div className="order-summary__header">
                    <h2 className="order-summary__title">Order Summary</h2>
                </div>

                {/* Base pizza */}
                <div className="order-item order-item--base">
                    <div className="order-item__icon">🍕</div>
                    <div className="order-item__info">
                        <div className="order-item__name">
                            {selectedBasePizza ? selectedBasePizza.name : 'Custom Pizza'}
                        </div>
                        <div className="order-item__detail">
                            {selectedBasePizza
                                ? selectedBasePizza.description
                                : 'Select a pizza size to start'}
                        </div>
                    </div>
                    {selectedBasePizza && (
                        <span className="order-item__base-price">₹{selectedBasePizza.price}</span>
                    )}
                </div>

                {/* Additions */}
                {hasAdditions && (
                    <div className="order-additions">
                        <div className="order-additions__label">Additions</div>

                        {selectedSauce && selectedSauce.price > 0 && (
                            <div className="addition-row">
                                <span>{selectedSauce.label} sauce</span>
                                <span className="addition-row__right">
                                    <span>+₹{selectedSauce.price}</span>
                                    <button
                                        className="addition-remove"
                                        onClick={removeSauce}
                                        title="Remove sauce"
                                        aria-label="Remove sauce"
                                    >✕</button>
                                </span>
                            </div>
                        )}

                        {selectedCheese && selectedCheese.price > 0 && (
                            <div className="addition-row">
                                <span>{selectedCheese.label}</span>
                                <span className="addition-row__right">
                                    <span>+₹{selectedCheese.price}</span>
                                    <button
                                        className="addition-remove"
                                        onClick={removeCheese}
                                        title="Remove cheese"
                                        aria-label="Remove cheese"
                                    >✕</button>
                                </span>
                            </div>
                        )}

                        {selectedToppings.map((t) => (
                            <div key={t.id} className="addition-row">
                                <span>{t.label}</span>
                                <span className="addition-row__right">
                                    <span>+₹{t.price}</span>
                                    <button
                                        className="addition-remove"
                                        onClick={() => removeTopping(t.id)}
                                        title={`Remove ${t.label}`}
                                        aria-label={`Remove ${t.label}`}
                                    >✕</button>
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Delivery badge */}
                <div className="delivery-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>Est. delivery: 25-35 min</span>
                </div>

                {/* Quantity */}
                <div className="quantity-section">
                    <span className="quantity-label">Quantity</span>
                    <div className="quantity-controls">
                        <button
                            className="qty-btn"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            aria-label="Decrease"
                        >−</button>
                        <span className="qty-value">{quantity}</span>
                        <button
                            className="qty-btn"
                            onClick={() => setQuantity((q) => q + 1)}
                            aria-label="Increase"
                        >+</button>
                    </div>
                </div>

                {/* Total */}
                <div className="order-total">
                    <div className="total-row">
                        <span className="total-label">Total</span>
                        <span className="free-delivery">FREE DELIVERY</span>
                    </div>
                    <div className="total-price">₹{totalPrice}</div>
                </div>

                {/* Add to order CTA */}
                <button
                    className={`add-order-btn ${addedToCart ? 'added' : ''}`}
                    onClick={handleAddToCart}
                    disabled={!selectedBasePizza}
                >
                    {addedToCart ? (
                        <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Added to Order!
                        </>
                    ) : (
                        <>
                            {selectedBasePizza ? 'Add to Order' : 'Select a Pizza First'}
                            {selectedBasePizza && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                </svg>
                            )}
                        </>
                    )}
                </button>

                {/* Trust signals */}
                <div className="trust-row">
                    <span>🔒 Secure checkout</span>
                    <span>🌿 Fresh daily</span>
                </div>
            </div>
        </aside>
    );
}

/* Section wrapper for left panel */
function BuilderSection({ title, icon, children }) {
    return (
        <div className="builder-section">
            <div className="builder-section__header">
                <span className="builder-section__icon">{icon}</span>
                <h3 className="builder-section__title">{title}</h3>
            </div>
            {children}
        </div>
    );
}
