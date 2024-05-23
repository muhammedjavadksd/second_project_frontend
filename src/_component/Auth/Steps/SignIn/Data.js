
import { ERROR_MSG } from '@/app/const/const'
import * as yup from 'yup'

export let loginValidation = yup.object().shape({
    phone: yup.number("Please enter valid phone number").required("Phone number is required").test("len",ERROR_MSG.PHONE_NUMBER_VALIDATION,(val)=> val.toString().length==10)
})

export let onLoginSubmit = function (){
    fetch("/api/auth/login_cred", {
        method:"POST"
    }).then(async (data)=>{
        console.log(data);
        let dt= await data.json();
        console.log(dt);
    }).catch((err)=>{
        console.log(err);
    })
    // alert("Form has been submited")
}

export let loginInitValues = {
    phone: null
}

