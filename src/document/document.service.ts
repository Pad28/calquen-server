// Third-party imports
import { Injectable } from '@nestjs/common';

// Local imports
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationHelper } from 'src/common/helpers/pagination.helper';
import { Prisma } from '@prisma/client';

@Injectable()
export class DocumentService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createDocumentDto: CreateDocumentDto) {
    return this.prisma.safePrismaCall(this.prisma.rh_document.create({ data: createDocumentDto }));
  }

  async findAll(paginationDto: PaginationDto) {
    const selectOptions: Prisma.rh_documentSelect = {
      id: true,
      name: true,
      company_id: true,
      category_id: true,
      user_id: true,
      type: true,
      size: true,
      company: {
        select: {
          id: true,
          name: true,
        }
      },
      user: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
        }
      }
    };

    return PaginationHelper.paginateWithSelect(
      this.prisma.rh_document,
      selectOptions,
      paginationDto,
      '/document',
      this.prisma
    );
  }

  findOne(id: string) {
    return this.prisma.safePrismaCall(this.prisma.rh_document.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
          }
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          }
        }
      }
    }));
  }

  update(id: string, updateDocumentDto: UpdateDocumentDto) {
    return this.prisma.safePrismaCall(this.prisma.rh_document.update({ where: { id }, data: updateDocumentDto }));
  }

  remove(id: string) {
    return this.prisma.safePrismaCall(this.prisma.rh_document.delete({ where: { id } }));
  }
}
