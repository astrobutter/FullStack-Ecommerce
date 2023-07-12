import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { urlFor } from '@/lib/client'

const Product = ({ product: { image, name, slug, price } }) => {
  const [isShown, setIsShown] = useState(0);
  return (
    <div>
      {/*since slug provides with a unique URL for each item in the product schema even if multiple items have same name they will still hold a unique slug, that's why we have to implement slug.current to actually traverse to the particular itemm in the product and get the required data.
      And having child element for the slug.current is a must to work*/}
      <Link href={`/product/${slug.current}`}>
        <div className="product-card"
          onMouseEnter={() => setIsShown(1)}
          onMouseLeave={() => setIsShown(0)}
        >
          <img 
            width={250}
            height={250}
            className="product-image"
            src={urlFor(image && image[isShown])}
          />
          <p className="product-name">{name}</p>
          <p className="product-price">₹{price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product