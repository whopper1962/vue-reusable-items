import Axios from "axios";
import { onRequest } from "@/libs/axios/intercepters/onRequest";
import { onResponse } from "@/libs/axios/intercepters/onResponse";
import { onErrorResponse } from "@/libs/axios/intercepters/onErrorResponse";

export const axios = Axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}/api`,
  responseType: "json",
  timeout: 30000,
});

axios.interceptors.request.use(onRequest);
axios.interceptors.response.use(onResponse, onErrorResponse);
