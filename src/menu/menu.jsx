import logoImage from '../assets/logo.jpg'
import './menu.css'

import beefKingImage from '../assets/beef king.jpg'
import superDuperImage from '../assets/superduper.jpg'
import jalapenoChickenImage from '../assets/Spicy Jalapeno Chicken Burger.jpg'
import malaiBurgerImage from '../assets/Malai Super Grill Burger.jpg'
import classicZingerImage from '../assets/Classic Zinger Burger.jpg'
import loadedFriesImage from '../assets/loaded freies.jpg'
import mayoFriesImage from '../assets/mayo.png'

const Menu = ({ onAddToCart }) => {
  const categories = [
    {
      title: '🍔 Grilled & Special Burgers',
      items: [
        {
          badge: 'Beef',
          name: 'Super King Beef Burger',
          desc: 'Charcoal-grilled juicy beef patty with signature cheese sauce.',
          price: 'Rs. 513',
          image: beefKingImage,
        },
        {
          badge: 'Beef',
          name: 'Super Creamy Beef Burger',
          desc: 'Charcoal grilled beef patty loaded with heavy creamy dressing.',
          price: 'Rs. 522',
          image: superDuperImage,
        },
        {
          badge: 'Chicken',
          name: 'Spicy Jalapeno Chicken Burger',
          desc: 'Grilled chicken fillet with hot jalapeno slice & spicy dip.',
          price: 'Rs. 539',
          image: jalapenoChickenImage,
        },
        {
          badge: 'Special',
          name: 'Malai Super Grill Burger',
          desc: 'Rich malai marination grilled chicken fillet with garlic mayo.',
          price: 'Rs. 1,500',
          image: malaiBurgerImage,
        },
        {
          badge: 'Crispy',
          name: 'Classic Zinger Burger',
          desc: 'Crispy fried chicken thigh topped with fresh lettuce and mayo.',
          price: 'Rs. 380',
          image: classicZingerImage,
        },
      ],
    },
    {
      title: '🍟 Loaded Fries & Appetizers',
      items: [
        {
          badge: 'Fries',
          name: 'Special Pizza Loaded Fries',
          desc: 'Crispy fries baked with pizza sauce, melted cheese & olives.',
          price: 'S: 330 | M: 390 | L: 420',
          image: loadedFriesImage,
        },
        {
          badge: 'Fries',
          name: 'Mayo Garlic Fries',
          desc: 'Crispy potato fries generously topped with garlic mayo dip.',
          price: 'Rs. 220',
          image: mayoFriesImage,
        },
      ],
    },
    {
      title: '🍕 Pizzas & Wraps',
      items: [
        {
          badge: 'Wrap',
          name: 'Cheese Shawarma Wrap',
          desc: 'Grilled chicken shawarma wrapped with double cheese slice.',
          price: 'Rs. 280',
        },
        {
          badge: 'Pizza',
          name: 'Chicken Pizza',
          desc: 'Freshly baked pizza dough topped with tikka chunks & mozzarella.',
          price: 'Rs. 750',
        },
      ],
    },
    {
      title: '🥤 Combo Deals & Drinks',
      items: [
        {
          badge: 'Deal',
          name: 'Super Saver Mega Combo',
          desc: '1 Pizza + 1 Loaded Fries + 1 Zinger Burger + 1 Mayo Fries + 500ml Drink.',
          price: 'Rs. 1,850',
        },
        {
          badge: 'Sides',
          name: 'Cold Drink & Raita',
          desc: 'Chilled beverage (500ml / 1.5L) and fresh mint raita.',
          price: 'Rs. 80 - 150',
        },
      ],
    },
  ]

  return (
    <div className="menu-page">
      <div className="menu-logo-backdrop">
        <img src={logoImage} alt="Super Grill Burger background logo" className="menu-logo-image" />
      </div>

      <div className="menu-header">
        <h1 className="menu-title">Super Grill Burger</h1>
        <p className="menu-subtitle">Complete Menu Cards (A to Z)</p>
      </div>

      {categories.map((category) => (
        <div key={category.title}>
          <h2 className="menu-category-title">{category.title}</h2>
          <div className="menu-grid">
            {category.items.map((item, index) => {
              const isBurgerSection = category.title === '🍔 Grilled & Special Burgers'
              const shouldHover = isBurgerSection || item.name === 'Classic Zinger Burger' || index < 4

              const className = item.image
                ? `menu-card menu-card--featured${shouldHover ? ' menu-card--hoverable' : ''}`
                : shouldHover
                  ? 'menu-card menu-card--hoverable'
                  : 'menu-card'

              return (
                <div
                  key={item.name}
                  className={className}
                >
                {item.image && (
                  <div className="menu-image-wrap">
                    <img src={item.image} alt={item.name} className="menu-card-image" />
                  </div>
                )}

                <div>
                  <span className="menu-badge">{item.badge}</span>
                  <h3 className="menu-item-name">{item.name}</h3>
                  <div className="menu-item-desc-wrap">
                    <p className="menu-item-desc">{item.desc}</p>
                  </div>
                </div>

                  <div className="menu-card-footer">
                    <span className="menu-price">{item.price}</span>
                    <button type="button" className="menu-order-btn" onClick={() => onAddToCart(item)}>
                      Order Now
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Menu
