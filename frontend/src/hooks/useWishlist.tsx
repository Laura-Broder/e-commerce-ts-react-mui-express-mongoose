import { useContext } from "react";
import { IListItem } from "../utils/types";
import { appContext } from "./context";
import useAuth from "./useAuth";

const useWishlist = () => {
  const { user } = useAuth();
  const { setUser } = useContext(appContext);

  const isWished = (id: number): boolean => {
    if (!user?.wishlist?.length) return false;
    return !!user.wishlist.find((item) => item.id === id) || false;
  };
  const addToWishlist = (item: IListItem) => {
    const wishlist = user?.wishlist || [];
    // TODO convert to axios
    wishlist.push({ ...item, _id: item.id + item.name, wished: true });
    setUser({ ...user, wishlist });
  };
  const removeFromWishlist = (id: number) => {
    if (!user?.wishlist) return;
    // TODO convert to axios
    const wishlist = user.wishlist.filter((item) => item.id !== id);
    setUser({ ...user, wishlist });
  };

  return { isWished, addToWishlist, removeFromWishlist };
};

export default useWishlist;
