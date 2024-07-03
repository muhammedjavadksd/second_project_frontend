const { default: SignInOTP } = require("@/_component/Auth/Steps/SignIn/SignInOTP");
const { default: SignInPhoneNumber } = require("@/_component/Auth/Steps/SignIn/SignInPhoneNumber");
const { loginStepIndexUp } = require("./Logic");
const { default: SignUpStart } = require("@/_component/Auth/Steps/SignUp/SignUpStart");
const { default: SignUpOTP } = require("@/_component/Auth/Steps/SignUp/SignUpOTP");
const { default: EditPhoneNumber } = require("@/_component/Auth/Steps/SignUp/EditPhoneNumber");

let bannerSlider = [
    {
        image: `${process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL}/blood/bannerPromotion.jpg`,
        title: "Every drop donation creates a ripple of hope in the ocean of humanity. "
    },
    {
        image: `${process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL}/fundRaisers/bannerPromotion.jpg`,
        title: "Every rupee donation creates a ripple of hope in the ocean of humanity. "
    }
]

let loginSteps = [
    SignInPhoneNumber,
    SignInOTP
]

let signUpSteps = [
    SignUpStart,
    SignUpOTP,
    EditPhoneNumber
]

module.exports = { bannerSlider, loginSteps, signUpSteps };