import { AxiosError } from "axios";

export const axiosErrorOutput = (error: AxiosError,title:string) => {
    console.log(`====${title}====`);
    if (error.response) {                   
        console.log('==error==');
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
    console.log(error.config);
}