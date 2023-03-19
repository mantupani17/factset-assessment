import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
    @Prop({required: true, type: String, unique: true, index:true })
    addressId: string;

    @Prop({ required:true, type: String })
    zipCode: string;

    @Prop({required:true, type: String})
    street: string;
}

export const addressSchema = SchemaFactory.createForClass(Address);
