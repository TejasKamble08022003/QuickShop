import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./Product.css"


const Product = ({ product }) =>{

    if (!product || !product.images || !product.images[0]) {
        return null; // Or a fallback UI
    }
    const options ={

        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"gold",
        value:product.ratings,
        size: window.innerWidth <600 ? 20:25,
    
        isHalf:true,
    };
        
return(
<>
<Link className="productCard" to={product._id}>
<img src={product.images[0].url} alt={product.name} />
<p>{product.name}</p>
<div>
<ReactStars {...options} />
<span>(256 Reviews)</span>
    
</div>
<span>{product.price}</span>
</Link>
</>
);
};

export default Product;

