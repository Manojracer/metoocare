import API from "./api";
import { Signup } from "./endpoints";

export const signup = (data) => {
  return API.post(`${Signup}/`, data);
};

export const getsingleuser = (data) => {
  return API.get(`${Signup}/getsingleUser`, { params: { _id: data } });
};

export const getallusers = (data) => {
  return API.get(`${Signup}/`, data);
};

export const getProfileDetails = (data) => {
  return API.get(`${Signup}/getProfileDetails`, { params: { _id: data } });
};

export const updateUser = (data) => {
  return API.put(`${Signup}`, data);
};
