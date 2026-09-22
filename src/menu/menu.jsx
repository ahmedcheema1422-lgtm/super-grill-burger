import { Fragment, useState } from 'react'
import logoImage from '../assets/logo.jpg'
import chickenBurgerBackground from '../assets/11.jpg'
import beefBurgerBackground from '../assets/12.jpg'
import loadedFriesBackground from '../assets/13.jpg'
import pizzaBackground from '../assets/14.jpg'
import newPizzaBackground from '../assets/15.jpg'
import sandwichBackground from '../assets/16.jpg'
import steakBackground from '../assets/17.jpg'
import shawarmaBackground from '../assets/18.jpg'
import rollWrapBackground from '../assets/19.jpg'
import pizzaDealsBackground from '../assets/20.jpg'
import burgerDealsBackground from '../assets/21.jpg'
import moreDealsBackground from '../assets/22.jpg'
import barbecueBackground from '../assets/23.jpg'
import sidesBackground from '../assets/24.jpg'
import './menu.css'

const menuItems = [
  { name: 'Super Whopper Chicken Burger', single: '499', double: '590', triple: '650' },
  { name: 'Super Giggi Burger', single: '499', double: '580', triple: '650' },
  { name: 'Super Creamy Chicken Burger', single: '499', double: '599', triple: '650' },
  { name: 'Spicy Jalapeno Chicken Burger', single: '499', double: '599', triple: '650' },
  { name: 'Super Cocktail Burger', single: '499', double: '590', triple: '650' },
  { name: 'SUPER DUPER', single: '—', double: '—', triple: '699' },
  { name: 'Crispy Fish Burger', single: '—', double: '—', triple: '699' },
]

const beefZingerItems = [
  { name: 'Super King Beef Burger', single: '520', double: '630', triple: '770' },
  { name: 'Super Creamy Beef Burger', single: '520', double: '630', triple: '770' },
  { name: 'Super Jalapeno Beef Burger', single: '520', double: '630', triple: '770' },
  { name: 'Classic Beef Burger', single: '520', double: '—', triple: '—' },
  { name: 'Zinger Burger', single: '399', double: '—', triple: '—' },
  { name: 'Biggs Tower Zinger Burger', single: '499', double: '—', triple: '—' },
]

const loadedFriesItems = [
  { name: 'Large Loaded Fries', small: '—', medium: '—', large: '750', price: '750' },
  { name: 'Medium Loaded Fries', small: '—', medium: '699', large: '—', price: '699' },
  { name: 'Small Loaded Fries', small: '650', medium: '—', large: '—', price: '650' },
  { name: 'Super Special Loaded Fries', small: '699', medium: '—', large: '—', price: '699' },
  { name: 'Super B.B.Q Loaded Fries', small: '699', medium: '—', large: '—', price: '699' },
  { name: 'Extra Super Small Loaded Fries', small: '550', medium: '—', large: '—', price: '550' },
  { name: '(P) F 1 Small', small: '599', medium: '—', large: '—', price: '599' },
  { name: '(P) F 2 Medium', small: '—', medium: '699', large: '—', price: '699' },
  { name: '(P) F 3 Large', small: '—', medium: '—', large: '799', price: '799' },
]

const pizzaItems = [
  { name: 'Super Special Pizza', small: '550', medium: '950', large: '1650', price: '1650' },
  { name: 'Lazanla Pizza', small: '599', medium: '999', large: '1599', price: '1599' },
  { name: 'Faimly Pizza', small: '—', medium: '—', large: '1999', price: '1999' },
  { name: 'Special Achari Pizza', small: '499', medium: '850', large: '1399', price: '1399' },
  { name: 'Chicken Tikka Pizza', small: '499', medium: '850', large: '1350', price: '1350' },
  { name: 'Chicken Supreme Pizza', small: '499', medium: '850', large: '1350', price: '1350' },
  { name: 'Chicken Fajita Pizza', small: '499', medium: '850', large: '1350', price: '1350' },
  { name: 'Cheese Lovers Pizza', small: '450', medium: '799', large: '1299', price: '1299' },
  { name: 'Kabab Crust Pizza', small: '550', medium: '950', large: '1550', price: '1550' },
  { name: 'Malai Boti Pizza', small: '499', medium: '899', large: '1399', price: '1399' },
  { name: 'Cheeze Pizza Stick', small: '—', medium: '950', large: '—', price: '950' },
  { name: 'Crown Crust Pizza', small: '—', medium: '1150', large: '1550', price: '1550' },
  { name: 'Malai Doner', small: '—', medium: '950', large: '1499', price: '1499' },
  { name: 'Hot & Spicy Pizza', small: '450', medium: '799', large: '1299', price: '1299' },
  { name: 'Extra Topping', small: '199', medium: '250', large: '300', price: '300' },
]

const newPizzaItems = [
  { name: 'Special Loaded Pizza', small: '—', medium: '—', large: '1599', price: '1599' },
  { name: 'Chatka Pizza', small: '—', medium: '—', large: '1599', price: '1599' },
]

const sandwichItems = [
  { name: 'Cheese Addict Sandwich', price: '630' },
  { name: 'Fillet Steak Sandwich', price: '630' },
  { name: 'Cocktail Sandwich', price: '630' },
  { name: 'Super Sandwich', price: '530' },
  { name: 'B.B.Q Sandwich', price: '630' },
  { name: 'Tikka Sandwich', price: '630' },
  { name: 'Kabab Sandwich', price: '580' },
  { name: 'Club Sandwich', price: '530' },
]

const steakItems = [
  { name: 'Grill Smoke Steaks', price: '799' },
  { name: 'Cheese Grill Smoke Steaks', price: '850' },
  { name: 'Grill Steaks 1 Piece', price: '399' },
  { name: 'Zinger 1 Piece', price: '300' },
]

const shawarmaItems = [
  { name: 'Chicken Shawarma', small: '—', medium: '250', large: '—', price: '250' },
  { name: 'Grill Shawarma', small: '—', medium: '350', large: '—', price: '350' },
  { name: 'Grill Shawarma Platter', small: '—', medium: '650', large: '—', price: '650' },
  { name: 'Zinger Shawarma', small: '—', medium: '350', large: '—', price: '350' },
  { name: 'Zinger Shawarma Platter', small: '—', medium: '650', large: '—', price: '650' },
  { name: 'B.B.Q Shawarma', small: '—', medium: '399', large: '—', price: '399' },
  { name: 'Kabab Shawarma', small: '—', medium: '399', large: '—', price: '399' },
  { name: 'Plain Fries', small: '199', medium: '250', large: '299', price: '299' },
  { name: 'Masala Fries With Garlic Mayo', small: '199', medium: '250', large: '299', price: '299' },
]

const rollWrapItems = [
  { name: 'Cheeze Pizza Paratha', price: '599' },
  { name: 'Super Shapata Roll', price: '599' },
  { name: 'Super Dhamaka Roll', price: '599' },
  { name: 'Beef Cheese Paratha Roll', price: '599' },
  { name: 'Chicken Cheese Paratha Roll', price: '599' },
  { name: 'Chicken Cheesy Wrap', price: '699' },
  { name: 'Beef Cheesy Wrap', price: '699' },
  { name: 'Zinger Crispy Wrap', price: '650' },
  { name: 'B.B.Q Cheesy Wrap', price: '699' },
]

const pizzaDeals = [
  {
    badge: 'Deal # 1',
    items: ['1 Medium Pizza', '1 Large Pizza', '500ml Drink'],
    price: 'Rs: 2100',
  },
  {
    badge: 'Deal # 2',
    items: ['1 Small Pizza', '1 Medium Pizza', '1 Large Pizza', '1.5 Liter Drink'],
    price: 'Rs: 2499',
  },
  {
    badge: 'Super Deal',
    super: true,
    items: [
      ['2 Large Pizza', 'Rs: 2799'],
      ['3 Small Pizza', 'Rs: 1899'],
      ['2 Medium Pizza', 'Rs: 1599'],
      ['2 Small Pizza', 'Rs: 899'],
    ],
    price: 'Special',
  },
]

const burgerDeals = [
  { badge: 'Deal # 3', items: ['1 Special Loaded Fries', '2 Chicken Grill Burger Double'], price: 'Rs: 1599' },
  {
    badge: 'Deal # 4',
    items: ['1 Special Loaded Fries', '2 Chicken Grill Burger Single', '1 Grill Sandwich'],
    price: 'Rs: 1850',
  },
  {
    badge: 'Deal # 5',
    items: ['1 Special Loaded Fries', '2 Chicken Grill Burger Double', '1 Grill Sandwich'],
    price: 'Rs: 2050',
  },
  {
    badge: 'Deal # 6',
    items: ['1 Special Loaded Fries', '2 Chicken Grill Burger Single', '2 Grill Sandwich', '1 Grill Shawarma'],
    price: 'Rs: 2650',
  },
  { badge: 'Deal # 7', items: ['1 Special Loaded Fries', '4 Grill Burger Double'], price: 'Rs: 2599' },
  {
    badge: 'Deal # 8',
    items: [
      '1 Special Loaded Fries',
      '1 Chicken Grill Burger Single',
      '1 Zinger Burger',
      '1 Grill Sandwich',
      'Roll Paratha',
    ],
    price: 'Rs: 2499',
  },
  { badge: 'Deal # 9', items: ['5 Zinger Burger', '1 Loader Fries'], price: 'Rs: 2299' },
  { badge: 'Deal # 10', items: ['2 Zinger Burger', '1 Loader Fries'], price: 'Rs: 1199' },
  { badge: 'Deal # 13', items: ['3 Zinger Burger'], price: 'Rs: 1099' },
]

const moreDeals = [
  { badge: 'Deal # 14', items: ['1 Tower Burger', '1 Reg Fries', '1 Half Ltr Drink'], price: 'Rs: 799' },
  { badge: 'Deal # 15', items: ['2 Small Pizza', '+ 500 ML Drink'], price: 'Rs: 950' },
  {
    badge: 'Deal # 16',
    items: ['1 Grill Burger Single', '1 Sandwich', '1 Zinger Burger', '1 Special Loaded Fries'],
    price: 'Rs: 1750',
  },
  { badge: 'Deal # 17', items: ['3 Zinger Burger', '1-Reg Fries', '1 LTR Drinks'], price: 'Rs: 1299' },
  {
    badge: 'Deal # 18',
    items: ['3 Zinger Burger', '1-Large Pizza', '1.5 LTR Drinks', '1-Reg Fries'],
    price: 'Rs: 2450',
  },
  { badge: 'Deal # 19', items: ['1 Zinger Burger', '1 Grill Shawarma', '1 300 ml Drink'], price: 'Rs: 750' },
  { badge: 'Deal # 20', items: ['1 Zinger Burger', '1 Paratha Roll', '1 300 ml Drink'], price: 'Rs: 950' },
]

const barbecueItems = [
  { name: 'Chicken Malai Boti', urdu: 'چکن ملائی بوٹی', kilo: '1700', half: '850', quarter: '450', price: '450' },
  { name: 'Chicken Cheese Malai Boti', urdu: 'چکن چیز ملائی بوٹی', kilo: '1800', half: '899', quarter: '499', price: '499' },
  { name: 'Chicken Tikka Boti', urdu: 'چکن تکہ بوٹی', kilo: '1500', half: '750', quarter: '399', price: '399' },
  { name: 'Chicken Leg Piece', urdu: 'چکن لیگ پیس', kilo: '—', half: '—', quarter: '450', price: '450' },
  { name: 'Chicken Breast Piece', urdu: 'چکن بریسٹ پیس', kilo: '—', half: '—', quarter: '450', price: '450' },
  { name: 'Chicken Malai Piece', urdu: 'چکن ملائی پیس', kilo: '—', half: '—', quarter: '450', price: '450' },
  { name: 'Chicken Seekh Kabab', urdu: 'چکن سیخ کباب', kilo: '1650', half: '850', quarter: '450', price: '450' },
  { name: 'Chicken Gola Kabab', urdu: 'چکن گولا کباب', kilo: '1650', half: '850', quarter: '450', price: '450' },
  { name: 'Chicken Reshmi Kabab', urdu: 'چکن ریشمی کباب', kilo: '1650', half: '850', quarter: '450', price: '450' },
  { name: 'Chicken Hare Bhare Kabab', urdu: 'چکن ہرے بھرے کباب', kilo: '1650', half: '850', quarter: '450', price: '450' },
  { name: 'Chicken Seekh', urdu: 'چکن سیخ', kilo: '1650', half: '850', quarter: '450', price: '450' },
  { name: 'Beef Kabab', urdu: 'بیف کباب', kilo: '1650', half: '950', quarter: '499', price: '499' },
  { name: 'Beef Cheese Kabab', urdu: 'بیف چیز کباب', kilo: '1650', half: '1050', quarter: '550', price: '550' },
  { name: 'Grill Fish', urdu: 'گرل فش', kilo: '1650', half: '—', quarter: '—', price: '1650' },
  { name: 'Raita', urdu: 'رائتہ', kilo: '—', half: '—', quarter: '50', price: '50' },
  { name: 'Sada Roti', urdu: 'سادہ روٹی', kilo: '—', half: '—', quarter: '20', price: '20' },
  { name: 'Sada Naan', urdu: 'سادہ نان', kilo: '—', half: '—', quarter: '30', price: '30' },
  { name: 'Roghani Naan', urdu: 'روغنی نان', kilo: '—', half: '—', quarter: '60', price: '60' },
]

const sidesCategories = [
  {
    name: 'Chicken Drum Stick',
    items: [
      { name: 'Chicken Drum Stick 2 Pcs', price: '399/-' },
      { name: 'Chicken Drum Stick 4 Pcs', price: '799/-' },
      { name: 'Chicken Drum Stick 6 Pcs', price: '1199/-' },
    ],
  },
  {
    name: 'Chicken Hot Wings',
    items: [
      { name: 'Chicken Hot Wing 6 Pcs', price: '499/-' },
      { name: 'Chicken Hot Wing 12 Pcs', price: '999/-' },
      { name: 'Chicken Hot Wing 24 Pcs', price: '1999/-' },
    ],
  },
  {
    name: 'Finger Fish',
    items: [
      { name: 'Finger Fish 2 PCS', price: '599/-' },
      { name: 'Finger Fish 4 PCS', price: '1199/-' },
      { name: 'Finger Fish 8 PCS', price: '2399/-' },
    ],
  },
  {
    name: 'Hara Bhara Kabab',
    items: [
      { name: 'Hare Bhara Kabab (QTR)', price: '450/-' },
      { name: 'Hare Bhara Kabab (HALF)', price: '850/-' },
      { name: 'Hare Bhara Kabab (FULL)', price: '1700/-' },
    ],
  },
]

const OrderButton = ({ item, onAddToCart, variantType, onSelectVariant }) => (
  <button
    type="button"
    className="order-btn"
    onClick={() => {
      if (variantType) {
        onSelectVariant({ ...item, variantType })
        return
      }

      onAddToCart({ ...item, price: `Rs. ${item.price}` })
    }}
  >
    Order Now
  </button>
)

const Menu = ({ onAddToCart }) => {
  const [variantItem, setVariantItem] = useState(null)

  const variantOptions = variantItem?.variantType === 'burger'
    ? [
        { key: 'single', label: 'Single Patty' },
        { key: 'double', label: 'Double Patty' },
        { key: 'triple', label: 'Triple Patty' },
      ]
    : [
        { key: 'small', label: 'Small' },
        { key: 'medium', label: 'Medium' },
        { key: 'large', label: 'Large' },
      ]

  const handleVariantSelect = (option) => {
    const price = variantItem[option.key]

    if (!price || price === '—') return

    onAddToCart({
      ...variantItem,
      name: `${variantItem.name} (${option.label})`,
      price: `Rs. ${price}`,
    })
    setVariantItem(null)
  }

  return (
    <div className="menu-page">
      <div className="menu-logo-backdrop">
        <img src={logoImage} alt="Super Grill Burger background logo" className="menu-logo-image" />
      </div>

      <div className="menu-header">
        <h1 className="menu-title">Super Grill Burger</h1>
        <p className="menu-subtitle">Choose your favorite grilled burger</p>
      </div>

      <section
        className="menu-container"
        aria-labelledby="chicken-burgers-title"
      >
        <div
          className="menu-chicken-burgers-data"
          style={{ '--menu-section-background': `url("${chickenBurgerBackground}")` }}
        >
          <h2 id="chicken-burgers-title">Grill Chicken Burgers &amp; Super</h2>
          <div className="menu-table-wrap">
            <table className="menu-table">
              <thead>
                <tr>
                  <th scope="col">Burger Name</th>
                  <th scope="col">Single</th>
                  <th scope="col">Double</th>
                  <th scope="col">Triple</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.name}>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.single}</td>
                    <td>{item.double}</td>
                    <td>{item.triple}</td>
                    <td>
                      <OrderButton
                        item={{ ...item, price: item.triple }}
                        variantType="burger"
                        onSelectVariant={setVariantItem}
                        onAddToCart={onAddToCart}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="menu-beef-burgers-data"
          style={{ '--menu-section-background': `url("${beefBurgerBackground}")` }}
        >
          <h2 className="menu-section-heading">Beef &amp; Zinger Burgers</h2>
          <div className="menu-table-wrap">
            <table className="menu-table">
              <thead>
                <tr>
                  <th scope="col">Burger Name</th>
                  <th scope="col">Single</th>
                  <th scope="col">Double</th>
                  <th scope="col">Triple</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {beefZingerItems.map((item) => (
                  <tr key={item.name}>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.single}</td>
                    <td>{item.double}</td>
                    <td>{item.triple}</td>
                    <td>
                      <OrderButton
                        item={{ ...item, price: item.triple }}
                        variantType="burger"
                        onSelectVariant={setVariantItem}
                        onAddToCart={onAddToCart}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="menu-loaded-fries-data"
          style={{ '--menu-section-background': `url("${loadedFriesBackground}")` }}
        >
          <h2 className="menu-section-heading">Loaded Fries</h2>
          <div className="menu-table-wrap">
            <table className="menu-table">
              <thead>
                <tr>
                  <th scope="col">Item Name</th>
                  <th scope="col">Small</th>
                  <th scope="col">Medium</th>
                  <th scope="col">Large</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {loadedFriesItems.map((item) => (
                  <tr key={item.name}>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.small}</td>
                    <td>{item.medium}</td>
                    <td>{item.large}</td>
                    <td><OrderButton item={item} onAddToCart={onAddToCart} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="menu-pizza-data"
          style={{ '--menu-section-background': `url("${pizzaBackground}")` }}
        >
          <h2 className="menu-section-heading">Pizzas</h2>
          <div className="menu-table-wrap">
            <table className="menu-table">
              <thead>
                <tr>
                  <th scope="col">Flavor / Item Name</th>
                  <th scope="col">Small</th>
                  <th scope="col">Medium</th>
                  <th scope="col">Large</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {pizzaItems.map((item) => (
                  <tr key={item.name}>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.small}</td>
                    <td>{item.medium}</td>
                    <td>{item.large}</td>
                    <td><OrderButton item={item} variantType="pizza" onSelectVariant={setVariantItem} onAddToCart={onAddToCart} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="menu-new-pizza-data"
          style={{ '--menu-section-background': `url("${newPizzaBackground}")` }}
        >
          <h2 className="menu-section-heading">New Addition Pizza</h2>
          <div className="menu-table-wrap">
            <table className="menu-table">
              <thead>
                <tr>
                  <th scope="col">Flavor / Item Name</th>
                  <th scope="col">Small</th>
                  <th scope="col">Medium</th>
                  <th scope="col">Large</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {newPizzaItems.map((item) => (
                  <tr key={item.name}>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.small}</td>
                    <td>{item.medium}</td>
                    <td>{item.large}</td>
                    <td><OrderButton item={item} variantType="pizza" onSelectVariant={setVariantItem} onAddToCart={onAddToCart} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="menu-sandwich-data"
          style={{ '--menu-section-background': `url("${sandwichBackground}")` }}
        >
          <h2 className="menu-section-heading">Grill Sandwich With Fries</h2>
          <div className="menu-table-wrap">
            <table className="menu-table menu-table--simple">
              <thead>
                <tr>
                  <th scope="col">Sandwich Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {sandwichItems.map((item) => (
                  <tr key={item.name}>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.price}</td>
                    <td><OrderButton item={item} onAddToCart={onAddToCart} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="menu-steak-data"
          style={{ '--menu-section-background': `url("${steakBackground}")` }}
        >
          <h2 className="menu-section-heading">Grill Steaks</h2>
          <div className="menu-table-wrap">
            <table className="menu-table menu-table--simple">
              <thead>
                <tr>
                  <th scope="col">Steak / Item Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {steakItems.map((item) => (
                  <tr key={item.name}>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.price}</td>
                    <td><OrderButton item={item} onAddToCart={onAddToCart} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="menu-shawarma-data"
          style={{ '--menu-section-background': `url("${shawarmaBackground}")` }}
        >
          <h2 className="menu-section-heading">Grill Shawarma &amp; Platter With Fries &amp; Plain Fries</h2>
          <div className="menu-table-wrap">
            <table className="menu-table">
              <thead>
                <tr>
                  <th scope="col">Item Name</th>
                  <th scope="col">Small</th>
                  <th scope="col">Medium / Regular</th>
                  <th scope="col">Large</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {shawarmaItems.map((item) => (
                  <tr key={item.name}>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.small}</td>
                    <td>{item.medium}</td>
                    <td>{item.large}</td>
                    <td><OrderButton item={item} variantType="shawarma" onSelectVariant={setVariantItem} onAddToCart={onAddToCart} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="menu-roll-wrap-data"
          style={{ '--menu-section-background': `url("${rollWrapBackground}")` }}
        >
          <h2 className="menu-section-heading">Roll Paratha &amp; Grill Wrap</h2>
          <div className="menu-table-wrap">
            <table className="menu-table menu-table--simple">
              <thead>
                <tr>
                  <th scope="col">Item Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {rollWrapItems.map((item) => (
                  <tr key={item.name}>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.price}</td>
                    <td><OrderButton item={item} onAddToCart={onAddToCart} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="menu-pizza-deals-data"
          style={{ '--menu-section-background': `url("${pizzaDealsBackground}")` }}
        >
          <h2 className="menu-section-heading">Pizza Deals</h2>
          <div className="menu-table-wrap">
            <table className="menu-table menu-table--deals">
              <thead>
                <tr>
                  <th scope="col">Deal Details</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {pizzaDeals.map((deal) => (
                  <tr key={deal.badge}>
                    <td>
                      <span className={`deal-badge${deal.super ? ' super-badge' : ''}`}>{deal.badge}</span>
                      <ul className="deal-list">
                        {deal.items.map((item) => (
                          <li key={Array.isArray(item) ? item[0] : item}>
                            {Array.isArray(item) ? (
                              <>
                                {item[0]} <span className="old-price">{item[1]}</span>
                              </>
                            ) : item}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td><strong className="price-tag">{deal.price}</strong></td>
                    <td><OrderButton item={{ name: deal.badge, price: deal.price }} onAddToCart={onAddToCart} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="menu-burger-deals-data"
          style={{ '--menu-section-background': `url("${burgerDealsBackground}")` }}
        >
          <h2 className="menu-section-heading">Burger &amp; Loaded Fries Deals</h2>
          <div className="menu-table-wrap">
            <table className="menu-table menu-table--deals">
              <thead>
                <tr>
                  <th scope="col">Deal Details</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {burgerDeals.map((deal) => (
                  <tr key={deal.badge}>
                    <td>
                      <span className="deal-badge">{deal.badge}</span>
                      <ul className="deal-list">
                        {deal.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </td>
                    <td><strong className="price-tag">{deal.price}</strong></td>
                    <td><OrderButton item={{ name: deal.badge, price: deal.price }} onAddToCart={onAddToCart} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="menu-more-deals-data"
          style={{ '--menu-section-background': `url("${moreDealsBackground}")` }}
        >
          <h2 className="menu-section-heading">More Deals (14 - 20)</h2>
          <div className="menu-table-wrap">
            <table className="menu-table menu-table--deals">
              <thead>
                <tr>
                  <th scope="col">Deal Details</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {moreDeals.map((deal) => (
                  <tr key={deal.badge}>
                    <td>
                      <span className="deal-badge">{deal.badge}</span>
                      <ul className="deal-list">
                        {deal.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </td>
                    <td><strong className="price-tag">{deal.price}</strong></td>
                    <td><OrderButton item={{ name: deal.badge, price: deal.price }} onAddToCart={onAddToCart} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="menu-barbecue-data"
          style={{ '--menu-section-background': `url("${barbecueBackground}")` }}
        >
          <h2 className="menu-section-heading">Super Grill Bar B.Q</h2>
          <div className="menu-table-wrap">
            <table className="menu-table">
              <thead>
                <tr>
                  <th scope="col">Item Name</th>
                  <th scope="col">Kilo (کلو)</th>
                  <th scope="col">Half (ہاف)</th>
                  <th scope="col">Quarter (کوارٹر)</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {barbecueItems.map((item) => (
                  <tr key={item.name}>
                    <td>
                      <strong>{item.name}</strong>
                      <small>{item.urdu}</small>
                    </td>
                    <td>{item.kilo}</td>
                    <td>{item.half}</td>
                    <td>{item.quarter}</td>
                    <td><OrderButton item={item} onAddToCart={onAddToCart} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <section
          className="menu-sides-section"
          aria-label="Chicken sides and snacks"
          style={{ '--menu-section-background': `url("${sidesBackground}")` }}
        >
          <div className="menu-header-text">
            <span>اصل ذائقہ</span> | <span>اصل مزہ</span>
          </div>
          <div className="menu-table-wrap">
            <table className="menu-table">
              <thead>
                <tr>
                  <th scope="col">Item Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {sidesCategories.map((category) => (
                  <Fragment key={category.name}>
                    <tr className="category-row">
                      <td colSpan="3">{category.name}</td>
                    </tr>
                    {category.items.map((item) => (
                      <tr key={item.name}>
                        <td><strong>{item.name}</strong></td>
                        <td>{item.price}</td>
                        <td><OrderButton item={item} onAddToCart={onAddToCart} /></td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {variantItem && (
          <div className="variant-modal-backdrop" onClick={() => setVariantItem(null)}>
            <div
              className="variant-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="variant-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="variant-modal-header">
                <div>
                  <span className="variant-modal-eyebrow">Choose your option</span>
                  <h3 id="variant-modal-title">{variantItem.name}</h3>
                </div>
                <button
                  type="button"
                  className="variant-modal-close"
                  aria-label="Close selection"
                  onClick={() => setVariantItem(null)}
                >
                  ×
                </button>
              </div>

              <div className="variant-options">
                {variantOptions.map((option) => {
                  const price = variantItem[option.key]
                  const unavailable = !price || price === '—'

                  return (
                    <button
                      type="button"
                      className="variant-option"
                      key={option.key}
                      disabled={unavailable}
                      onClick={() => handleVariantSelect(option)}
                    >
                      <span>{option.label}</span>
                      <strong>{unavailable ? 'Unavailable' : `Rs. ${price}`}</strong>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default Menu
