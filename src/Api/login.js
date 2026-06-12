import API from "./api";
import { Login } from "./endpoints";

export const Loginpanel = (data) => {
  return API.post(`${Login}/userLogin`, data);
};

export const verifyOTP = (data) => {
  return API.post(`${Login}/verifyGmailOtp`, data);
};

export const verifySignupOTP = (data) => {
  return API.post(`${Login}/verifyEmailOtp`, data);
};

export const resendOTP = (data) => {
  return API.post(`${Login}/userLogin`, data);
};
