import axios from "axios";

const api = axios.create({
    baseURL: "https://attendance-backend-0sk5.onrender.com/api"
});

export default api;