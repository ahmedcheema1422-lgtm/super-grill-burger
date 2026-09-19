import { useState } from 'react'
import './home.css'
import burgerBg from '../assets/burder2.jpg'

const Home = ({ currentView, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavigate = (nextView) => {
    onNavigate(nextView)
    setMenuOpen(false)
  }

  return (
    <section className="hero">
      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${burgerBg})` }}
        aria-hidden="true"
      />

      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content">
        <p className="hero-kicker">Freshly grilled • Premium taste</p>
        <h1>Super Grill Burger</h1>
        <p className="hero-text">
          Juicy burgers, loaded fries, and bold flavors made for every craving.
        </p>
      </div>

      <nav className="home-nav" aria-label="Main navigation">
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((previous) => !previous)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navbar-links${menuOpen ? ' active' : ''}`}>
        {['home', 'menu', 'services'].map((item) => (
          <button
            key={item}
            type="button"
            className={currentView === item ? 'home-nav-link active' : 'home-nav-link'}
            onClick={() => handleNavigate(item)}
          >
            {item[0].toUpperCase() + item.slice(1)}
          </button>
        ))}
        </div>
      </nav>
    </section>
  )
}

export default Home
