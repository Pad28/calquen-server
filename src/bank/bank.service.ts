// Third-party imports
import { Injectable } from '@nestjs/common';

// Local imports
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationHelper } from 'src/common/helpers/pagination.helper';
import { Prisma } from '@prisma/client';

@Injectable()
export class BankService {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(createBankDto: CreateBankDto) {
        return this.prisma.safePrismaCall(this.prisma.bank.create({ data: createBankDto }));
    }

    async findAll(paginationDto: PaginationDto) {
        const selectOptions: Prisma.bankSelect = {
            id: true,
            name: true,
            code: true,
            is_active: true,
            created_at: true,
            updated_at: true,
        };

        return PaginationHelper.paginateWithSelect(
            this.prisma.bank,
            selectOptions,
            paginationDto,
            '/bank',
            this.prisma
        );
    }

    findOne(id: string) {
        return this.prisma.safePrismaCall(this.prisma.bank.findUnique({
            where: { id },
        }));
    }

    update(id: string, updateBankDto: UpdateBankDto) {
        return this.prisma.safePrismaCall(this.prisma.bank.update({ where: { id }, data: updateBankDto }));
    }

    remove(id: string) {
        return this.prisma.safePrismaCall(this.prisma.bank.update({ where: { id }, data: { is_active: false } }));
    }
}

