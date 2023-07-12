import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
        
          <div className="small-images-container"> 
            {image?.map((item, i) => (
              <img 
              key={i}
              src={urlFor(item)}
              className={i === index ? 'small-image selected-image' : 'small-image'}
              onMouseEnter={() => setIndex(i)} // since the way of selected image being shown is image[index], that's why it will be easy enough to just change the index with the new selected image index and change the selected image display area
              />
              ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiFillStar /> <AiOutlineStar />
            </div>
            <p> (20)
            </p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">₹{price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div> 
      </div>

      <h2 className="maylike-products-wrapper-h2">You may also like</h2>
      <div className="maylike-products-wrapper">
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div> 
    </div>
  )
}

export const getStaticPaths = async () => {
  // get the current property of slug of these products which means it will only return slug property of all the products instead of all the properties
  const query = `*[_type == "product"] {
    slug { current
    }
  }`;  
  const products = await client.fetch(query);
  // The paths key determines which paths will be pre-rendered
  // Next.js will statically generate params data, i.e. pages/product/product.slug.current during next build using the page component in, dynamic pages, [slug].js
  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);
  return {
    props: { products, product }
    /*  console.log("product: ",product);
            product:
              details: "Comfortable and convenient wireless earphones"
              image: (4) [{…}, {…}, {…}, {…}]
              name: "boAt buds 3"
              price: 2200
              slug: {current: 'wireless-earphones', _type: 'slug'}
              _createdAt: "2023-04-12T03:25:57Z"
              _id: "47d00e6c-e4ea-4011-9e02-b03a81bfd684"
              _rev: "Z2VJU1EXSsX3IBt1qyk7i8"
              _type: "product"
              _updatedAt: "2023-04-12T03:34:20Z"
              [[Prototype]]: Object

              
        console.log("products: ",products);
            products:
              (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
                0: {_createdAt: '2023-04-09T07:04:30Z', _rev: 'Wkx3SDb0MT0mk54VDfLDxX', name: 'boAt 1000', _id: '33500146-3099-4fa1-8507-9ea0dc340384', image: Array(1), …}
                1: {price: 2800, _id: '379946f5-7ac9-496b-b968-8d7139ba7a35', _updatedAt: '2023-04-12T03:40:35Z', image: Array(4), _rev: 'Z2VJU1EXSsX3IBt1qylLi8', …}
                2: {details: 'Comfortable and convenient wireless earphones', _id: '47d00e6c-e4ea-4011-9e02-b03a81bfd684', _rev: 'Z2VJU1EXSsX3IBt1qyk7i8', _type: 'product', name: 'boAt buds 3', …}
                3: {name: 'Neckband N1', _id: '50a5bea2-65b8-4470-964a-c3f3b570059d', _updatedAt: '2023-04-12T03:38:09Z', price: 1200, _type: 'product', …}
                4: {image: Array(4), _createdAt: '2023-04-12T03:24:34Z', _rev: 'Wkx3SDb0MT0mk54VDfLbnY', name: 'boAt overear', slug: {…}, …}
                5: {image: Array(4), price: 4500, name: 'boAt TenEx 01', details: 'Best party speaker with great sound and hi-bass profile with multifunctionality', _updatedAt: '2023-04-12T03:36:12Z', …}
                6: {price: 600, _createdAt: '2023-04-12T03:29:32Z', name: 'boAt 50', details: 'Comfortable and convenient wired headphones with easy to use', _updatedAt: '2023-04-12T03:36:57Z', …}
                7: {image: Array(4), _createdAt: '2023-04-12T03:21:36Z', _rev: 'Wkx3SDb0MT0mk54VDfMDxy', name: 'boAt 200', details: 'Get in groove with the lastest headphones', …}
                8: {details: 'Great gaming headphones with RGB functionality and a additional external mic connectivity', slug: {…}, image: Array(4), _createdAt: '2023-04-12T03:28:23Z', _rev: 'Wkx3SDb0MT0mk54VDfM0PN', …}
                length: 9
                [[Prototype]]: Array(0)
*/
  }
}
export default ProductDetails