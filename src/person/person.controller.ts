import { Controller, Post } from '@nestjs/common';

@Controller('person')
export class PersonController {
    @Post()
    createPersons(){}
}
