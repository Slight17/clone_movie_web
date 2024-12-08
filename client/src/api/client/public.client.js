import axios from 'axios';
import queryString from 'queryString';

const rootURL = "htpp://127.0.0.1:5000/api/v1/";

const publicClient = axios.create({
    rootURL: rootURL,
    paramsSerializer: { encode: params => queryString.stringify(params) }
})


privateClient.interceptors.request(async config =>{
    return{
        ...config,
        headers: {
            "Content-Type": "application/json"
        }
    }
})

privateClient.interceptors.response.use((response) =>{
    if (response && response.data) return response.data;
    return response;   
},(err) => {throw err.response.data });

export default publicClient;