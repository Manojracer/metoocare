import API from "./api";
import { Contactus } from "./endpoints";

export const saveContact = (data) => {
  return API.post(`${Contactus}`, data);
};

export const getSingleUsers = (data) => {
  return API.get(`${Contactus}/getSingleUser`, data);
};
