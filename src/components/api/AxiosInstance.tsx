import axios from "axios"; 
const accessToken = localStorage.getItem('accessToken')
const AxiosInstance = axios.create({
  baseURL : process.env.REACT_APP_BACKEND_URL,
  headers: {
    Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    "Content-Type": "application/json",
  },
  timeout: 5000,
  // .. other options
});

export default AxiosInstance;