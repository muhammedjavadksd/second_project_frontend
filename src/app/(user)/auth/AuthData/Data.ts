import SignInOTP from "@/component/Auth/Steps/SignIn/SignInOTP";
import SignInPhoneNumber from "@/component/Auth/Steps/SignIn/SignInPhoneNumber";
import AddPhoneNumber from "@/component/Auth/Steps/SignUp/AddPhoneNumber";
import EditPhoneNumber from "@/component/Auth/Steps/SignUp/EditPhoneNumber";
import SignUpOTP from "@/component/Auth/Steps/SignUp/SignUpOTP";
import SignUpStart from "@/component/Auth/Steps/SignUp/SignUpStart";
import { HomeBannerSlider, UserAuthStepInterFace } from "@/util/types/InterFace/PropInterFace";
import { FunctionComponent } from "react";

// const { default: SignInOTP } = require("@/component/Auth/Steps/SignIn/SignInOTP");
// const { default: SignInPhoneNumber } = require("@/component/Auth/Steps/SignIn/SignInPhoneNumber");
// const { default: SignUpStart } = require("@/component/Auth/Steps/SignUp/SignUpStart");
// const { default: SignUpOTP } = require("@/component/Auth/Steps/SignUp/SignUpOTP");
// const { default: EditPhoneNumber } = require("@/component/Auth/Steps/SignUp/EditPhoneNumber");


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
    EditPhoneNumber,
]

export { loginSteps, bannerSlider, signUpSteps }