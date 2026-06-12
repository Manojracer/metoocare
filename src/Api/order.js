import API from "./api";
import { Order } from "./endpoints";

export const order = (data) => {
  return API.post(`${Order}/`, data);
};

export const orderId = (data) => {
  return API.get(`${Order}/`, data);
};

export const getSingleOrder = (data) => {
  return API.get(`${Order}/getSingleOrder`, { params: { _id: data } });
};
export const cancelandreturnOrder = (data) => {
  return API.put(`${Order}/cancelOrReturnOrder`, data);
};
export const trackOrder = (data) => {
  return API.get(`${Order}/`, data);
};
export const returnOrder = (data) => {
  return API.put(`${Order}/return`, data);
};
