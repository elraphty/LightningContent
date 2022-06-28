import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  axiosRequestInterceptor,
  axiosRequestErrorInterceptor
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  axiosResponseInterceptor,
  axiosResponseErrorInterceptor
);

export default axiosApiInstance;

export async function axiosRequestInterceptor(config: AxiosRequestConfig) {
  const accessToken = await localStorage.getItem("lighning-token");
  config.headers = {
    Authorization: `Bearer ${accessToken}`
  };
  return config;
}

export function axiosRequestErrorInterceptor(error: AxiosError) {
  Promise.reject(error);
}

export function axiosResponseInterceptor(response: AxiosResponse) {
  return response;
}

export async function axiosResponseErrorInterceptor(error: AxiosError) {
  if (error.response?.status === 403 || error.response?.status === 401) {
    localStorage.removeItem("lighning-token");
    window.location.href = "/login";
  }
  return Promise.reject(error);
}
