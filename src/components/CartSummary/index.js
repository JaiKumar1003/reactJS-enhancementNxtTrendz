import {Component} from 'react'
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {IoMdClose} from 'react-icons/io'
import CartContext from '../../context/CartContext'
import './index.css'

class CartSummary extends Component {
  state = {
    isConfirmed: false,
    isOrdered: false,
  }

  onClickCashOnDelivery = () => {
    this.setState(prevState => ({
      isConfirmed: !prevState.isConfirmed,
    }))
  }

  onClickConfirmOrder = () => {
    const {isConfirmed} = this.state
    if (isConfirmed) {
      this.setState({
        isOrdered: true,
      })
    }
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const {isConfirmed, isOrdered} = this.state

          let cartFullQuantity = 0
          let cartFullPrice = 0

          cartList.forEach(eachItem => {
            const eachItemPrice = eachItem.quantity * eachItem.price
            cartFullPrice += eachItemPrice
            cartFullQuantity += eachItem.quantity
          })

          const cartListCount = cartList.length
          const cardPayment = true
          const netbanking = true
          const upiPayment = true
          const walletPayment = true

          return (
            <div className="cart-summary-card">
              <div className="cart-summary-price-count-card">
                <h1 className="cart-summary-total-price">
                  Order Total
                  <span className="cart-summary-span-el">{`: Rs${cartFullPrice}/-`}</span>
                </h1>
                <p className="cart-summary-total-count">{`${cartListCount} items in cart`}</p>
              </div>
              <Popup
                trigger={
                  <button
                    type="button"
                    className="cart-summary-checkout-button"
                  >
                    Checkout
                  </button>
                }
                modal
                nested
              >
                {close => (
                  <div className="modal">
                    {isOrdered ? (
                      <div className="payment-success-card">
                        <p className="payment-success-desp">
                          Your order has been placed successfully
                        </p>
                        <Link className="confirm-shopping-link" to="/products">
                          <button
                            type="button"
                            className="payment-success-continue-shopping-btn"
                          >
                            Continue Shopping
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <div className="payment-card">
                        <button
                          type="button"
                          aria-label="payment icon"
                          className="payment-close-btn"
                          onClick={close}
                        >
                          <IoMdClose className="payment-close-icon" />
                        </button>
                        <div className="payment-methods-confirm-order-card">
                          <form className="payment-methods-card">
                            <p className="payment-heading">Payment Options</p>
                            <div className="payment-option-input-label-card">
                              <input
                                disabled={cardPayment}
                                type="radio"
                                className="payment-option-radio-input"
                                id="card"
                                name="payment"
                              />
                              <label
                                htmlFor="card"
                                className="payment-option-name"
                              >
                                Card
                              </label>
                            </div>
                            <div className="payment-option-input-label-card">
                              <input
                                disabled={netbanking}
                                type="radio"
                                className="payment-option-radio-input"
                                id="nb"
                                name="payment"
                              />
                              <label
                                htmlFor="nb"
                                className="payment-option-name"
                              >
                                Net Banking
                              </label>
                            </div>
                            <div className="payment-option-input-label-card">
                              <input
                                disabled={upiPayment}
                                type="radio"
                                className="payment-option-radio-input"
                                id="upi"
                                name="payment"
                              />
                              <label
                                htmlFor="upi"
                                className="payment-option-name"
                              >
                                UPI
                              </label>
                            </div>
                            <div className="payment-option-input-label-card">
                              <input
                                disabled={walletPayment}
                                type="radio"
                                className="payment-option-radio-input"
                                id="wallet"
                                name="payment"
                              />
                              <label
                                htmlFor="wallet"
                                className="payment-option-name"
                              >
                                Wallet
                              </label>
                            </div>
                            <div className="payment-option-input-label-card">
                              <input
                                type="radio"
                                className="payment-option-radio-input selected-button"
                                id="cashOnDelivery"
                                name="payment"
                                onClick={this.onClickCashOnDelivery}
                              />
                              <label
                                htmlFor="cashOnDelivery"
                                className="payment-option-name selected-button"
                              >
                                Cash on Delivery
                              </label>
                            </div>
                          </form>
                          <div className="product-quantity-price-card">
                            <p className="total-quantity-price-name">
                              Total No of Items:{' '}
                              <span className="total-value-of-quantity-price">
                                {cartFullQuantity}
                              </span>
                            </p>
                            <p className="total-quantity-price-name">
                              Total Amount:{' '}
                              <span className="total-value-of-quantity-price">
                                Rs {cartFullPrice}/-
                              </span>
                            </p>
                            <button
                              type="button"
                              disabled={!isConfirmed}
                              style={{
                                backgroundColor: isConfirmed
                                  ? '#0f6346'
                                  : 'transparent',
                                color: isConfirmed ? '#ffffff' : '#000000',
                                border: isConfirmed
                                  ? 'none'
                                  : '1px solid #bab5b5',
                                cursor: isConfirmed && 'pointer',
                                outline: isConfirmed && 'none',
                              }}
                              className="confirm-order-btn"
                              onClick={this.onClickConfirmOrder}
                            >
                              Confirm Order
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Popup>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
