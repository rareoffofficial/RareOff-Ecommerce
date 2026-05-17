import api, { unwrap, tokenStore } from "../api/axios";

export const authService = {
  register: async (payload) => {
    const data = unwrap(await api.post("/auth/register", payload));
    tokenStore.set(data.accessToken, data.refreshToken);
    return data;
  },
  login: async (payload) => {
    const data = unwrap(await api.post("/auth/login", payload));
    tokenStore.set(data.accessToken, data.refreshToken);
    return data;
  },
  me: async () => unwrap(await api.get("/auth/me")),
  logout: async () => {
    try { await api.post("/auth/logout", { refreshToken: tokenStore.getRefresh() }); } catch {}
    tokenStore.clear();
  },
};
