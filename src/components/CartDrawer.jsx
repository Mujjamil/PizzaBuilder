import { useState } from 'react';
import PlaceOrderModal from './PlaceOrderModal';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose, cartItems, setCartItems }) {
    const [showModal, setShowModal] = useState(false);

    const total = cartItems.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);

    const removeItem = (index) => {
        setCartItems((prev) => prev.filter((_, i) => i !== index));
    };

    const handleOrderSuccess = () => {
        setShowModal(false);
        setCartItems([]);
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            {isOpen && <div className="cart-backdrop" onClick={onClose} />}

            {/* Drawer */}
            <div className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}>
                <div className="cart-drawer__header">
                    <h2 className="cart-drawer__title">Your Order</h2>
                    <button className="cart-drawer__close" onClick={onClose} aria-label="Close cart">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="cart-drawer__body">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <span className="cart-empty__icon">🍕</span>
                            <p>Your cart is empty</p>
                            <span>Add a pizza from the builder to get started!</span>
                        </div>
                    ) : (
                        <div className="cart-items">
                            {cartItems.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <div className="cart-item__icon">🍕</div>
                                    <div className="cart-item__info">
                                        <div className="cart-item__name">{item.pizzaName}</div>
                                        {item.additions.length > 0 && (
                                            <div className="cart-item__additions">
                                                {item.additions.join(' • ')}
                                            </div>
                                        )}
                                        <div className="cart-item__meta">
                                            Qty: {item.quantity} &nbsp;·&nbsp; ₹{item.totalPrice * item.quantity}
                                        </div>
                                    </div>
                                    <button
                                        className="cart-item__remove"
                                        onClick={() => removeItem(index)}
                                        aria-label="Remove item"
                                    >✕</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-drawer__footer">
                        <div className="cart-total">
                            <span>Total</span>
                            <span className="cart-total__price">₹{total}</span>
                        </div>
                        <button
                            className="cart-place-order-btn"
                            onClick={() => setShowModal(true)}
                        >
                            Place Order
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            {showModal && (
                <PlaceOrderModal
                    cartItems={cartItems}
                    total={total}
                    onClose={() => setShowModal(false)}
                    onSuccess={handleOrderSuccess}
                />
            )}
        </>
    );
}
