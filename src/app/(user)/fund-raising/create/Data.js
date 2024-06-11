// const { default: Address } = require("@/_component/FundRaiser/CreateSteps/Address");
const { default: AddressTwo } = require("@/_component/FundRaiser/CreateSteps/AddressTwo");
const { default: Basic } = require("@/_component/FundRaiser/CreateSteps/Basic/Basic");
// const { default: Basic } = require("@/_component/FundRaiser/CreateSteps/Basic");
const { default: DescriptionCreator } = require("@/_component/FundRaiser/CreateSteps/DescriptionCreator");
const { default: Document } = require("@/_component/FundRaiser/CreateSteps/Document");
const { default: PersonalDetails } = require("@/_component/FundRaiser/CreateSteps/PersonalDetails/PersonalDetails");


let createFormSteps = [
    Basic,
    PersonalDetails,
    AddressTwo,
    Document,
    DescriptionCreator
]


let bannerData = [
    {
        image: process.env.PUBLIC_IMAGE_URL + "/fundRaisers/promo/promo1.jpg",
        title: "Thousands Are Raising Funds Online On Life Link",
        subTitle: "Don't worry, we will do it"
    },
    {
        image: process.env.PUBLIC_IMAGE_URL + "/fundRaisers/promo/promo1.jpg",
        title: "We have 500+ success cases in the last 1 year",
        subTitle: "Super people won't ignore you"
    },
    {
        image: process.env.PUBLIC_IMAGE_URL + "/fundRaisers/promo/promo1.jpg",
        title: "Stay calm, we are with you, we will do it",
        subTitle: "The whole world are with you"
    },
    {
        image: process.env.PUBLIC_IMAGE_URL + "/fundRaisers/promo/promo1.jpg",
        title: "Stay calm, we are with you, we will do it",
        subTitle: "The whole world are with you"
    },
    {
        image: process.env.PUBLIC_IMAGE_URL + "/fundRaisers/promo/promo1.jpg",
        title: "Stay calm, we are with you, we will do it",
        subTitle: "The whole world are with you"
    }
]

module.exports = { createFormSteps, bannerData }