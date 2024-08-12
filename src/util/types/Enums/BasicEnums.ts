

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
export { FundRaiserTabItems, FundRaiserStatus, BloodGroup, SessionStorageKeys, BloodStatus, Relationship }