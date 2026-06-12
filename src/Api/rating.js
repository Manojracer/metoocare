import API from "./api";
import { Rating } from "./endpoints";

export const ratingAllProduct = (data) => {
  return API.get(`${Rating}/`, data);
};
export const ratingUserProduct = (data) => {
  return API.post(`${Rating}/`, data);
};
