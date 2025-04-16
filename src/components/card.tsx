import React from "react";
import useCart from "../hooks/useCart";


type CardProps = {
  id:number;
  name:string;
  price:string;
  imageUrl:string;
  quantity:number;
}

const Card: React.FC<CardProps> = ({ id, imageUrl, name, price}) => {

  const { addToCart, cartItems } = useCart();

  const userdata = localStorage.getItem("user");
  const user = userdata ? JSON.parse(userdata) : null;
  const isLoggedin = user && user.isLoggedin;

  const item = {
    id,
    imageUrl,
    name,
    price,
    quantity: 1,
  }

  const handleClick = () => {
    addToCart(item);
  }

  const isInCart = cartItems.some((cartItem) => cartItem.id === id);

  return (
    <div className="card shadow-sm" style={{ width: "12rem", height: "20rem" }}>
      <div style={{ height: "10rem", overflow: "hidden" }}>
        <img
          src={imageUrl}
          className="card-img-top p-2"
          alt={name}
          style={{
            height: "90%",
            width: "90%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="card-body d-flex flex-column p-2 m-2">
        <h5 className="card-title fs-6 text-truncate">{name}</h5>
        <p className="card-text fs-6">{price}</p>
        {isLoggedin && (
          <button
            className="btn btn-dark btn-sm mt-auto"
            onClick={handleClick}
            disabled={isInCart}
          >
            {isInCart ? "Added" : "Add to Cart"}
          </button>
        )}
      </div>
    </div>

  );
};

export default Card;