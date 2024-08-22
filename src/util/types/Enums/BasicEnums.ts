

enum FundRaiserTabItems {
    ABOUT,
    DOCUMENT,
    UPDATE,
    COMMENT
}

enum SessionStorageKeys {
    BloodRequestFormPhase = "BloodRequestFormPhase"
}

enum Relationship {
    MYSELF = "Myself",
    FATHER = "Father",
    MOTHER = "Mother",
    BROTHER = "Brother",
    SISTER = "Sister",
    CHILD = "Child",
    FRIEND = "Friend",
    NEIGHBOR = "Neighbor",
    COWORKER = "Co-worker",
    RELATIVE = "Relative",
    GRANDFATHER = "Grandfather",
    GRANDMOTHER = "Grandmother",
    UNCLE = "Uncle",
    AUNT = "Aunt",
    NIECE = "Niece",
    NEPHEW = "Nephew",
    COUSIN = "Cousin",
    PARTNER = "Partner",
    SPOUSE = "Spouse",
    INLAW = "In-law"
}


enum AdminCreateFundRaiserStatus {
    INITIATED = "INITIATED",
    APPROVED = "APPROVED",
    HOLD = "HOLD",
    CLOSED = "CLOSED"
}

enum FundRaiserStatus {
    CREATED = "CREATED",
    INITIATED = "INITIATED",
    APPROVED = "APPROVED",
    HOLD = "HOLD",
    REJECTED = "REJECTED",
    CLOSED = "CLOSED"
}

enum BloodGroup {
    A_POSITIVE = "A+",
    A_NEGATIVE = "A-",
    B_POSITIVE = "B+",
    B_NEGATIVE = "B-",
    AB_POSITIVE = "AB+",
    AB_NEGATIVE = "AB-",
    O_POSITIVE = "O+",
    O_NEGATIVE = "O-"
}


enum BloodStatus {
    Pending = 'pending',
    Cancelled = "cancelled",
    Completed = "completed"
}

enum StatusCode {
    OK = 200,
    CREATED = 201,
    UNAUTHORIZED = 401,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
    FORBIDDEN = 403,
    CONFLICT = 409,
}


enum TableFilterByDate {
    AllTime = "All time",
    OneMonth = "1 Month",
    SixMonth = "6 Month",
    OneYear = "1 Year",
}

enum FundRaiserFileType {
    Document = "Document",
    Pictures = "Pictures"
}

enum TicketPriority {
    Critical = 'Critical',
    High = 'High',
    Medium = 'Medium',
    Low = 'Low'
}


enum ChatFrom {
    Donor = "Donor",
    Patient = "Patient"
}

enum TicketCategory {
    BloodAccount = "Blood Account",
    FundRaiserAccount = "Fund Raiser Account",
    PaymentRelated = "Payment Related",
    Technical = "Technichal related",
    Other = "Other"
}

export { ChatFrom, TicketCategory, TicketPriority, TableFilterByDate, AdminCreateFundRaiserStatus, FundRaiserFileType, FundRaiserTabItems, FundRaiserStatus, BloodGroup, SessionStorageKeys, BloodStatus, Relationship, StatusCode }