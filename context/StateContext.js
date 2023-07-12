import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
const Context = createContext();  // context is used by useContext which is called by functional component, useStateContext, export const useStateContext = () => useContext(Context);

//function returns the context.provider with values, such as states and functional components of stateContext, while passing children between the provider declaration
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);            //count to keep track of total price after being added to the cart
  const [totalQuantities, setTotalQuantities] = useState(0);  //count to keep track of number of items added  in cart
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;
// values are passed from [slug].js by the on-click action after increasing the quantity
  const onAdd = (product, quantity) => {
    //after adding to the cart the price and quantity is changed
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    //cartitems is a state hooks, while here it makes sure that the item being added to cart was previously present in the cart or not, if so then it should not make a new entry in cart instead it should just increase the quantity
    //              seems like cartitems hooks array stores cartproduct and quantity at a index
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })
      setCartItems(updatedCartItems);
    } else {
      //                    ***************************************************
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  } 
  //  cart actions
  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    /*  console.log("foundProduct: ",foundProduct);
            foundProduct:  
            {_createdAt: '2023-04-12T03:25:57Z', _updatedAt: '2023-04-12T03:34:20Z', price: 2200, _rev: 'Z2VJU1EXSsX3IBt1qyk7i8', …}
                details: "Comfortable and convenient wireless earphones"
                image: Array(4)  [{…}, {…}, {…}, {…}], 
                name: "boAt buds 3"
                price: 2200
                quantity: 1
            slug: {current: 'wireless-earphones', _type: 'slug'}
            [[Prototype]]: Object
    */
    // index = cartItems.findIndex((product) => product._id === id);
    // console.log("index: ", index);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => { setQty((prevQty) => prevQty + 1);
  }
  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        toggleCartItemQuanitity
      }}
    >
      {children}
    </Context.Provider>
  )
}
export const useStateContext = () => useContext(Context);