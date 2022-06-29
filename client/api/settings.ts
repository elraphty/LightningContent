import axios from "./axios";
import {SettingsFormValues} from "../interfaces";

export const getSettings = async () => {
  const res = await axios.get('/settings');
  return res;
};

export const updateSettings = async (data: SettingsFormValues) => {
  const res = await axios.put('/settings/update', data);
  return res;
};
