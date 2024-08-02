import axios, { InternalAxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const LoginAxiosInstance = axios.create({
    baseURL: "http://localhost:8080",

});



    LoginAxiosInstance.interceptors.request.use(


        async (config: InternalAxiosRequestConfig<any>) => {
    
            return config;
        }
        ,
        (error) => {
            return Promise.reject(error);
        });
    
    LoginAxiosInstance.interceptors.response.use(
       
        response => {
            if (response.status === 200) {
                sessionStorage.setItem("token", response.data);
                window.location.href='/home';
    
            }
            return response;
        },
        error => {
             alert("Pogrešni kredencijali, pokušajte ponovo!")
            return Promise.reject(error);
        }
    );
    

export default LoginAxiosInstance;


