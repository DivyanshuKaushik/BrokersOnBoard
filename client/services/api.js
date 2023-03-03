import axios from 'axios';

const api = axios.create({
    baseURL: "https://api-brokersonboard.up.railway.app/api",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;