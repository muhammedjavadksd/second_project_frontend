
enum BloodGroupUpdateStatus {
    Pending = "pending",
    Completed = "completed",
    Rejected = "rejected"
}


enum PaymentVia {
    UPI = "QR",
    PAYTM = "PAYTM",
    Manual = "MANUAL"
}

enum CreateChatVia {
    DonorId = "donor-id",
    ProfileId = "profile_id"
}

enum BankAccountType {
    Saving = "saving",
    Current = "current",
}

enum FileAcceptType {
    BasicImage = "image/jpeg, image/jpg, image/png"
}

enum TicketStatus {
    Raised = "Raised",
    Closed = "Closed",
    ReOpened = "Reopen",
    Answered = "Answered",
}

enum FundRaiserTabItems {
    ABOUT,
    DOCUMENT,
    PAYEMENT_METHOD,
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

enum BloodDonorStatus {
    Open = "Open",
    Blocked = "Blocked",
    Deleted = "Deleted"
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

enum BloodCloseCategory {
    FULFILLED = "Fulfilled the request",
    MEDICAL_CONDITION_CHANGE = "Medical Condition Change",
    ERROR_IN_REQUEST = "Error in Request",
    POSTPONED = "Postponed",
    UNABLE_TO_ARRANGE_DONORS = "Unable to Arrange Donors",
    CHANGE_IN_TREATMENT_PLAN = "Change in Treatment Plan"
}
enum BloodDonationStatus {
    Approved = "Approved",
    NotResponded = "not-responded",
    Rejected = "Rejected",
    Pending = "Pending"
}

enum BloodStatus {
    Pending = 'pending',
    Closed = "closed",
    Approved = "approved",
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


enum BiddingProductUnit {
    Piece = "pcs",
    Kilogram = "kg",
    Gram = "g",
    Pound = "lb",
    Liter = "L",
    Milliliter = "mL",
    Gallon = "gal",
    Meter = "m",
    Centimeter = "cm",
    Inch = "in",
    SquareMeter = "m²",
    CubicMeter = "m³",
    Dozen = "dozen",
    Pack = "pk",
    Box = "box",
    Bottle = "bottle",
    Can = "can",
    Roll = "roll",
    Pair = "pair",
    Bundle = "bundle",
    Set = "set",
    Carton = "carton"
}


enum ProductTabItems {
    ProductDetails,
    WarrantyDetails,
    OtherDetails
}


enum TicketCategory {
    BloodAccount = "Blood Account",
    FundRaiserAccount = "Fund Raiser Account",
    PaymentRelated = "Payment Related",
    Technical = "Technichal related",
    Other = "Other"
}

enum TicketChatFrom {
    Admin = "Admin",
    User = "User"
}

enum FundRaiserEdit {
    Basic,
    Personal,
    Address,
    Bank,
    File,
    Description
}

export { TicketStatus, FileAcceptType, BloodDonationStatus, BloodCloseCategory, TicketChatFrom, ProductTabItems, BiddingProductUnit, TicketCategory, TicketPriority, TableFilterByDate, AdminCreateFundRaiserStatus, FundRaiserFileType, FundRaiserTabItems, FundRaiserStatus, BloodGroup, SessionStorageKeys, BloodStatus, Relationship, StatusCode, FundRaiserEdit, BankAccountType, CreateChatVia, BloodGroupUpdateStatus, BloodDonorStatus, PaymentVia }