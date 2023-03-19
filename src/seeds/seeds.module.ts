import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
// import { PersonModule } from '../person/person.module';
// import { AddressModule } from '../address/address.module';
import { AddressSeed } from './address.seed';
import { PersonSeed } from './person.seed';
import { AddressService } from '../address/address.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, addressSchema } from '../models/address.model';
import { PersonService } from '../person/person.service';
import { Person, personSchema } from '../models/person.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Address.name, schema: addressSchema},
            { name: Person.name, schema: personSchema}
        ], 'filter'),
        CommandModule
    ],
    providers: [ AddressService, PersonService, AddressSeed, PersonSeed ],
    exports: [AddressSeed, PersonSeed],
})
export class SeedsModule {
    
}
