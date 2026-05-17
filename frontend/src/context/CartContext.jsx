import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { cartService } from "../services/cartService";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);
const EMPTY = { id: null, items: [], totalItems: 0, totalPrice: 0 };

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) { setCart(EMPTY); return; }
    setLoading(true);
    try { setCart(await cartService.get()); }
    finally { setLoading(false); }
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  const add    = async (productId, qty = 1) => setCart(await cartService.add(productId, qty));
  const update = async (itemId, qty)        => setCart(await cartService.update(itemId, qty));
  const remove = async (itemId)             => setCart(await cartService.remove(itemId));
  const clear  = async ()                   => { await cartService.clear(); setCart(EMPTY); };

  return (
    <CartContext.Provider value={{ cart, loading, refresh, add, update, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
