import './home.css'
import burgerBg from '../assets/burder2.jpg'

const Home = () => {
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
    </section>
  )
}

export default Home
