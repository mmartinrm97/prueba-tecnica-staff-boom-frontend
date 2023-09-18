import axios from 'axios';


const authApi = axios.create({
    baseURL: "http://prueba-tecnica-staff-boom-backend.test/api",
    // withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';


export default authApi;