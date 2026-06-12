import API from "./api";
import { Trackorder } from "./endpoints";

export const saveOrder = (data) => {
  return API.post(`${Trackorder}`, data);
};
