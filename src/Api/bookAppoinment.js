import API from "./api";
import { Appointment } from "./endpoints";

export const bookDoctorAppointment = (data) => {
  return API.post(`${Appointment}/bookAppointment`, data);
};

export const MyAppointmentLists = (data) => {
  return API.get(`${Appointment}/getUserAppointments`, data);
};

export const getAllAppointments = (data) => {
  return API.get(`${Appointment}/`, data);
};
