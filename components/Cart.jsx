import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity, onRemove } = useStateContext();
  /*console.log(cartItems);
  (2) [{…}, {…}]
  0: 
    details: "Comfortable and convenient wireless earphones"
    image: (4) [{…}, {…}, {…}, {…}]
    name: "boAt buds 3"
    price: 2200
    quantity: 2
    slug: {current: 'wireless-earphones', _type: 'slug'}
      _createdAt: "2023-04-12T03:25:57Z"
      _id: "47d00e6c-e4ea-4011-9e02-b03a81bfd684"
      _rev: "Z2VJU1EXSsX3IBt1qyk7i8"
      _type: "product"
      _updatedAt: "2023-04-12T03:34:20Z"
    [[Prototype]]: Object
  1: {price: 4500, _rev: 'Z2VJU1EXSsX3IBt1qykSQm', details: 'Best party speaker with great sound and hi-bass profile with multifunctionality', slug: {…}, image: Array(4), …}
  length: 2
  [[Prototype]]: Array(0)
  */

  const handleCheckout = async () => {
    const stripe = await getStripe();
    //api request for backend having method 'post', headers and body
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });
    //if api request is successful
    if(response.statusCode === 500) return;
    
    const data = await response.json();
    
    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
        type="button"
        className="cart-heading"
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        {cartItems.length >= 1 && (
        <div className="product-container">
          {cartItems.map((item) => (
            <div className="product" key={item._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                  <h4>₹{item.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec') }>
                      {/* since there are mulitple products on a same page making it difficult to just use product props to decrease the quantity bcz there isn't a product specific routing and hence to identify a product uniquely in the cart we have to use item._id for the remove */}
                      <AiOutlineMinus />
                    </span>
                    <span className="num" onClick="">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc') }>
                      <AiOutlinePlus />
                    </span>
                  </p>
                  </div>
                  <button type="button" className="remove-item" onClick={() => onRemove(item)} >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )
        }

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>₹{totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" 
              onClick={handleCheckout}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart

