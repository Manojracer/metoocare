import API from "./api";
import { Testimonials } from "./endpoints";

export const getAllTestimonial = (data) => {
  return API.get(`${Testimonials}/`, data);
};
