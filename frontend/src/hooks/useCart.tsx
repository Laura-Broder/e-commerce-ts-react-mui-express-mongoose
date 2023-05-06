import { useContext } from "react";
import { IListItem } from "../utils/types";
import { appContext } from "./context";
import useAuth from "./useAuth";

const useCart = () => {
  const { user } = useAuth();
  const { setUser } = useContext(appContext);

  const getItemQuantity = (id: number): number => {
    if (!user?.cart?.length) return 0;
    return user.cart.find((item) => item.id === id)?.quantity || 0;
  };
  const addToCart = (item: IListItem) => {
    const cart = user?.cart || [];
    const i = cart.findIndex((cartItem) => cartItem.id === item.id);
    // TODO convert to axios
    if (i === -1) {
      cart.push({
        ...item,
        _id: item.id + item.name,
        inCart: true,
        quantity: 1,
      });
    } else {
      cart[i].quantity += 1;
    }
    setUser({ ...user, cart });
  };
  const removeFromCart = (id: number) => {
    if (!user?.cart) return;
    // TODO convert to axios
    const cart = user.cart.filter((item) => item.id !== id);
    setUser({ ...user, cart });
  };

  return { getItemQuantity, addToCart, removeFromCart };
};

export default useCart;
