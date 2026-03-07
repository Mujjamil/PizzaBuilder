import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SignatureGrid from './components/SignatureGrid';
import PizzaBuilder from './components/PizzaBuilder';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

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

      {currentPage === 'home' ? (
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
