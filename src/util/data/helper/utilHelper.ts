import { FundRaiserResponse } from "@/util/types/API Response/FundRaiser"
import const_data from "../const"
import LoadImage from '@/component/Util/ImageLoading'
import axios from "axios"

export function objectToUrlQuery(object) {
    let query = new URLSearchParams(object)
    return query.toString()
}

export function getCurrentPosition(successCB: Function, errorDB: Function): void {
    navigator.geolocation.getCurrentPosition((location) => {
        successCB(location)
    }, (err) => {
        errorDB(err)
    })
}

export function formatDateToMonthNameAndDate(date) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const d = new Date(date);
    const monthName = months[d.getMonth()];
    const day = d.getDate();
    return `${monthName} ${day}`;
}


export function getMainCategory(): string[] {
    return Object.keys(const_data.FUNDRAISER_CATEGORY)
}

export function getSubCategory(parentCategory): string[] {
    return const_data.FUNDRAISER_CATEGORY[parentCategory] ?? []
}

export function isUrgentFundRaiser(deadLine: Date) {
    const todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + 10);
    if (deadLine < todayDate) {
        return true
    } else {
        return false
    }
}

export function findNameAvatar(name: string) {

    let avatar = "";
    const split = name.split(" ");
    avatar = split[0].charAt(0)
    const charTwo = split[1] ? split[1].charAt(0) : ""
    if (charTwo) {
        avatar = avatar.concat(charTwo)
    }
    return avatar
}


export function generateFundRaiserTitle(profile: FundRaiserResponse): string {
    return `${profile.full_name}'s Fund Raiser for ${profile.category} in ${profile.district}`
}


export function downloadCertificate(url: string, title: string) {
    axios({ url: url, method: "GET", responseType: "blob" }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", title);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    });
}

export function messageFromBloodConcernce(name: string, concerns, meet_date: string, hospital_name: string) {
    try {
        let concernsMessage: string[] = [];

        if (concerns.seriousConditions.length) {
            concernsMessage.push(`I have serious conditions such as ${concerns.seriousConditions.join(", ")}`);
        }

        if (concerns.majorSurgeryOrIllness) {
            concernsMessage.push(`I had major surgery on ${concerns.majorSurgeryOrIllness}`);
        }

        if (concerns.tobaco_use) {
            concernsMessage.push(`I use tobacco`);
        }

        if (concerns.chronicIllnesses) {
            concernsMessage.push(`I have chronic illnesses like diabetes or hypertension`);
        }

        const concernsChat = concernsMessage.length
            ? `Please consider that I have the following concerns: ${concernsMessage.join(", ")}.`
            : '';

        const msg = `Hi ${name}, ${concernsChat} I would like to donate my blood to you. I'll come to ${hospital_name} by ${meet_date}.Please let me know if there’s anything else I should be aware of.`;
        return msg
    } catch (e) {
        return "Hai, I am ready to donate blood for you"
    }
}