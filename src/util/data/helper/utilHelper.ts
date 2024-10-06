import { FundRaiserResponse } from "@/util/types/API Response/FundRaiser"
import const_data from "../const"
import LoadImage from '@/component/Util/ImageLoading'
import axios from "axios"
import { confirmAlert } from "react-confirm-alert"


export function closeFundRaiserText(name) {
    return `Close ${name} fund raiser's post`
}


export function createFundRaiserWhatsappMessage(profile: FundRaiserResponse, shareLink: string) {

    const {
        full_name,
        amount,
        collected,
        category,
        deadline,
        city,
        district,
        state,
        about,
        documents,
        picture
    } = profile;

    const formattedDeadline = new Date(deadline).toLocaleDateString();

    const message = `
    ${profile.description}
    
    🌟 *Support Education: Fundraiser for School Supplies!* 📚
    
    Hi everyone! I'm reaching out to share an important cause that needs our support.
    
    *About the Fundraiser:*
    - *Organizer:* ${full_name}
    - *Category:* ${category}
    - *Goal Amount:* ₹${amount}
    - *Current Amount Collected:* ₹${collected}
    - *Deadline:* ${formattedDeadline}
    
    *Location:*
    - *City:* ${city}
    - *District:* ${district}
    - *State:* ${state}
    
    This initiative aims to provide essential school supplies to those in need. Every contribution, big or small, makes a difference!
    
    🔗 [Join the cause and donate now!](${shareLink})
    
    *Documents for Reference:*
    ${documents.map(doc => `- [Document](${doc})`).join('\n')}
    
    *Pictures of the Initiative:*
    ${picture.map(pic => `- ![Picture](${pic})`).join('\n')}
    
    For more details, feel free to contact me or reply to this message!
    
    Let's make a difference together! 🙌
    `;



    const whatsappMessage = encodeURIComponent(message);
    return `https://wa.me/?text=${whatsappMessage}`;
}

export function generateBloodRequest(units, hospitalName, deadline) {
    return `Urgent request for ${units} units with in ${deadline}  at ${hospitalName}. Could you come overthere and donate your blood. Thank you.`;
}


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
        'Jan', 'Feb', 'March', 'April', 'May', 'June',
        'July', 'August', 'Sept', 'Octbr', 'Nov', 'Dec'
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


export async function downloadCertificate(url: string, title: string) {
    try {
        const response = await axios({ url, method: "GET", responseType: "blob" })
        const donwloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = donwloadUrl;
        link.setAttribute("download", title);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        return true
    } catch (e) {
        return false
    }
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