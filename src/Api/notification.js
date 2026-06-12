import API from "./api";
import { Notifications } from "./endpoints";

export const getAllNotification = (data) => {
  return API.get(`${Notifications}/`, data);
};

export const getFilterNotification = (data) => {
  return API.put(`${Notifications}/getFilterNotification`, data);
};
