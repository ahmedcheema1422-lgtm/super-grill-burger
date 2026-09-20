import { useEffect, useState } from 'react'
import Navbar from './navbar.jsx/navbar.jsx'
import Home from './home/home.jsx'
import Menu from './menu/menu.jsx'
import logoImage from './assets/logo.jpg'
import { supabase } from './lib/supabase.js'

const STORAGE_KEY = 'super-grill-cart'

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
          <li>Daily: 3:00 PM - 4:00 AM</li>
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
  const [orderSuccessOpen, setOrderSuccessOpen] = useState(false)
  const [checkoutError, setCheckoutError] = useState('')
  const [currentUser] = useState(null)
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    location: '',
    notes: '',
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

    setCustomer((previous) => ({
      ...previous,
      name: currentUser?.name || previous.name,
      phone: currentUser?.phone || previous.phone,
      address: currentUser?.address || previous.address,
    }))
    setCheckoutOpen(true)
  }

  const handleCustomerChange = (field, value) => {
    setCustomer((prev) => ({
      ...prev,
      [field]: value,
    }))
    setCheckoutError('')
  }

  const handlePlaceOrder = async () => {
    if (!customer.name || !customer.phone || !customer.address || !customer.location) {
      setCheckoutError('Please complete your name, phone, address, and location.')
      return
    }

    const normalizedPhone = customer.phone.replace(/[\s-]/g, '')
    const phonePattern = /^(?:\+92|0)3\d{9}$/

    if (!phonePattern.test(normalizedPhone)) {
      setCheckoutError('Enter a valid Pakistani mobile number, for example 03001234567.')
      return
    }

    const itemSummary = cart
      .map((item) => `${item.name} x${item.quantity} - Rs. ${item.price * item.quantity}`)
      .join('\n')

    if (currentUser?.id) {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: currentUser.id,
          customer_name: customer.name,
          phone: normalizedPhone,
          address: customer.address,
          location: customer.location,
          notes: customer.notes || null,
          total: cartTotal,
        })
        .select('id')
        .single()

      if (orderError) {
        setCheckoutError('Order could not be saved. Please try again.')
        return
      }

      const { error: itemError } = await supabase.from('order_items').insert(
        cart.map((item) => ({
          order_id: order.id,
          item_name: item.name,
          quantity: item.quantity,
          unit_price: item.price,
        })),
      )

      if (itemError) {
        setCheckoutError('Order items could not be saved. Please try again.')
        return
      }
    }

    const whatsappMessage = encodeURIComponent(
      `New Order\n\nCustomer: ${customer.name}\nPhone: ${customer.phone}\nAddress: ${customer.address}\nLocation: ${customer.location}\nNotes: ${customer.notes || 'None'}\n\nItems:\n${itemSummary}\n\nTotal: Rs. ${cartTotal}`,
    )

    const whatsappUrl = `https://wa.me/923076630135?text=${whatsappMessage}`
    window.open(whatsappUrl, '_blank')

    setCart([])
    setCheckoutOpen(false)
    setCustomer({ name: '', phone: '', address: '', location: '', notes: '' })
    setCartOpen(false)
    setCheckoutError('')
    setOrderSuccessOpen(true)
  }

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onCartToggle={() => setCartOpen((prev) => !prev)}
      />

      <main>
        <section id="home-section" className="page-section">
          <Home currentView={view} onNavigate={handleNavigate} />
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
                  pattern="(?:\+92|0)3[0-9]{9}"
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

              <label>
                Order Notes
                <textarea
                  value={customer.notes}
                  onChange={(event) => handleCustomerChange('notes', event.target.value)}
                  placeholder="Extra spicy, no mayo, etc."
                />
              </label>
            </div>

            {checkoutError && <p className="checkout-error" role="alert">{checkoutError}</p>}

            <div className="checkout-footer">
              <span>Total: Rs. {cartTotal}</span>
              <button type="button" className="place-order-btn" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      {orderSuccessOpen && (
        <div className="success-modal-backdrop" onClick={() => setOrderSuccessOpen(false)}>
          <div className="success-modal" onClick={(event) => event.stopPropagation()}>
            <div className="success-icon" aria-hidden="true">✓</div>
            <h3>Thank you!</h3>
            <p>Your order has been sent. We will contact you shortly to confirm it.</p>
            <button type="button" className="primary-btn full-width-btn" onClick={() => setOrderSuccessOpen(false)}>
              Done
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

export default App
