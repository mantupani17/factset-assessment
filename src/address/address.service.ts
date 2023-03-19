import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddressI } from '../models/interfaces/address.interface';
import { Address, AddressDocument } from '../models/address.model';

@Injectable()
export class AddressService {
    constructor(@InjectModel(Address.name, 'filter') private addressModel: Model<AddressDocument>){}
    
    async createAddresses(addresses:AddressI[]):Promise<AddressI[]>{
        return this.addressModel.create(addresses);
    }
}
