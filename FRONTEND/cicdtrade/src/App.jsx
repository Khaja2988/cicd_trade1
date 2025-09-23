import './App.css'
import { useState } from 'react'
import Header from './components/Header.jsx'
import StocksOverview from './components/StocksOverview.jsx'
import AuthModal from './components/AuthModal.jsx'
import Portfolio from './components/Portfolio.jsx'

function App() {
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [user, setUser] = useState(null)

  function openLogin() { setAuthMode('login'); setAuthOpen(true) }
  function openRegister() { setAuthMode('register'); setAuthOpen(true) }
  function closeAuth() { setAuthOpen(false) }
  function handleAuth(u) { setUser(u); setAuthOpen(false) }
  function handleLogout() { setUser(null) }

  return (
    <>
      <Header user={user} onLoginClick={openLogin} onLogout={handleLogout} />

      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">Virtual Stock Trading App</h1>
          <p className="hero-subtitle">
            Simulate trading in the stock market with zero financial risk. Build your virtual
            portfolio, join competitions, and learn with real-time data and tutorials.
          </p>
          <div className="hero-actions">
            <button className="btn primary" onClick={openRegister}>Get Started</button>
            <button className="btn-link" onClick={openLogin}>Login →</button>
          </div>
        </div>
      </section>

      <StocksOverview />

      <Portfolio />

      <AuthModal open={authOpen} mode={authMode} onClose={closeAuth} onAuth={handleAuth} />
    </>
  )
}

export default App
