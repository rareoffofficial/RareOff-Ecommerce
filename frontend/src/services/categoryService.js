import api, { unwrap } from "../api/axios";

export const categoryService = {
  list: async () => unwrap(await api.get("/categories")),
};
