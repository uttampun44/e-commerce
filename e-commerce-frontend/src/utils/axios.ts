import axios from "axios";

export const api = axios.create({
    baseURL: 'localhost:8080',
    timeout: 1000,
    withCredentials: true,
    headers: {
        'X-Custom-Header': 'foo',
        "Content-Type": 'application/json'
    }
})