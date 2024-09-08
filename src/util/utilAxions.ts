import axios from "axios";

export const jsonApi = axios.create({
  baseURL: 'https://express-todolist-len.vercel.app/',
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

