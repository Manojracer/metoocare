import API from "./api";
import { Invoice } from "./endpoints";

export const getInvoiceNumber = (data) => {
  return API.post(`${Invoice}/getInvoiceNumber`, data);
};

export const getSingleInvoice = (data) => {
  return API.get(`${Invoice}/getInvoiceNumber`, data);
};
