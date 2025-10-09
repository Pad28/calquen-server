// Third-party imports
import { Injectable } from '@nestjs/common';

// Local imports
import { CreateRequestTypeDto } from './dto/create-request-type.dto';
import { UpdateRequestTypeDto } from './dto/update-request-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationHelper } from 'src/common/helpers/pagination.helper';
import { Prisma } from '@prisma/client';

@Injectable()
export class RequestTypeService {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(createRequestTypeDto: CreateRequestTypeDto) {
        return this.prisma.safePrismaCall(this.prisma.request_type.create({ data: createRequestTypeDto }));
    }

    async findAll(paginationDto: PaginationDto) {
        const selectOptions: Prisma.request_typeSelect = {
            id: true,
            name: true,
            description: true,
            is_active: true,
            created_at: true,
            updated_at: true,
            _count: {
                select: {
                    client_request: true
                }
            }
        };

        return PaginationHelper.paginateWithSelect(
            this.prisma.request_type,
            selectOptions,
            paginationDto,
            '/request-type',
            this.prisma
        );
    }

    findOne(id: string) {
        return this.prisma.safePrismaCall(this.prisma.request_type.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        client_request: true
                    }
                }
            }
        }));
    }

    update(id: string, updateRequestTypeDto: UpdateRequestTypeDto) {
        return this.prisma.safePrismaCall(this.prisma.request_type.update({ where: { id }, data: updateRequestTypeDto }));
    }

    remove(id: string) {
        return this.prisma.safePrismaCall(this.prisma.request_type.update({ where: { id }, data: { is_active: false } }));
    }
}

