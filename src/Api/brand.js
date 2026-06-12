import API from "./api";
import { Brand } from "./endpoints";

export const getAllBrands = (data) => {
  return API.get(`${Brand}/getallPanelProfile`, data);
};
