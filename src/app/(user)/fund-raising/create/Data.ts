import { FundRaiseCreationBanner } from "@/types/InterFace/PropInterFace";
import { FunctionComponent } from "react";

const { default: AIDescription } = require("@/_component/FundRaiser/CreateSteps/AIDescription/AIDescription");
const { default: Address } = require("@/_component/FundRaiser/CreateSteps/Address/Address");
const { default: Basic } = require("@/_component/FundRaiser/CreateSteps/Basic/Basic");
const { default: FileUpload } = require("@/_component/FundRaiser/CreateSteps/FileUpload/FileUpload");
const { default: PersonalDetails } = require("@/_component/FundRaiser/CreateSteps/PersonalDetails/PersonalDetails");


let createFormSteps: FunctionComponent[] = [
    Basic,
    PersonalDetails,
    Address,
    FileUpload,
    AIDescription
]


let bannerData: FundRaiseCreationBanner[] = [
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
        subTitle: "The whole world are with you",
    }
]

// module.exports = { createFormSteps, bannerData }
export { createFormSteps, bannerData }