import api, { unwrap } from "../api/axios";

export const paymentService = {
  createRazorpayOrder: async (orderId) =>
    unwrap(await api.post("/payments/razorpay/create-order", { orderId })),
  verifyRazorpay: async (payload) =>
    unwrap(await api.post("/payments/razorpay/verify", payload)),
};
