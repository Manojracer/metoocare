import API from "./api";
import { AddToCart } from "./endpoints";

export const fetchSingleCart = (data) => {
  return API.get(`${AddToCart}/`, {
    params: {
      userId: data.userId,
    },
  });
};

export const PostProductCart = (data) => {
  return API.post(`${AddToCart}/`, data);
};

export const deleteproductcart = (data) => {
  return API.delete(`${AddToCart}/productdelete`, {
    data: {
      _id: data._id,
      productId: data.productId,
    },
  });
};
export const Allproductcart = (data) => {
  return API.get(`${AddToCart}/productdelete`, {
    data: {
      _id: data._id,
      productId: data.productId,
    },
  });
};

export const removeAllcartProducts = (data) => {
  return API.delete(`${AddToCart}/deletedAddToCart`, 
    {params:{
    _id: data._id
  }});
};
