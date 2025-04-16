import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useEffect } from "react";

const Carts = () => {
  const { cartItems, removeFromCart, decreaseQuantity, increaseQuantity } = useCart();
  const navigate = useNavigate();

  const handleClick = (index: number) => {
    removeFromCart(index);
  };


  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
    }
  }, [cartItems]);

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          {cartItems.map((item: any, index: number) => (
            item.id != null && (
              <div
                key={index}
                className="item_container d-flex justify-content-between align-items-center m-2 border border-2 p-2">
                <div className="d-flex align-items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="m-1"
                    style={{ width: "6rem", height: "6rem", objectFit: "cover" }}
                  />
                  <div className="ms-3">
                    <p className="fs-6 mb-2"><b>Product:</b> {item.name}</p>
                    <p className="fs-6 mb-2"><b>Price:</b> {item.price}</p>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => decreaseQuantity(item.id)}
                      >-</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => increaseQuantity(item.id)}
                      >+</button>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => handleClick(index)}
                  aria-label="Close"
                ></button>
              </div>
            )
          ))}
        </div>

        <div className="col-md-6 p-4 border-start">
          <h4>Bill</h4>
          <hr className="mt-5"/>
          <p><b>Total Items:</b> {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</p>
          <p><b>Total Amount:</b> ₹{cartItems.reduce((acc, item) => {
            // Remove non-numeric characters (like currency symbols) from the price string
            const price = parseFloat(item.price.replace(/[^\d.-]/g, ''));
            return acc + (price * item.quantity);
            }, 0).toFixed(2)}</p>
          </div>
      </div>
    </>
  );
};

export default Carts;
