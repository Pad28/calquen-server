// Third-party imports
import { Injectable } from '@nestjs/common';

// Local imports
import { CreateDocumentCategoryDto } from './dto/create-document-category.dto';
import { UpdateDocumentCategoryDto } from './dto/update-document-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationHelper } from 'src/common/helpers/pagination.helper';
import { Prisma } from '@prisma/client';

@Injectable()
export class DocumentCategoryService {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(createDocumentCategoryDto: CreateDocumentCategoryDto) {
        return this.prisma.safePrismaCall(this.prisma.document_category.create({ data: createDocumentCategoryDto }));
    }

    async findAll(paginationDto: PaginationDto) {
        const selectOptions: Prisma.document_categorySelect = {
            id: true,
            name: true,
            is_active: true,
            created_at: true,
            updated_at: true,
        };

        return PaginationHelper.paginateWithSelect(
            this.prisma.document_category,
            selectOptions,
            paginationDto,
            '/document-category',
            this.prisma
        );
    }

    findOne(id: string) {
        return this.prisma.safePrismaCall(this.prisma.document_category.findUnique({
            where: { id },
        }));
    }

    update(id: string, updateDocumentCategoryDto: UpdateDocumentCategoryDto) {
        return this.prisma.safePrismaCall(this.prisma.document_category.update({ where: { id }, data: updateDocumentCategoryDto }));
    }

    remove(id: string) {
        return this.prisma.safePrismaCall(this.prisma.document_category.update({ where: { id }, data: { is_active: false } }));
    }
}

