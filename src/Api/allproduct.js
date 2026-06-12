import API from "./api";
import { Product } from "./endpoints";

export const getAllProductProduct = (data) => {
  return API.get(`${Product}/getAllProductForWeb`, data);
};
