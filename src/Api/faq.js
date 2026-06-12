import API from "./api";
import { Askquestion } from "./endpoints";

export const askquestion = (data) => {
  return API.post(`${Askquestion}/`, data);
};

export const getAllUserQuestion = (data) => {
  return API.get(`${Askquestion}/getAllQuestions`, data);
};
