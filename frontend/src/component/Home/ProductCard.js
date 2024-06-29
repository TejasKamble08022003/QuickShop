import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  console.log("product : ",product)
  return (
    <Link className="productCard" to={`/product/${product?._id}`}>
      {product?.images?.[0]?.url ? (
        <img src={product.images[0].url} alt={product.name} />
      ) : (
        <img src="/placeholder-image.png" alt="Placeholder" />
      )}
      <p>{product?.name || "Unknown Product"}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          {" "}
          ({product?.numOfReviews || 0} Reviews)
        </span>
      </div>
      <span>{`₹${product?.price || 0}`}</span>
    </Link>
  );
};

export default ProductCard;