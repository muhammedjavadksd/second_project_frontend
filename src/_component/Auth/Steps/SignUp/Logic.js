import { blood_groups } from '@/app/const/const';
import * as yup from 'yup'

function signUpIndexUp(state)
{
    state((prev)=> prev+1)
}

function signUpIndexDown(state)
{
    state((prev)=> prev-1)
}


function onSignUpHandler(values)
{
    console.log(values);
}

let signUpValidator = yup.object().shape({
    first_name: yup.string("Please enter valid first name").required("First name is required"),
    last_name: yup.string("Please enter valid last name").required("Last name is required"),
    email_address: yup.string("Please enter valid email address").email("Please enter valid email address").required("Email address is required"),
    bloodGroup: yup.string("Please select valid blood group").oneOf(blood_groups,"Please select valid blood groups").required("Blood group is required"),
})

let signUpInitialValues = {
    first_name:null,
    last_name:null,
    email_address:null,
    bloodGroup:null,
}

module.exports={
    signUpIndexUp,
    signUpIndexDown,
    onSignUpHandler,
    signUpValidator,
    signUpInitialValues
}