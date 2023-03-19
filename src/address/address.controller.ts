import { Body, Controller, Post } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {

    constructor(private readonly addressService: AddressService){}

    @Post('/create-bulk')
    createBulk(@Body() body){
        const { addresses } = body;
        return this.addressService.createAddresses(addresses);
    }
}
