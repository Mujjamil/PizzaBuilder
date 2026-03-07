import { db } from '../firebase';
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    orderBy,
    onSnapshot,
    serverTimestamp,
} from 'firebase/firestore';

const ORDERS_COLLECTION = 'orders';

// Generate today's date key: YYYYMMDD
function getTodayKey() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
}

// Generate order number: FC-YYYYMMDD-NNN (sequential per day)
export async function generateOrderNumber() {
    const todayKey = getTodayKey();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    try {
        const q = query(
            collection(db, ORDERS_COLLECTION),
            where('createdAt', '>=', startOfDay)
        );
        const snapshot = await getDocs(q);
        const count = snapshot.size + 1;
        return `FC-${todayKey}-${String(count).padStart(3, '0')}`;
    } catch {
        // Fallback if Firebase is not configured yet
        const rand = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
        return `FC-${todayKey}-${rand}`;
    }
}

// Save a new order to Firestore
export async function saveOrder(orderData) {
    const orderNumber = await generateOrderNumber();
    const order = {
        ...orderData,
        orderNumber,
        createdAt: serverTimestamp(),
        status: 'received',
    };

    await addDoc(collection(db, ORDERS_COLLECTION), order);
    return orderNumber;
}

// Fetch all orders (for admin use)
export async function getOrders() {
    const q = query(
        collection(db, ORDERS_COLLECTION),
        orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// Real-time listener — calls onAdded(order) whenever a NEW order arrives
export function subscribeToOrders(onAdded, onListUpdate) {
    const q = query(
        collection(db, ORDERS_COLLECTION),
        orderBy('createdAt', 'desc')
    );

    let initialized = false;
    const unsub = onSnapshot(q, (snapshot) => {
        const all = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        if (onListUpdate) onListUpdate(all);

        if (!initialized) {
            initialized = true;
            return; // skip notifications on first load (existing orders)
        }

        // Fire onAdded for each genuinely new document added since we started listening
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
                const order = { id: change.doc.id, ...change.doc.data() };
                if (onAdded) onAdded(order);
            }
        });
    });

    return unsub; // call to stop listening
}
