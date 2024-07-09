import { HomeBannerSlider, UserAuthStepInterFace } from "@/types/InterFace/PropInterFace";
import { FunctionComponent } from "react";

const { default: SignInOTP } = require("@/_component/Auth/Steps/SignIn/SignInOTP");
const { default: SignInPhoneNumber } = require("@/_component/Auth/Steps/SignIn/SignInPhoneNumber");
const { loginStepIndexUp } = require("./Logic");
const { default: SignUpStart } = require("@/_component/Auth/Steps/SignUp/SignUpStart");
const { default: SignUpOTP } = require("@/_component/Auth/Steps/SignUp/SignUpOTP");
const { default: EditPhoneNumber } = require("@/_component/Auth/Steps/SignUp/EditPhoneNumber");


let bannerSlider: HomeBannerSlider[] = [
    {
        image: `${process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL}/blood/bannerPromotion.jpg`,
        title: "Every drop donation creates a ripple of hope in the ocean of humanity. ",
        key: 1
    },
    {
        image: `${process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL}/fundRaisers/bannerPromotion.jpg`,
        title: "Every rupee donation creates a ripple of hope in the ocean of humanity. ",
        key: 2
    }
]

let loginSteps: FunctionComponent<UserAuthStepInterFace>[] = [
    SignInPhoneNumber,
    SignInOTP
]

let signUpSteps: FunctionComponent<UserAuthStepInterFace>[] = [
    SignUpStart,
    SignUpOTP,
    EditPhoneNumber
]

export { loginSteps, bannerSlider, signUpSteps }