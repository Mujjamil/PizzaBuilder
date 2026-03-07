import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SignatureGrid from './components/SignatureGrid';
import PizzaBuilder from './components/PizzaBuilder';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Hidden admin route: add ?admin=1 to the URL to access admin panel
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === '1') setCurrentPage('admin');
  }, []);

  return (
    <div className="app">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartCount={cartItems.length}
        onCartOpen={() => setCartOpen(true)}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      {currentPage === 'admin' ? (
        <AdminPanel />
      ) : currentPage === 'home' ? (
        <>
          <Hero setCurrentPage={setCurrentPage} />
          <SignatureGrid setCurrentPage={setCurrentPage} />
          <Footer />
        </>
      ) : (
        <>
          <PizzaBuilder cartItems={cartItems} setCartItems={setCartItems} />
          <Footer />
        </>
      )}
    </div>
  );
}
