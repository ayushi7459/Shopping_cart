import { useDispatch, useSelector } from "react-redux";
import { AddCart, RemoveCart , cartItems as cart,IncreaseQuantity,DecreaseQuantity
} from "../features/cartSlice";
import {Card} from '../features/cartSlice'



const useCart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(cart);

    const addToCart = (item: Card) => {
        dispatch(AddCart(item));
    };

    const removeFromCart = (index:Number) => {
        dispatch(RemoveCart(index));
    };

    const increaseQuantity = (id: number) => {
        dispatch(IncreaseQuantity(id));
      };
    
      const decreaseQuantity = (id: number) => {
        dispatch(DecreaseQuantity(id));
      };
      

    return { cartItems, addToCart, removeFromCart,increaseQuantity,decreaseQuantity};
};

export default useCart;
