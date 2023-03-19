import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, personSchema } from '../models/person.model';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: Person.name, schema: personSchema}
    ], 'filter')
  ],
  controllers: [PersonController],
  providers: [PersonService]
})
export class PersonModule {}
