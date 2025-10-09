// Third-party imports
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';

// Local imports
import { RequestTypeService } from './request-type.service';
import { CreateRequestTypeDto } from './dto/create-request-type.dto';
import { UpdateRequestTypeDto } from './dto/update-request-type.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('request-type')
export class RequestTypeController {
    constructor(private readonly requestTypeService: RequestTypeService) { }

    @Post()
    create(@Body() createRequestTypeDto: CreateRequestTypeDto) {
        return this.requestTypeService.create(createRequestTypeDto);
    }

    @Get()
    async findAll(
        @Query() paginationDto: PaginationDto
    ) {
        return this.requestTypeService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.requestTypeService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateRequestTypeDto: UpdateRequestTypeDto
    ) {
        return this.requestTypeService.update(id, updateRequestTypeDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.requestTypeService.remove(id);
    }
}

