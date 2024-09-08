import axios from "axios";

export const jsonApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

