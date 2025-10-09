// Third-party imports
import { Injectable } from '@nestjs/common';

// Local imports
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationHelper } from 'src/common/helpers/pagination.helper';
import { Prisma } from '@prisma/client';

@Injectable()
export class RequestService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createRequestDto: CreateRequestDto) {
    return this.prisma.safePrismaCall(this.prisma.client_request.create({ data: createRequestDto }));
  }

  async findAll(paginationDto: PaginationDto) {
    const selectOptions: Prisma.client_requestSelect = {
      id: true,
      company_id: true,
      user_id: true,
      request_type_id: true,
      subject: true,
      message: true,
      status: true,
      created_at: true,
      updated_at: true,
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
      },
      request_type: {
        select: {
          id: true,
          name: true,
          description: true,
        }
      }
    };

    return PaginationHelper.paginateWithSelect(
      this.prisma.client_request,
      selectOptions,
      paginationDto,
      '/request',
      this.prisma
    );
  }

  findOne(id: string) {
    return this.prisma.safePrismaCall(this.prisma.client_request.findUnique({
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
        },
        request_type: {
          select: {
            id: true,
            name: true,
            description: true,
          }
        }
      }
    }));
  }

  update(id: string, updateRequestDto: UpdateRequestDto) {
    return this.prisma.safePrismaCall(this.prisma.client_request.update({ where: { id }, data: updateRequestDto }));
  }

  remove(id: string) {
    return this.prisma.safePrismaCall(this.prisma.client_request.delete({ where: { id } }));
  }
}
