import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import AllTreks from './pages/AllTreks';
import TrekDetails from './pages/TrekDetails';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import { UserPreferencesProvider } from './context/UserPreferencesContext';
import { ToastProvider } from './context/ToastContext';
import ScrollToTop from './components/ScrollToTop';

import './styles/globals.css';

const App: React.FC = () => {
  return (
    <UserPreferencesProvider>
      <ToastProvider>
        <Router>
          <ScrollToTop />
          <div className="app-container">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all-treks" element={<AllTreks />} />
            <Route path="/trek/:slug" element={<TrekDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

          <Footer />
        </div>
      </Router>
      </ToastProvider>
    </UserPreferencesProvider>
  );
};

export default App;
