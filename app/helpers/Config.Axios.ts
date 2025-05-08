import axios from "axios";

const exam = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": ["application/json;multipart/form-data;"],
  },
});

export { exam };
