import { db } from '../firebase';
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    orderBy,
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
