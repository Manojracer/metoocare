import API from "./api";
import { Carousel } from "./endpoints";
 
export const getAllCarousel = (data) => {
  return API.get(`${Carousel}/`, data);
};
