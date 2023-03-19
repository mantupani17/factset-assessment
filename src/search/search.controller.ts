import { Controller, Get, Req, Query } from '@nestjs/common';
import { ResponseI } from '../models/interfaces/response.interface';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService){}
    @Get()
    async searchPersonDetails(@Req() req, @Query() query): Promise<ResponseI> {
        const { from, to, status, zipCodes, addressIds } = query;        
        return this.searchService.search({ from, to, status, zipCodes, addressIds });
    }
}
