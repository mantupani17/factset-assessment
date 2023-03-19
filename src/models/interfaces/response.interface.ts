export interface ResponseI  {
    personId: String,
    firstName: String,
    lastName: String,
    age: Number,
    isAlive: Boolean,
    addresses: ResponseAddressesI[]
}

export interface ResponseAddressesI {
    addressId: String;
    zipCode: Number;
    street: String;
    isCurrent: Boolean;
}