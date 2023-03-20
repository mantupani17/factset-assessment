import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { AddressesI, NameI } from "./interfaces/person.interface";

export type PersonDocument = HydratedDocument<Person>;

@Schema()
export class Person {
    @Prop({required: true, type: String, unique: true, index:true})
    personId: string;

    @Prop({type: String, required: true})
    gender: string;

    @Prop({type: Date, required: true, index:true})
    dob: Date;

    @Prop({ type: Date, index:true })
    dod: Date;

    @Prop({type: Object})
    name: NameI;

    @Prop({type: Array<AddressesI>})
    addresses: AddressesI[]
}

export const personSchema = SchemaFactory.createForClass(Person);
