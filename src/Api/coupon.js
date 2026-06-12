import API from "./api";
import { couponCode } from "./endpoints";

export const coupon = (data) => {
  return API.post(`${couponCode}/applyCoupon`, data);
};

export const getTodayCoupon = (data) => {
  return API.get(`${couponCode}/getCouponForCurrentDay`, data);
};
