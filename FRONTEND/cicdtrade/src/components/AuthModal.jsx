import { useState } from 'react'

function AuthModal({ open, mode = 'login', onClose, onAuth }) {
  const [activeTab, setActiveTab] = useState(mode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  if (!open) return null

  function handleSubmit(e) {
    e.preventDefault()
    if (activeTab === 'register' && !name) return
    const user = {
      id: Math.random().toString(36).slice(2, 9),
      name: activeTab === 'register' ? name : email.split('@')[0] || 'Trader',
      email,
    }
    onAuth(user)
    setEmail(''); setPassword(''); setName('')
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className={activeTab === 'login' ? 'tab active' : 'tab'} onClick={() => setActiveTab('login')}>Login</button>
          <button className={activeTab === 'register' ? 'tab active' : 'tab'} onClick={() => setActiveTab('register')}>Register</button>
          <button className="icon-btn" aria-label="Close" onClick={onClose}>✕</button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          {activeTab === 'register' && (
            <div className="form-row">
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
            </div>
          )}
          <div className="form-row">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button className="btn primary" type="submit">{activeTab === 'login' ? 'Login' : 'Create account'}</button>
        </form>
      </div>
    </div>
  )
}

export default AuthModal


