// Third-party imports
import { Injectable } from '@nestjs/common';

// Local imports
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationHelper } from 'src/common/helpers/pagination.helper';

@Injectable()
export class CompanyService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createCompanyDto: CreateCompanyDto) {
    return this.prisma.safePrismaCall(this.prisma.company.create({
      data: createCompanyDto as any
    }));
  }

  async findAll(paginationDto: PaginationDto) {
    const selectOptions = {
      id: true,
      name: true,
      business_sector: true,
      url: true,
      billing_frequency: true,
      is_active: true,
      created_at: true,
      updated_at: true,
      _count: {
        select: {
          client_request: true,
          company_employee: true,
          employee_requests: true,
          rh_document: true
        }
      }
    };

    return PaginationHelper.paginateWithSelect(
      this.prisma.company,
      selectOptions,
      paginationDto,
      '/company',
      this.prisma
    );
  }

  findOne(id: string) {
    return this.prisma.safePrismaCall(this.prisma.company.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            client_request: true,
            company_employee: true,
            employee_requests: true,
            rh_document: true
          }
        }
      }
    }));
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.safePrismaCall(this.prisma.company.update({ where: { id }, data: updateCompanyDto }));
  }

  remove(id: string) {
    return this.prisma.safePrismaCall(this.prisma.company.update({ where: { id }, data: { is_active: false } }));
  }
}
