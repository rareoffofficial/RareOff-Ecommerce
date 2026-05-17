import api, { unwrap } from "../api/axios";

export const orderService = {
  checkout: async (payload)        => unwrap(await api.post("/orders", payload)),
  listMine: async (params = {})    => unwrap(await api.get("/orders", { params })),
  getMine:  async (id)             => unwrap(await api.get(`/orders/${id}`)),
};
