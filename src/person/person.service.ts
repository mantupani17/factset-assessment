import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonI } from '../models/interfaces/person.interface';
import { Person, PersonDocument } from '../models/person.model';

@Injectable()
export class PersonService {
    constructor(@InjectModel(Person.name, 'filter') private personModel: Model<PersonDocument>){}

    async createBulkPerson(persons:PersonI[]):Promise<PersonI[]> {
        return this.personModel.create(persons);
    }
}
