import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import Image from 'next/image';
// import logo_image from '/../../public/assets'

import { Cart } from './';
import { useStateContext} from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">
          <Image src='/assets/logo-black.png'  alt='' width={100} height={100} />
        </Link>
        {/* <Image src='/assets/logo-no-background.png'  alt='' width={100} height={100} /> */}
      </p>

      <button type="button" className="cart-icon" 
      onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
