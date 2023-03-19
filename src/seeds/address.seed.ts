const addresses = [
    {
        "addressId": "b76e2bea-4ccf-48e8-be8b-64443fd693a0",
        "zipCode": "787878",
        "street": "A"
    },
    {
        "addressId": "aac73516-55d7-4603-b0e8-9d40f9881255",
        "zipCode": "787878",
        "street": "AA"
    },
    {
        "addressId": "9a91f876-9f9b-4799-b7e1-6b59c81e9f2f",
        "zipCode": "787878",
        "street": "AB"
    },
    {
        "addressId": "31ee5c90-c8f4-4a3f-bcaf-749362bfa435",
        "zipCode": "787876",
        "street": "B"
    },
    {
        "addressId": "5c75c818-f183-4645-941c-a10e11632135",
        "zipCode": "787876",
        "street": "BA"
    },
    {
        "addressId": "44de4073-d575-4e40-b99a-df087212d117",
        "zipCode": "787876",
        "street": "BB"
    },
    {
        "addressId": "6a4f07f6-4ad1-44bc-9664-41e54766fce8",
        "zipCode": "787875",
        "street": "C"
    },
    {
        "addressId": "f0af9487-e165-450f-86bd-416834916fa2",
        "zipCode": "787875",
        "street": "CA"
    },
    {
        "addressId": "de98f14e-59a7-4d5c-a238-249157eb7d7a",
        "zipCode": "787875",
        "street": "CB"
    }
]

import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AddressService } from '../address/address.service';

@Injectable()
export class AddressSeed {
    constructor(
        private readonly addService: AddressService,
    ) { }
    @Command({ command: 'create:persons', describe: 'create multiple persons'})
    async create() {
        const user = await this.addService.createAddresses(addresses);
        console.log(user);
    }
}