import API from "./api";
import { Product } from "./endpoints";

export const fetchSingleProduct = (data) => {
  return API.get(`${Product}/getSingleProduct`, { params: { _id: data } });
};
