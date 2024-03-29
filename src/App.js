import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  decrementCartItemQuantity = (cartItemId, oldQuantity) => {
    const {cartList} = this.state
    if (oldQuantity === 1) {
      this.setState({
        cartList: cartList.filter(eachItem => eachItem.id !== cartItemId),
      })
    } else {
      this.setState({
        cartList: cartList.map(eachItem => {
          if (eachItem.id === cartItemId) {
            const {quantity} = eachItem
            return {...eachItem, quantity: quantity - 1}
          }

          return eachItem
        }),
      })
    }
  }

  incrementCartItemQuantity = cartItemId => {
    const {cartList} = this.state

    this.setState({
      cartList: cartList.map(eachItem => {
        if (eachItem.id === cartItemId) {
          const {quantity} = eachItem
          return {...eachItem, quantity: quantity + 1}
        }

        return eachItem
      }),
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = productId => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(
      eachItem => eachItem.id !== productId,
    )
    this.setState({cartList: filteredCartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const {id} = product

    const findSameProduct = cartList.find(eachItem => eachItem.id === id)
    if (findSameProduct !== undefined) {
      this.setState({
        cartList: cartList.map(eachItem => {
          if (eachItem.id === id) {
            return {...eachItem, quantity: eachItem.quantity + product.quantity}
          }

          return eachItem
        }),
      })
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
