import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

// ---- token storage (access in memory + localStorage mirror, refresh in localStorage) ----
const TOKEN_KEY = "rareoff_access";
const REFRESH_KEY = "rareoff_refresh";

export const tokenStore = {
  getAccess:  () => localStorage.getItem(TOKEN_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  set: (access, refresh) => {
    if (access)  localStorage.setItem(TOKEN_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

const api = axios.create({ baseURL: BASE_URL, headers: { "Content-Type": "application/json" } });

// Attach access token
api.interceptors.request.use((config) => {
  const token = tokenStore.getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Refresh on 401 (single-flight)
let refreshing = null;
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry && tokenStore.getRefresh()) {
      original._retry = true;
      try {
        refreshing = refreshing || axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken: tokenStore.getRefresh(),
        });
        const { data } = await refreshing;
        refreshing = null;
        const payload = data.data;
        tokenStore.set(payload.accessToken, payload.refreshToken);
        original.headers.Authorization = `Bearer ${payload.accessToken}`;
        return api(original);
      } catch (e) {
        refreshing = null;
        tokenStore.clear();
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

// Unwrap ApiResponse envelope
export const unwrap = (res) => res.data?.data ?? res.data;

export default api;
