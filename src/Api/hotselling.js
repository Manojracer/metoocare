import API from "./api";
import { Product } from "./endpoints";

export const HotSelling = (data) => {
  return API.get(`${Product}/hotSelling`, data);
};

export const HotSellingWeb = (data) => {
  return API.get(`${Product}/hotSellingForWeb`, data);
};
