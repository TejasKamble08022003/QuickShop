import React, {useEffect} from "react";
import { CgMouse } from "react-icons/cg"
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData.js";
import {  getProduct } from "../../actions/productAction";
import { useDispatch } from "react-redux";


const product = {
    name:"Blue tshirt",
    images: [{url:"https://hummel.net.in/cdn/shop/files/3430000-7480.png?v=1708583372"}],
    price:"$3000",
    _id:"trejas"
};


const Home= () =>{
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(getProduct());
  }, [dispatch]);
  
    return(
  <>
  <MetaData title="Name"/>
  <div className="banner">
     <p>Welcome to NAME</p>
     <h1>FIND PRODUCTS BELOW</h1>

     <a href="#container">
        <button>
            Scroll <CgMouse />
            </button>
     </a>

  </div>

  <h2 className="homeHeading">Featured Products</h2>

  <div className="container" id="container">
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            
    </div>


  </>
    );
};

export default Home;