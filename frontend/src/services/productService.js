import api, { unwrap } from "../api/axios";

export const productService = {
  list: async (params = {}) => unwrap(await api.get("/products", { params })),
  getById: async (id) => unwrap(await api.get(`/products/${id}`)),
  getBySlug: async (slug) => unwrap(await api.get(`/products/slug/${slug}`)),
};
