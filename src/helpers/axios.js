import axios from 'axios'
const baseURL = process.env.REACT_APP_BASE_APP_URL
let headers ={};

if(localStorage.getItem("access_token")){
    headers.Authorization = "Bearer " + localStorage.getItem("access_token");
}

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
})

axiosInstance.interceptors.response.use(
    (response) => new Promise((resolve,reject) =>{
resolve(response);
}),
(error) => {
    if(!error.response){
        return  new Promise((resolve,reject) =>{
            reject(error);
            })
    }
}
)