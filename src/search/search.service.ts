import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseI } from 'src/models/interfaces/response.interface';
import { Person, PersonDocument } from '../models/person.model';

@Injectable()
export class SearchService {
    constructor(@InjectModel(Person.name, 'filter') private personModel: Model<PersonDocument>){}

    async search(query):Promise<any> {
        const matchQuery = {};
        let initialMatch = {};
        // Filtering zip code
        if (query?.zipCodes) {
            const tmpZipCodes = query?.zipCodes.split(',');
            matchQuery["addresses_people"] = { "$elemMatch" : { "zipCode" : { $in: tmpZipCodes } }}
        }

        // Filtering by address id's
        if (query?.addressIds) {
            const tmpAids = query?.addressIds.split(',');
            matchQuery["addresses_people"] = { "$elemMatch" : { "addressId" : { $in: tmpAids } } }
        }

        // Filtering with dead 
        if (query?.status && query?.status == 'dead') {
            matchQuery["dod"] = { "$ne" : null } 
        } else if (query?.status && query?.status == 'living') {
            matchQuery["dod"] = { "$eq" : null } 
        }

        // Filtering with From and To Date 
        // from shoould be > 1950-01-01
        // to always > from
        if ( query?.from && query?.to ) {
            const expFromDate = new Date('1950-01-01')
            const fromDate = new Date(query?.from);
            const toDate = new Date(query?.to)
            toDate.setHours(24,0,0)
            fromDate.setHours(0,0,0)
            if ( fromDate.getTime() >= expFromDate.getTime() ){
                if (toDate.getTime() > fromDate.getTime()){ 

                    initialMatch = {
                        'addresses.from' : { $gte: fromDate },
                        'addresses.to'  : { $lt: toDate}
                    }

                }
            }
        }
        
        return this.personModel.aggregate( [
            { $match : initialMatch },
            { $unwind : { path: "$addresses" } }, 
            { $lookup: { from: 'addresses', localField: 'addresses.addressId', foreignField: 'addressId', as: 'addresses_people' } },
            { $match: matchQuery },
            { $project : { 
                personId: 1,
                firstName : "$name.first",
                lastName : "$name.last",
                isAlive: { $cond: { if: "$dod", then: false, else: true }},
                age: { $dateDiff: { startDate: "$dob", endDate: { $cond: { if:"$dod", then: "$dod", else: "$$NOW" }}, unit: "year" } },
                addresses: {
                    addressId: "$addresses.addressId",
                    zipCode: "$addresses_people.zipCode",
                    street: "$addresses_people.street",
                    isCurrent: { $cond: { if: { $eq: ["$addresses.to", ""] }, then: true, else: false }}
                }
            } },
            {
                $group: {
                    "_id": "$personId",
                    "personId" : {$first:"$personId"},
                    "firstName" : {$first:"$firstName"},
                    "lastName" : {$first:"$lastName"},
                    "isAlive" : {$first: "$isAlive"},
                    "age": {$first: "$age"},
                    "addresses" : {$push: "$addresses"}
                }
            } 
        ])
    }
}
