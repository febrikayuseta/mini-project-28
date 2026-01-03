import axios from "axios";

const reqres = axios.create({
  baseURL: "https://reqres.in",
  headers: {
    "Content-Type": "application/json",
  },
});

export default reqres;