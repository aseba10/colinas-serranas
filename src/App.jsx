import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import CabanaPremiumPage from './pages/CabanaPremiumPage.jsx';
import CabanaDuplexPage from './pages/CabanaDuplexPage.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/cabana_premium_tandil"
          element={<CabanaPremiumPage />}
        />

        <Route
          path="/cabana_duplex_tandil"
          element={<CabanaDuplexPage />}
        />

        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <h1>Página no encontrada</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;