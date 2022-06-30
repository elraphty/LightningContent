import axios from "./axios";
import {ProfileFormValues} from "../interfaces";

export const getDetails = async () => {
  const res = await axios.get('/user/details');
  return res;
};

export const updateDetails = async (data: ProfileFormValues) => {
  const res = await axios.put('/user/details', data);
  return res;
};