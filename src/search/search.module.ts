import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, addressSchema } from '../models/address.model';
import { Person, personSchema } from '../models/person.model';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name:Person.name, schema: personSchema},
      { name: Address.name, schema: addressSchema}
    ], 'filter')
  ],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
