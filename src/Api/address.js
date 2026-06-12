import API from "./api";
import { Profile } from "./endpoints";

export const saveAddress = (data) => {
  return API.post(`${Profile}/userProfile`, data);
};
