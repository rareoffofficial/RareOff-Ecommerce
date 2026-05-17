import api, { unwrap } from "../api/axios";

export const cartService = {
  get:    async ()                       => unwrap(await api.get("/cart")),
  add:    async (productId, quantity = 1) => unwrap(await api.post("/cart/items", { productId, quantity })),
  update: async (itemId, quantity)        => unwrap(await api.patch(`/cart/items/${itemId}`, { quantity })),
  remove: async (itemId)                  => unwrap(await api.delete(`/cart/items/${itemId}`)),
  clear:  async ()                       => unwrap(await api.delete("/cart")),
};
