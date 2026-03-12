import { useState, useEffect, useRef } from 'react';
import { subscribeToOrders } from '../utils/ordersDB';
import { printReceipt } from '../utils/printReceipt';
import './AdminPanel.css';

const ADMIN_PASSWORD = 'FirstCup@2026';

export default function AdminPanel() {
    const [authed, setAuthed] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [notifPermission, setNotifPermission] = useState(Notification.permission);
    const [newOrderFlash, setNewOrderFlash] = useState(null);
    const audioCtxRef = useRef(null);

    // Play a beep using Web Audio API (works without audio files)
    const playBeep = () => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 880;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.4, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.5);
        } catch { }
    };

    // Request notification permission
    const requestNotifPermission = async () => {
        const result = await Notification.requestPermission();
        setNotifPermission(result);
    };

    // Show browser notification for a new order
    const showNotification = (order) => {
        playBeep();
        setNewOrderFlash(order);
        setTimeout(() => setNewOrderFlash(null), 5000);
        if (Notification.permission === 'granted') {
            new Notification('🍕 New Order Received!', {
                body: `${order.customerName} — ${order.orderNumber} — ₹${order.total}`,
                icon: '/fc.svg',
                tag: order.orderNumber,
                requireInteraction: true,
            });
        }
    };

    useEffect(() => {
        if (!authed) return;
        setLoading(true);
        const unsub = subscribeToOrders(
            showNotification,           // called on every NEW order
            (all) => {                  // called with updated full list
                setOrders(all);
                setLoading(false);
            }
        );
        return () => unsub(); // cleanup on unmount
    }, [authed]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (passwordInput === ADMIN_PASSWORD) {
            setAuthed(true);
            requestNotifPermission();
        } else {
            setPasswordError('Incorrect password.');
            setPasswordInput('');
        }
    };

    const filtered = orders.filter((o) =>
        o.customerName?.toLowerCase().includes(search.toLowerCase()) ||
        o.customerPhone?.includes(search) ||
        o.orderNumber?.toLowerCase().includes(search.toLowerCase())
    );

    if (!authed) {
        return (
            <div className="admin-login">
                <div className="admin-login__box">
                    <div className="admin-login__logo">🍕</div>
                    <h1>Admin Panel</h1>
                    <p>FirstCup Order Management</p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="Enter admin password"
                            value={passwordInput}
                            onChange={(e) => { setPasswordInput(e.target.value); setPasswordError(''); }}
                            autoFocus
                        />
                        {passwordError && <div className="admin-login__error">{passwordError}</div>}
                        <button type="submit">Access Dashboard →</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-panel">
            {/* Header */}
            <div className="admin-header">
                <div className="admin-header__left">
                    <h1>Order Dashboard</h1>
                </div>
                <div className="admin-header__right">
                    {notifPermission !== 'granted' && (
                        <button className="admin-notif-btn" onClick={requestNotifPermission}>
                            🔔 Enable Notifications
                        </button>
                    )}
                    {notifPermission === 'granted' && (
                        <span className="admin-notif-on">🔔 Notifications On</span>
                    )}
                    <span className="admin-badge">
                        <span className="admin-badge__dot" />
                        {orders.length} orders today
                    </span>
                    <button className="admin-refresh" onClick={() => {
                        setLoading(true);
                        subscribeToOrders(null, (all) => { setOrders(all); setLoading(false); });
                    }}>
                        ↻ Refresh
                    </button>
                </div>
            </div>

            {/* New Order Flash Banner */}
            {newOrderFlash && (
                <div className="admin-new-order-banner">
                    🍕 New order from <strong>{newOrderFlash.customerName}</strong> — {newOrderFlash.orderNumber} — <strong>₹{newOrderFlash.total}</strong>
                </div>
            )}

            {/* Search */}
            <div className="admin-search-bar">
                <input
                    type="text"
                    placeholder="Search by name, phone or order number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Content */}
            {loading ? (
                <div className="admin-loading">
                    <div className="admin-spinner" />
                    <p>Loading orders...</p>
                </div>
            ) : error ? (
                <div className="admin-error">{error}</div>
            ) : filtered.length === 0 ? (
                <div className="admin-empty">
                    <span>📋</span>
                    <p>{search ? 'No orders match your search.' : 'No orders yet. Waiting for first order!'}</p>
                </div>
            ) : (
                <div className="admin-orders">
                    {filtered.map((order) => (
                        <div
                            key={order.id}
                            className={`admin-order-card ${expandedOrder === order.id ? 'expanded' : ''}`}
                        >
                            {/* Order Header Row */}
                            <div
                                className="admin-order-card__header"
                                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                            >
                                <div className="admin-order-card__number">
                                    <span className="label">Order</span>
                                    <strong>{order.orderNumber}</strong>
                                </div>
                                <div className="admin-order-card__customer">
                                    <span className="label">Customer</span>
                                    <strong>{order.customerName}</strong>
                                </div>
                                <div className="admin-order-card__phone">
                                    <span className="label">Phone</span>
                                    <strong>{order.customerPhone}</strong>
                                </div>
                                <div className="admin-order-card__bill">
                                    <span className="label">Bill</span>
                                    <strong className="gold">₹{order.total}</strong>
                                </div>
                                <div className="admin-order-card__time">
                                    <span className="label">Time</span>
                                    <strong>
                                        {order.createdAt?.toDate
                                            ? order.createdAt.toDate().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                                            : '—'}
                                    </strong>
                                </div>
                                <div className="admin-order-card__toggle">
                                    {expandedOrder === order.id ? '▲' : '▼'}
                                </div>
                            </div>

                            {/* Expanded: Receipt Bill */}
                            {expandedOrder === order.id && (
                                <div className="admin-bill">
                                    {/* Bill Header */}
                                    <div className="admin-bill__top">
                                        <div className="admin-bill__info">
                                            <div><span>Customer</span><strong>{order.customerName}</strong></div>
                                            <div><span>Phone</span><strong>{order.customerPhone}</strong></div>
                                            <div><span>Order #</span><strong>{order.orderNumber}</strong></div>
                                            <div><span>Date</span><strong>
                                                {order.createdAt?.toDate
                                                    ? order.createdAt.toDate().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                                                    : '—'}
                                            </strong></div>
                                        </div>
                                    </div>

                                    {/* Items */}
                                    <div className="admin-bill__items-header">
                                        <span>Item</span>
                                        <span>Qty</span>
                                        <span>Price</span>
                                        <span>Amount</span>
                                    </div>

                                    {order.items?.map((item, i) => (
                                        <div key={i} className="admin-bill__item">
                                            <div className="admin-bill__item-name">
                                                <strong>🍕 {item.pizzaName}</strong>
                                                {item.additions?.length > 0 && (
                                                    <ul className="admin-bill__additions">
                                                        {item.additions.map((add, j) => (
                                                            <li key={j}>+ {add}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                            <span className="admin-bill__qty">× {item.quantity}</span>
                                            <span className="admin-bill__unit">₹{item.totalPrice}</span>
                                            <span className="admin-bill__subtotal gold">₹{item.totalPrice * item.quantity}</span>
                                        </div>
                                    ))}

                                    {/* Grand Total */}
                                    <div className="admin-bill__total">
                                        <span>Grand Total</span>
                                        <strong className="gold">₹{order.total}</strong>
                                    </div>

                                    {/* Print Button */}
                                    <button
                                        className="admin-bill__print-btn"
                                        onClick={() => printReceipt({
                                            orderNumber: order.orderNumber,
                                            customerName: order.customerName,
                                            customerPhone: order.customerPhone,
                                            items: order.items,
                                            total: order.total,
                                        })}
                                    >
                                        🖨️ Print Receipt
                                    </button>
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
