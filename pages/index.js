import React from 'react';
import { client } from '@/lib/client';
import {Product, FooterBanner, HeroBanner} from '../components';
//passing products and bannerdata props to home
const Home = ({ products, bannerData }) => (
    <>
      {/* {console.log(products)} */}
      {/* {console.log(bannerData)} */}
      {/* && acts as (if) statement, where if exp. 1 is TRUE then exp. 2 gets executed or else none gets */}
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variation</p>
      </div>
      <div className='products-container'>
        {/* ternay operator is used to check whether the product is empty or if not then it should have functionality */}
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
);

//fetch the api data from sanity
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  // products:
  // when the products only had a single field in sanity
  // Array(9)
  // 0:{createdAt: '2023-04-09T07:04:30Z', _rev: 'VlHiRZZu2qeYllJtPvGwVa', _type: 'product', details: 'Great looking and quality headphones at reasonable price!', _id: '33500146-3099-4fa1-8507-9ea0dc340384', …}
  // 1:{_updatedAt: '2023-05-17T17:06:07Z', image: Array(4), price: 2800, _createdAt: '2023-04-12T03:40:19Z', _rev: '7RRkqBiXN2KWMwCzRS2iO7', …}
  // 2:{image: Array(4), _createdAt: '2023-04-12T03:25:57Z', _id: '47d00e6c-e4ea-4011-9e02-b03a81bfd684', slug: {…}, price: 2200, …}
  // 3:{_type: 'product', name: 'Neckband N1', _updatedAt: '2023-05-17T17:07:08Z', slug: {…}, image: Array(4), …}
  // 4:{_type: 'product', _updatedAt: '2023-04-12T03:34:51Z', slug: {…}, image: Array(4), _createdAt: '2023-04-12T03:24:34Z', …}
  // 5:{image: Array(4), _createdAt: '2023-04-12T03:18:56Z', _id: 'a3134406-bf6c-4d09-b6fd-21317b2214d5', name: 'boAt TenEx 01', details: 'Best party speaker with great sound and hi-bass profile with multifunctionality', …}
  // 6:{slug: {…}, price: 600, _createdAt: '2023-04-12T03:29:32Z', _rev: 'VlHiRZZu2qeYllJtPvImxt', _type: 'product', …}
  // 7:{details: 'Get in groove with the lastest headphones', _updatedAt: '2023-05-17T17:06:51Z', price: 1500, _createdAt: '2023-04-12T03:21:36Z', name: 'boAt 200', …}
  // 8:{_createdAt: '2023-04-12T03:28:23Z', _type: 'product', details: 'Great gaming headphones with RGB functionality and a additional external mic connectivity', _updatedAt: '2023-05-17T17:07:28Z', image: Array(4), …}
  // length:9
  // [[Prototype]]: Array(0)
  
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  // banner data:
  // when the banner only holds a single field in sanity
  // Array(1)
  // 0: 
  //   buttonText: "Shop NOW"
  //   desc:"Best Headphones"
  //   discount:"35%"
  //   image: {_type: 'image', asset: {…}}
  //   largeText1: "GET YOURS NOW"
  //   largeText2: "FASTEST SELLING HEADPHONES"
  //   midText: "SUMMER SALE"
  //   product: "Headphones"
  //   saleTime: "12am, MON to 12am, FRI"
  //   smallText: "RockerZ 900"
  //   _createdAt: "2023-04-11T02:32:56Z"
  //   _id: "bf3facf0-3516-48a4-a711-812dab7ede00"
  //   _rev: "P6LC2MfcuWvjRDypvGEnPl"
  //   _type: "banner"
  //   _updatedAt: "2023-04-11T02:32:56Z"
  //   [[Prototype]]: Object
  // length: 1
  // [[Prototype]]: Array(0)

  return {
    //exporting the products and bannerdata
    props: { products, bannerData }
  }
}
export default Home;