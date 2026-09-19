import { useEffect, useState } from 'react'
import Navbar from './navbar.jsx/navbar.jsx'
import Home from './home/home.jsx'
import Menu from './menu/menu.jsx'
import logoImage from './assets/logo.jpg'

const STORAGE_KEY = 'super-grill-cart'
const VISIT_POPUP_KEY = 'super-grill-visit-popup-closed'
const USERS_KEY = 'super-grill-users'
const SESSION_KEY = 'super-grill-session'

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-grid">
      <div className="footer-brand">
        <div className="footer-logo-wrap">
          <img src={logoImage} alt="Super Grill Burger logo" className="footer-logo" />
        </div>
        <div>
          <h3>Super Grill Burger</h3>
          <p>Freshly grilled comfort food for every craving.</p>
        </div>
      </div>

      <div className="footer-column">
        <h4>Quick Links</h4>
        <ul>
          <li>Home</li>
          <li>Services</li>
          <li>Delivery</li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>Contact</h4>
        <ul>
          <li>+923076630135</li>
          <li>Cream Block, Iqbal Town, Lahore</li>
          <li className="delivery-note">Free home delivery in Lahore</li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>Opening Hours</h4>
        <ul>
          <li>Mon - Thu: 12:00 PM - 12:00 AM</li>
          <li>Fri - Sat: 12:00 PM - 1:00 AM</li>
          <li>Sun: 1:00 PM - 11:00 PM</li>
        </ul>
      </div>
    </div>

    <div className="footer-bottom">
      <span>© 2026 Super Grill Burger</span>
      <span>Fresh • Fast • Flavorful</span>
    </div>
  </footer>
)

const parsePrice = (priceText) => {
  if (!priceText) return 0

  const matches = String(priceText).match(/\d+(?:,\d{3})*(?:\.\d+)?/g)

  if (!matches) return 0

  const numericValue = Number(matches[0].replace(/,/g, ''))
  return Number.isFinite(numericValue) ? numericValue : 0
}

const App = () => {
  const [view, setView] = useState('home')
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY)
      return savedCart ? JSON.parse(savedCart) : []
    } catch {
      return []
    }
  })
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(SESSION_KEY)
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })
  const [authError, setAuthError] = useState('')
  const [authForm, setAuthForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
  })
  const [visitPopupOpen, setVisitPopupOpen] = useState(() => {
    try {
      return !localStorage.getItem(VISIT_POPUP_KEY) && !localStorage.getItem(SESSION_KEY)
    } catch {
      return true
    }
  })
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    location: '',
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    const faviconImage = new Image()
    faviconImage.src = logoImage
    faviconImage.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 64
      canvas.height = 64
      const context = canvas.getContext('2d')

      if (!context) return

      context.beginPath()
      context.arc(32, 32, 32, 0, Math.PI * 2)
      context.clip()
      context.drawImage(faviconImage, 0, 0, 64, 64)

      const favicon = document.querySelector('link[rel="icon"]')
      if (favicon) {
        favicon.type = 'image/png'
        favicon.href = canvas.toDataURL('image/png')
      }
    }
  }, [])

  useEffect(() => {
    if (!visitPopupOpen) {
      try {
        localStorage.setItem(VISIT_POPUP_KEY, 'true')
      } catch {
        // no-op
      }
    }
  }, [visitPopupOpen])

  const handleNavigate = (nextView) => {
    setView(nextView)

    const sectionId = `${nextView}-section`
    const section = document.getElementById(sectionId)

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const addToCart = (item) => {
    const itemPrice = parsePrice(item.price)

    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name)

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1, price: itemPrice }
            : cartItem,
        )
      }

      return [
        ...prevCart,
        {
          id: `${item.name}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          name: item.name,
          price: itemPrice,
          quantity: 1,
        },
      ]
    })

    setCartOpen(true)
  }

  const updateQuantity = (itemId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId))
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    if (cart.length === 0) return

    if (!currentUser) {
      setAuthMode('login')
      setAuthError('Please login before checkout.')
      setAuthOpen(true)
      return
    }

    setCustomer((previous) => ({
      ...previous,
      name: currentUser.name,
      phone: currentUser.phone,
      address: currentUser.address,
    }))
    setCheckoutOpen(true)
  }

  const handleCustomerChange = (field, value) => {
    setCustomer((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePlaceOrder = () => {
    if (!customer.name || !customer.phone || !customer.address || !customer.location) {
      return
    }

    const itemSummary = cart
      .map((item) => `${item.name} x${item.quantity} - Rs. ${item.price * item.quantity}`)
      .join('\n')

    const whatsappMessage = encodeURIComponent(
      `New Order\n\nCustomer: ${customer.name}\nPhone: ${customer.phone}\nAddress: ${customer.address}\nLocation: ${customer.location}\n\nItems:\n${itemSummary}\n\nTotal: Rs. ${cartTotal}`,
    )

    const whatsappUrl = `https://wa.me/923001234567?text=${whatsappMessage}`
    window.open(whatsappUrl, '_blank')

    setCart([])
    setCheckoutOpen(false)
    setCustomer({ name: '', phone: '', address: '', location: '' })
    setCartOpen(false)
  }

  const handleAuthChange = (field, value) => {
    setAuthForm((previous) => ({
      ...previous,
      [field]: value,
    }))
    setAuthError('')
  }

  const handleAuthSubmit = (event) => {
    event.preventDefault()

    const email = authForm.email.trim().toLowerCase()

    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')

      if (authMode === 'signup') {
        if (authForm.password !== authForm.confirmPassword) {
          setAuthError('Passwords do not match.')
          return
        }

        if (users.some((user) => user.email === email)) {
          setAuthError('This email is already registered. Please login.')
          return
        }

        const newUser = {
          name: authForm.name.trim(),
          phone: authForm.phone.trim(),
          email,
          address: authForm.address.trim(),
          password: authForm.password,
        }

        localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]))
        localStorage.setItem(SESSION_KEY, JSON.stringify(newUser))
        setCurrentUser(newUser)
        setCustomer((previous) => ({
          ...previous,
          name: newUser.name,
          phone: newUser.phone,
          address: newUser.address,
        }))
      } else {
        const user = users.find((savedUser) => savedUser.email === email)

        if (!user || user.password !== authForm.password) {
          setAuthError('Email or password is incorrect.')
          return
        }

        localStorage.setItem(SESSION_KEY, JSON.stringify(user))
        setCurrentUser(user)
        setCustomer((previous) => ({
          ...previous,
          name: user.name,
          phone: user.phone,
          address: user.address,
        }))
      }

      setAuthForm({ name: '', phone: '', email: '', address: '', password: '', confirmPassword: '' })
      setAuthError('')
      setVisitPopupOpen(false)
    } catch {
      setAuthError('Unable to save account in this browser.')
      return
    }

    setAuthOpen(false)

    if (cart.length > 0) {
      setCheckoutOpen(true)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY)
    setCurrentUser(null)
  }

  return (
    <>
      <Navbar
        currentView={view}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        onCartToggle={() => setCartOpen((prev) => !prev)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onLoginClick={() => {
          setAuthMode('login')
          setAuthError('')
          setAuthOpen(true)
        }}
      />

      <main>
        <section id="home-section" className="page-section">
          <Home />
        </section>

        <section id="menu-section" className="page-section">
          <Menu onAddToCart={addToCart} />
        </section>

        <section id="services-section" className="page-section services-section">
          <div className="services-box">
            <span className="services-badge">Our Services</span>
            <h2>Fast delivery, fresh meals, and perfect grill taste.</h2>
            <p>
              From family combo deals to quick takeaways, we serve hot, fresh food with
              dependable service every time.
            </p>
          </div>
        </section>

        <section className="location-section" aria-labelledby="location-title">
          <div className="location-header">
            <span className="services-badge">Find Us</span>
            <h2 id="location-title">Visit Super Grill Burger</h2>
            <p>Cream Block, Iqbal Town, Lahore</p>
          </div>

          <div className="location-map-wrap">
            <iframe
              title="Super Grill Burger location in Cream Block, Iqbal Town, Lahore"
              src="https://www.google.com/maps?q=Super+Grill+Burger%2C+Cream+Block%2C+Iqbal+Town%2C+Lahore&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      {visitPopupOpen && (
        <div className="auth-modal-backdrop" onClick={() => setVisitPopupOpen(false)}>
          <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
            <div className="auth-modal-header">
              <h3>Welcome to Super Grill</h3>
              <button type="button" className="auth-close" onClick={() => setVisitPopupOpen(false)}>
                ×
              </button>
            </div>

            <p>Login or create an account to place your order faster and track your food.</p>

            <div className="visit-popup-actions">
              <button type="button" className="primary-btn" onClick={() => {
                setAuthMode('login')
                setAuthError('')
                setAuthOpen(true)
                setVisitPopupOpen(false)
              }}>
                Login
              </button>
              <button type="button" className="secondary-btn" onClick={() => {
                setAuthMode('signup')
                setAuthError('')
                setAuthOpen(true)
                setVisitPopupOpen(false)
              }}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}

      {authOpen && (
        <div className="auth-modal-backdrop" onClick={() => setAuthOpen(false)}>
          <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
            <div className="auth-modal-header">
              <h3>{authMode === 'login' ? 'Login' : 'Sign Up'}</h3>
              <button type="button" className="auth-close" onClick={() => setAuthOpen(false)}>
                ×
              </button>
            </div>

            <form className="auth-form" onSubmit={handleAuthSubmit}>
              {authMode === 'signup' && (
                <>
                  <label>
                    Full Name
                    <input type="text" value={authForm.name} onChange={(event) => handleAuthChange('name', event.target.value)} placeholder="Your name" required />
                  </label>

                  <label>
                    Phone Number
                    <input type="tel" value={authForm.phone} onChange={(event) => handleAuthChange('phone', event.target.value)} placeholder="03xx xxxxxxx" required />
                  </label>

                  <label>
                    Home Address
                    <textarea value={authForm.address} onChange={(event) => handleAuthChange('address', event.target.value)} placeholder="Street, house no, area" required />
                  </label>
                </>
              )}

              <label>
                Email
                <input type="email" value={authForm.email} onChange={(event) => handleAuthChange('email', event.target.value)} placeholder="you@example.com" required />
              </label>

              <label>
                Password
                <input type="password" value={authForm.password} onChange={(event) => handleAuthChange('password', event.target.value)} placeholder="Enter password" minLength="6" required />
              </label>

              {authMode === 'signup' && (
                <label>
                  Confirm Password
                  <input type="password" value={authForm.confirmPassword} onChange={(event) => handleAuthChange('confirmPassword', event.target.value)} placeholder="Write password again" minLength="6" required />
                </label>
              )}

              {authError && <p className="auth-error" role="alert">{authError}</p>}

              <button type="submit" className="primary-btn full-width-btn">
                {authMode === 'login' ? 'Login' : 'Create Account'}
              </button>
            </form>

            <p className="auth-toggle-text">
              {authMode === 'login' ? 'Don’t have an account?' : 'Already have an account?'}{' '}
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'signup' : 'login')
                  setAuthError('')
                }}
              >
                {authMode === 'login' ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      )}

      <div className={`cart-overlay ${cartOpen ? 'open' : ''}`} onClick={() => setCartOpen(false)} />

      <aside className={`cart-panel ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button type="button" className="cart-close" onClick={() => setCartOpen(false)}>
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <span>Add some delicious items from the menu.</span>
          </div>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <span>Rs. {item.price * item.quantity}</span>
                </div>

                <div className="cart-item-controls">
                  <div className="quantity-box">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)}>
                      +
                    </button>
                  </div>

                  <button type="button" className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-summary">
          <div>
            <span>Total</span>
            <strong>Rs. {cartTotal}</strong>
          </div>
          <button type="button" className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </aside>

      {checkoutOpen && (
        <div className="checkout-modal-backdrop" onClick={() => setCheckoutOpen(false)}>
          <div className="checkout-modal" onClick={(event) => event.stopPropagation()}>
            <div className="checkout-header">
              <h3>Checkout</h3>
              <button type="button" className="checkout-close" onClick={() => setCheckoutOpen(false)}>
                ×
              </button>
            </div>

            <div className="checkout-form">
              <label>
                Full Name
                <input
                  type="text"
                  value={customer.name}
                  onChange={(event) => handleCustomerChange('name', event.target.value)}
                  placeholder="Enter your name"
                />
              </label>

              <label>
                Phone Number
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(event) => handleCustomerChange('phone', event.target.value)}
                  placeholder="03xx xxxxxxx"
                />
              </label>

              <label>
                Home Address
                <textarea
                  value={customer.address}
                  onChange={(event) => handleCustomerChange('address', event.target.value)}
                  placeholder="Street, house no, area"
                />
              </label>

              <label>
                Location / Area
                <input
                  type="text"
                  value={customer.location}
                  onChange={(event) => handleCustomerChange('location', event.target.value)}
                  placeholder="City or location"
                />
              </label>
            </div>

            <div className="checkout-footer">
              <span>Total: Rs. {cartTotal}</span>
              <button type="button" className="place-order-btn" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default App
