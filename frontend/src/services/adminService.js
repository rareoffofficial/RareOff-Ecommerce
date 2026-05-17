import api, { unwrap } from "../api/axios";

export const adminService = {
  // ---------- PRODUCTS ----------
  listProducts: async (params = {}) => unwrap(await api.get("/products", { params })),
  getProduct:   async (id)          => unwrap(await api.get(`/products/${id}`)),
  createProduct:async (body)        => unwrap(await api.post("/admin/products", body)),
  updateProduct:async (id, body)    => unwrap(await api.put(`/admin/products/${id}`, body)),
  deleteProduct:async (id)          => unwrap(await api.delete(`/admin/products/${id}`)),

  // ---------- CATEGORIES ----------
  listCategories:   async ()       => unwrap(await api.get("/categories")),
  createCategory:   async (body)   => unwrap(await api.post("/admin/categories", body)),
  updateCategory:   async (id, b)  => unwrap(await api.put(`/admin/categories/${id}`, b)),
  deleteCategory:   async (id)     => unwrap(await api.delete(`/admin/categories/${id}`)),

  // ---------- ORDERS ----------
  listOrders:       async (params = {}) => unwrap(await api.get("/admin/orders", { params })),
  getOrder:         async (id)          => unwrap(await api.get(`/admin/orders/${id}`)),
  updateOrderStatus:async (id, status)  => unwrap(await api.patch(`/admin/orders/${id}/status`, { status })),

  // ---------- UPLOAD ----------
  upload: async (file, folder = "products") => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await api.post(`/admin/uploads?folder=${folder}`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return unwrap(res);
  },
};
