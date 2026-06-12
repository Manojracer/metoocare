import API from "./api";
import { Category } from "./endpoints";

export const getAllCategory = (data) => {
  return API.get(`${Category}`, data);
};
export const getSingleCategory = (data) => {
  return API.get(`${Category}/getSingleCategory`, { params: { _id: data } });
};
