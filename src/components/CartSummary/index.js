// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let cartFullPrice = 0

      const cartListPrice = cartList.map(eachItem => {
        const eachItemprice = eachItem.quantity * eachItem.price
        cartFullPrice += eachItemprice
      })

      const cartListCount = cartList.length

      return (
        <div className="cart-summary-card">
          <div className="cart-summary-price-count-card">
            <h1 className="cart-summary-total-price">
              Order Total
              <span className="cart-summary-span-el">{`: Rs${cartFullPrice}/-`}</span>
            </h1>
            <p className="cart-summary-total-count">{`${cartListCount} items in cart`}</p>
          </div>
          <button type="button" className="cart-summary-checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
