import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { PersonService } from '../person/person.service'
import { v4 as uuidv4 } from 'uuid';

const persons = [
    {
        personId: uuidv4(),
        gender: 'M',
        dob: new Date('1990-10-05'), // YYYY-MM-DD
        dod: '', // YYYY-MM-DD
        name: {
            first: 'PQRS',
            middle: '',
            last: 'xyz',
        },
        addresses: [
            {
                from: new Date('2007-01-01'), // YYYY-MM-DD
                to: new Date('2022-10-05'), // YYYY-MM-DD, will be empty for current address
                addressId: '44de4073-d575-4e40-b99a-df087212d117',
            },
            {
                from: new Date('2022-10-05'), // YYYY-MM-DD
                to: null, // YYYY-MM-DD, will be empty for current address
                addressId: '5c75c818-f183-4645-941c-a10e11632135',
            },
        ],
    },
    {
        personId: uuidv4(),
        gender: 'F',
        dob: new Date('1970-10-05'), // YYYY-MM-DD
        dod: new Date('2022-10-05'), // YYYY-MM-DD
        name: {
            first: 'PQR',
            middle: '',
            last: 'xyz',
        },
        addresses: [
            {
                from: new Date('1990-10-05'), // YYYY-MM-DD
                to: new Date('2007-01-01'), // YYYY-MM-DD, will be empty for current address
                addressId: '6a4f07f6-4ad1-44bc-9664-41e54766fce8',
            },

            {
                from: new Date('2007-01-01'), // YYYY-MM-DD
                to: new Date('2022-10-05'), // YYYY-MM-DD, will be empty for current address
                addressId: '6a4f07f6-4ad1-44bc-9664-41e54766fce8',
            },
        ],
    },
    {
        personId: uuidv4(),
        gender: 'M',
        dob: new Date('1951-10-05'), // YYYY-MM-DD
        dod: new Date('2000-01-05'), // YYYY-MM-DD
        name: {
            first: 'Anaconda',
            middle: '',
            last: 'xyz',
        },
        addresses: [
            {
                from: new Date('1951-10-05'), // YYYY-MM-DD
                to: new Date('2007-01-01'), // YYYY-MM-DD, will be empty for current address
                addressId: 'b76e2bea-4ccf-48e8-be8b-64443fd693a0',
            },
            {
                from: new Date('2007-01-01'), // YYYY-MM-DD
                to: new Date('2022-02-01'), // YYYY-MM-DD, will be empty for current address
                addressId: 'f0af9487-e165-450f-86bd-416834916fa2',
            },
            {
                from: new Date('2022-02-01'), // YYYY-MM-DD
                to: null, // YYYY-MM-DD, will be empty for current address
                addressId: 'de98f14e-59a7-4d5c-a238-249157eb7d7a',
            },
        ]
    }
]

@Injectable()
export class PersonSeed {
    constructor(
        private readonly perService: PersonService,
    ) { }
    @Command({ command: 'create:persons', describe: 'create multiple persons'})
    async create() {
        const user = await this.perService.createBulkPerson(persons);
        console.log(user);
    }
}