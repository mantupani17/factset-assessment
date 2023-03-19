export interface PersonI {
    personId: String;
    gender: String;
    dob: Date; // YYYY-MM-DD
    dod?: String | Date; // YYYY-MM-DD
    name: NameI,
    addresses: AddressesI[]
};

export interface NameI {
    first: String;
    middle: String;
    last: String;
}

export interface AddressesI {
    from: String | Date; // YYYY-MM-DD
    to: String | Date; // YYYY-MM-DD, will be empty for current address
    addressId: String;
}