import API from "./api";
import { Doctor } from "./endpoints";

export const getAllDoctor = (data) => {
  return API.get(`${Doctor}/`, data);
};

export const getSingleDoctor = (data) => {
  return API.get(`${Doctor}/getSingleDoctor`, { params: { _id: data } });
};

export const getDoctorProfile = (data) => {
  return API.get(`${Doctor}/getProfileDetails`, { params: { _id: data } });
};

export const getSampleDoctor = (data) => {
  return API.get(`${Doctor}/getAllDoctorProfile`, data);
};
