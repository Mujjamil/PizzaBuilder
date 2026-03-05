import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SignatureGrid from './components/SignatureGrid';
import PizzaBuilder from './components/PizzaBuilder';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="app">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} cartCount={cartCount} />

      {currentPage === 'home' ? (
        <>
          <Hero setCurrentPage={setCurrentPage} />
          <SignatureGrid setCurrentPage={setCurrentPage} />
          <Footer />
        </>
      ) : (
        <>
          <PizzaBuilder setCartCount={setCartCount} />
          <Footer />
        </>
      )}
    </div>
  );
}
