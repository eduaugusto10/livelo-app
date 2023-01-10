import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/api",
    //baseURL: "http://localhost:5000/api",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',

    }
})

export default api