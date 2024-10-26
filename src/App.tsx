import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ComparisonPage from './pages/ComparisonPage';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-theme text-theme flex flex-col theme-transition">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/compare" element={<ComparisonPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;