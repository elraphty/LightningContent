import axios from "axios";
import {AuthFormValues} from "../interfaces";
import { BASE_URL } from ".";

axios.defaults.baseURL = BASE_URL;

export const loginUser = async (data: AuthFormValues) => {
  const res = await axios.post('/user/login', data);
  return res;
};

export const signupUser = async (data: AuthFormValues) => {
  const res = await axios.post('/user/register', data);
  return res;
};

export const lnurlLogin = async () => {
  const res = await axios.get('user/login-lnurl');
  return res;
};