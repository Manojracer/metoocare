import API from "./api";
import { Product } from "./endpoints";

export const saveProduct = (data) => {
  return API.post(`${Product}/`, data);
};
export const getAllproduct = (data) => {
  return API.get(`${Product}/`, data);
};

export const getAllProduct = (data) => {
  return API.get(`${Product}/getAllProductForWeb`, data);
};

export const getSingleProduct = (data) => {
  return API.get(`${Product}/getSingleProduct`, { params: { _id: data } });
};
export const getFilterProduct = (data) => {
  return API.put(`${Product}/getFilterProductForWeb`, data);
};

export const updateProduct = (data) => {
  return API.put(`${Product}/`, data);
};

export const deleteProduct = (data) => {
  return API.delete(`${Product}`, { params: { _id: data } });
};
export const getAllProductProduct = (data) => {
  return API.delete(`${Product}/getAllProductForWeb`, data);
};
export const ratingProduct = (data) => {
  return API.post(`${Product}/productRating`, data);
};

export const decreaseProductQuantity = (data) => {
  return API.post(`${Product}/decreaseProductQuantity`, data);
};
