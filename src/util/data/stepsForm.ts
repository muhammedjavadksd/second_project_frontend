import { FunctionComponent } from "react"
import { FundRaiseCreationBanner, HomeBannerSlider, UserAuthStepInterFace } from "../types/InterFace/PropInterFace"
import SignInPhoneNumber from "@/component/Auth/Steps/SignIn/SignInPhoneNumber"
import SignInOTP from "@/component/Auth/Steps/SignIn/SignInOTP"
import SignUpStart from "@/component/Auth/Steps/SignUp/SignUpStart"
import SignUpOTP from "@/component/Auth/Steps/SignUp/SignUpOTP"
import EditPhoneNumber from "@/component/Auth/Steps/SignUp/EditPhoneNumber"
import BloodPersonalDetails from "@/component/Blood/blood_request_form/PersonalDetails/PersonalDetails"
import BloodRequestDetails from "@/component/Blood/blood_request_form/BloodDetails/BloodDetails"
import Basic from "@/component/FundRaiser/CreateSteps/Basic/Basic"
import PersonalDetails from "@/component/FundRaiser/CreateSteps/PersonalDetails/PersonalDetails"
import Address from "@/component/FundRaiser/CreateSteps/Address/Address"
import FileUpload from "@/component/FundRaiser/CreateSteps/FileUpload/FileUpload"
import FundRaiserBankAccount from "@/component/FundRaiser/CreateSteps/BankAccount/fundRaiserBankAccount"
import AIDescription from "@/component/FundRaiser/CreateSteps/AIDescription/AIDescription"

interface RenderAuthStepsInterFace {
    index: number
}


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


function loginStepIndexUp(state: Function): void {
    state((prev) => prev + 1)
}

function loginStepDown(state: Function): void {
    state((prev) => prev - 1)
}



function RenderAuthSteps({ index }: RenderAuthStepsInterFace) {
    return loginSteps[index]
}

const requestBanner = [
    {
        image: `${process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL}/blood/request/1.png`,
        title: "Need Blood? We're Here to Help",
        sub_title: "Submit your request and we'll connect you with donors."
    },
    {
        image: `${process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL}/blood/request/2.png`,
        title: "We're Here for You",
        sub_title: "Request blood and find hope in our community."
    },
    {
        image: `${process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL}/blood/request/3.png`,
        title: "In Need of Blood? We're on Your Side",
        sub_title: "Let us assist you in finding the right donors."
    }
];


const BloodRequestStepByForm = [
    BloodPersonalDetails,
    BloodRequestDetails
]


function CreateFormComponent(index) {
    return BloodRequestStepByForm[index]
}

function createStepIndexUp(state: Function): void {
    state((prev) => prev + 1)
}

function createStepIndexDown(state: Function): void {
    state((prev) => prev - 1)
}

function CreateFundRaiseFormComponent(index: number): FunctionComponent {
    return createFormSteps[index]
}

let createFormSteps: FunctionComponent[] = [
    Basic,
    PersonalDetails,
    Address,
    FileUpload,
    FundRaiserBankAccount,
    AIDescription
]


let FundRaiserbannerData: FundRaiseCreationBanner[] = [
    {
        image: process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL + "/fundRaisers/promo/promo1.jpg",
        title: "Thousands Are Raising Funds Online On Life Link",
        subTitle: "Don't worry, we will do it"
    },
    {
        image: process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL + "/fundRaisers/promo/promo1.jpg",
        title: "We have 500+ success cases in the last 1 year",
        subTitle: "Super people won't ignore you"
    },
    {
        image: process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL + "/fundRaisers/promo/promo1.jpg",
        title: "Stay calm, we are with you, we will do it",
        subTitle: "The whole world are with you"
    },
    {
        image: process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL + "/fundRaisers/promo/promo1.jpg",
        title: "Stay calm, we are with you, we will do it",
        subTitle: "The whole world are with you"
    },
    {
        image: process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL + "/fundRaisers/promo/promo1.jpg",
        title: "Stay calm, we are with you, we will do it",
        subTitle: "The whole world are with you"
    },
    {
        image: process.env.NEXT_PUBLIC_PUBLIC_IMAGE_URL + "/fundRaisers/promo/promo1.jpg",
        title: "Stay calm, we are with you, we will do it",
        subTitle: "The whole world are with you",
    }
]



export {
    CreateFormComponent,
    createStepIndexDown,
    createStepIndexUp,
    CreateFundRaiseFormComponent
}

export { requestBanner, BloodRequestStepByForm, FundRaiserbannerData };
export default RenderAuthSteps
export { loginStepDown, loginStepIndexUp }
export { loginSteps, bannerSlider, signUpSteps }