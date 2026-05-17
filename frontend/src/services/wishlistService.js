import api, { unwrap } from "../api/axios";

export const wishlistService = {
  list:   async ()           => unwrap(await api.get("/wishlist")),
  add:    async (productId)  => unwrap(await api.post(`/wishlist/${productId}`)),
  remove: async (productId)  => unwrap(await api.delete(`/wishlist/${productId}`)),
};
