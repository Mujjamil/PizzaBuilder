import { useState } from 'react';
import { saveOrder } from '../utils/ordersDB';
import './PlaceOrderModal.css';

export default function PlaceOrderModal({ cartItems, total, onClose, onSuccess }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [confirmed, setConfirmed] = useState(null); // holds { orderNumber }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return setError('Please enter your name.');
        if (!phone.trim() || phone.length < 10) return setError('Please enter a valid phone number.');

        setLoading(true);
        setError('');

        try {
            const orderNumber = await saveOrder({
                customerName: name.trim(),
                customerPhone: phone.trim(),
                items: cartItems.map((item) => ({
                    pizzaName: item.pizzaName,
                    additions: item.additions,
                    quantity: item.quantity,
                    totalPrice: item.totalPrice,
                })),
                total,
            });
            setConfirmed({
                orderNumber,
                customerName: name.trim(),
                customerPhone: phone.trim(),
                items: cartItems.map((item) => ({
                    pizzaName: item.pizzaName,
                    additions: item.additions,
                    quantity: item.quantity,
                    totalPrice: item.totalPrice,
                })),
            });
        } catch (err) {
            console.error(err);
            setError('Failed to place order. Please check your Firebase config and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>

                {confirmed ? (
                    /* ===== SUCCESS STATE ===== */
                    <div className="modal__success">
                        <div className="modal__success-icon">✅</div>
                        <h2>Order Placed!</h2>
                        <p className="modal__success-sub">Thank you, <strong>{name}</strong>! We'll start preparing your pizza right away.</p>
                        <div className="modal__order-number">
                            <span>Order Number</span>
                            <strong>{confirmed.orderNumber}</strong>
                        </div>
                        <p className="modal__success-note">🕐 Est. delivery: 25–35 min</p>
                        <button className="modal__done-btn" onClick={onSuccess}>Done</button>
                    </div>
                ) : (
                    /* ===== FORM STATE ===== */
                    <>
                        <div className="modal__header">
                            <h2 className="modal__title">Place Your Order</h2>
                            <button className="modal__close" onClick={onClose} aria-label="Close">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        <div className="modal__summary">
                            <span>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</span>
                            <span className="modal__summary-total">₹{total}</span>
                        </div>

                        <form className="modal__form" onSubmit={handleSubmit}>
                            <div className="modal__field">
                                <label>Your Name *</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Rahul Sharma"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div className="modal__field">
                                <label>Phone Number *</label>
                                <input
                                    type="tel"
                                    placeholder="e.g. 9876543210"
                                    value={phone}
                                    maxLength={10}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                />
                            </div>

                            {error && <div className="modal__error">{error}</div>}

                            <button
                                type="submit"
                                className={`modal__submit-btn ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="modal__spinner" />
                                ) : (
                                    <>Confirm Order · ₹{total}</>
                                )}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
