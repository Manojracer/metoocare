import API from "./api";
import { DoctorReview } from "./endpoints";

export const postDoctorreview = (data) => {
  return API.post(`${DoctorReview}/`, data);
};

export const allDoctorreviews = (data) => {
  return API.get(`${DoctorReview}/`, data);
};
