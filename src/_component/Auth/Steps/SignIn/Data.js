
import { ERROR_MSG } from '@/app/const/const'
import axiosInstance from '@/external/axios/api_axios_instance';
import axios_instance from '@/external/axios/axios-instance';
import axios from 'axios';
import * as yup from 'yup'

export let loginValidation = yup.object().shape({
    phone: yup.number("Please enter valid phone number").required("Phone number is required").test("len",ERROR_MSG.PHONE_NUMBER_VALIDATION,(val)=> val.toString().length==10)
})

export let onLoginSubmit = function (values){
    
    let dataSignIn= {phone: values.phone}
    console.log("The data is" , dataSignIn);

    axios_instance.post("/api/auth/login_cred",dataSignIn).then(async (data)=>{
        console.log(data);
        let dt= await data.json();
        console.log(dt);
    }).catch((err)=>{
        console.log(err);
    })

    // axiosInstance.post("/api")
    //  fetch("/api/auth/login_cred", {
    //     method:"POST",
    //     body:{
    //         phone: values.phone
    //     }
    // }).then(async (data)=>{
    //     console.log(data);
    //     // let dt= await data.json();
    //     // console.log(dt);
    // }).catch((err)=>{
    //     console.log(err);
    // })
    // alert("Form has been submited")
}

export let loginInitValues = {
    phone: null
}




