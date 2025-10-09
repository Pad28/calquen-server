// Third-party imports
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';

// Local imports
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('bank')
export class BankController {
    constructor(private readonly bankService: BankService) { }

    @Post()
    create(@Body() createBankDto: CreateBankDto) {
        return this.bankService.create(createBankDto);
    }

    @Get()
    async findAll(
        @Query() paginationDto: PaginationDto
    ) {
        return this.bankService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.bankService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateBankDto: UpdateBankDto
    ) {
        return this.bankService.update(id, updateBankDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.bankService.remove(id);
    }
}

