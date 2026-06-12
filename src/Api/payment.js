import API from "./api";
import { Payment } from "./endpoints";

export const payment = (data) => {
  return API.post(`${Payment}/payment`,  data );
};

export const verify = (data) => {
  return API.get(`${Payment}/verify`,  { params: { orderId: data }} );
};

export const updatePayment =(data) => {
   return API.put(`${Payment}/updateOrderPaymentStatus`,  data );
}