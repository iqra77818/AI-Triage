import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './pages/Home';
import Features from './pages/Features';
import Workflow from './pages/Workflow'; 
import Form from './pages/Form';
import './index.css';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="font-sans text-slate-800 min-h-screen scroll-smooth">
      <Navbar isScrolled={isScrolled} />
      <main className="px-8">
        <section id="home">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="workflow">
          <Workflow />
        </section>
        <section id="form">
          <Form />
        </section>
      </main>
      <footer className="bg-sky-300 py-5 mt-12 text-center">
  <p className="italic text-xl sm:text-2xl max-w-xl mx-auto px-4 sm:px-0 text-slate-500">
    Developed with 💙 by team Runtime Rebels
  </p>
</footer>

    </div>
  );
}

export default App;




