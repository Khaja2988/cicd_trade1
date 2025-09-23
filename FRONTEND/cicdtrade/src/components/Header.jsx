function Header({ user, onLoginClick, onLogout }) {
  return (
    <nav className="nav">
      <div className="nav-content">
        <div className="nav-left">
          <img src="/vite.svg" alt="Logo" className="nav-logo" />
          <span className="nav-title">Virtual Stock Trading App</span>
        </div>
        <ul className="nav-links">
          <li className="active"><a href="#home">🏠 <span>Home</span></a></li>
          <li><a href="#portfolio">🕒 <span>Portfolio</span></a></li>
          <li>📈 <span>Market</span></li>
          <li>📄 <span>Tutorials</span></li>
          <li>🏆 <span>Competitions</span></li>
          <li>📣 <span>News</span></li>
        </ul>
        {user ? (
          <div className="nav-user">
            <img src="/vite.svg" alt="User" className="nav-avatar" />
            <span className="nav-username">{user.name}</span>
            <button className="btn small" onClick={onLogout}>Logout</button>
          </div>
        ) : (
          <div className="nav-user">
            <button className="btn primary" onClick={onLoginClick}>Login</button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Header


