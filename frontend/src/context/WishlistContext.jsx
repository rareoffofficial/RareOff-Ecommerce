import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { wishlistService } from "../services/wishlistService";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  const refresh = useCallback(async () => {
    if (!user) { setItems([]); return; }
    setItems(await wishlistService.list());
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  const add    = async (id) => { await wishlistService.add(id);    refresh(); };
  const remove = async (id) => { await wishlistService.remove(id); refresh(); };
  const has    = (productId) => items.some((i) => i.productId === productId);

  return (
    <WishlistContext.Provider value={{ items, refresh, add, remove, has }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
