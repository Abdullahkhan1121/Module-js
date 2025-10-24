// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import BestSelling from '../components/BestSelling';
import Products, { products } from '../components/Products';
import Footer from '../components/Footer';
import axios from 'axios';

const Home = () => {

const [products,setproducts]=useState([]);
// api - call to fetch all product


const getproducts=async()=>{
  try {
    const response=await axios.get("http://localhost:3000/product");
    console.log(response.data);
      setproducts(response.data.products) 
  } catch (error) {
    console.log("Something went wrong", error)
  }
}
 useEffect(()=>{
  getproducts();
 },[])

  return (
    <div>
      <Banner />
      <Categories />
      <BestSelling />
      <Products allproducts={products}/>
      <Footer/>
    </div>
  );
};

export default Home;
