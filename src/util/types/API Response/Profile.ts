import { TicketChatFrom } from "../Enums/BasicEnums";


enum TicketPriority {
    Critical = 'Critical',
    High = 'High',
    Medium = 'Medium',
    Low = 'Low'
}

enum TicketCategory {
    BloodAccount = "Blood Account",
    FundRaiserAccount = "Fund Raiser Account",
    PaymentRelated = "Payment Related",
    Technical = "Technichal related",
    Other = "Other"
}

enum TicketStatus {
    Raised = "Raised",
    Closed = "Closed",
    ReOpened = "Reopen",
    Answered = "Answered",
}

interface ITicketChat {
    chat_id: string,
    from: TicketChatFrom,
    text: string,
    created_at: Date,
    attachment: string,
}

interface ProfileTicket {
    ticket_id: string,
    profile_id: string,
    title: string,
    priority: TicketPriority,
    category: TicketCategory,
    status: TicketStatus,
    created_at: Date,
    updated_at: Date,
    chats: ITicketChat[]
}

interface IChatMessageDetails {
    last_message: string,
    last_message_from: string
    unseen_message_count: number
}

interface IChatTemplate {
    chat_id: string,
    profile_one: string,
    profile_two: string,
    chat_started: Date,
    blocked: {
        status: boolean,
        blocked_from?: string
    },
    messages: IChatMessageDetails
}


export interface ChatPerson {
    first_name: string;
    last_name: string;
    profile_id: string;
    __v: number;
    blood_donor_id: string;
}

export interface Message {
    last_message: string;
    last_message_from: string;
    unseen_message_count: number;
}

export interface BlockedStatus {
    status: boolean;
}

export interface ChatHistory {
    _id?: string;
    room_id: string;
    timeline: Date;
    msg: string;
    seen: boolean;
    is_block: boolean;
    profile_id: string;
}

export interface ChatProfile {
    chat_id: string;
    chat_started: string;
    messages: Message;
    blocked: BlockedStatus;
    __v: number;
    chat_profile_id: string;
    chat_person: ChatPerson;
    chat_history: ChatHistory[];
}

export type { ProfileTicket, IChatTemplate }