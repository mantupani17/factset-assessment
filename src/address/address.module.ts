import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, addressSchema } from '../models/address.model';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Address.name, schema: addressSchema}
    ], 'filter')
  ],
  providers: [AddressService],
  controllers: [AddressController]
})
export class AddressModule {}
