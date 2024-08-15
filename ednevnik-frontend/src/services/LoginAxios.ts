import axios, { InternalAxiosRequestConfig } from "axios";
import { jwtDecode } from "jwt-decode";
import { RoleEnum } from "../enums/RoleEnum";

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
                const decodedToken = jwtDecode(response.data);
                const role = JSON.parse(JSON.stringify(decodedToken)).role;
                if(role===RoleEnum.ADMIN.toString()){
                    window.location.href='/showAllUsers'
                }else if(role===RoleEnum.PROFESSOR.toString()){
                    window.location.href='/showProfessorsClasses'
                }else if(role===RoleEnum.PARENT.toString()){
                    window.location.href='/home'
                }else if(role===RoleEnum.STAFF.toString()){
                    window.location.href='/classes'
                }
            }
            return response;
        },
        error => {
             alert("Pogrešni kredencijali, pokušajte ponovo!")
            return Promise.reject(error);
        }
    );
    

export default LoginAxiosInstance;


