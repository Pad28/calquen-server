// Third-party imports
import { Injectable } from '@nestjs/common';

// Local imports
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationHelper } from 'src/common/helpers/pagination.helper';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeeService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.safePrismaCall(this.prisma.employee.create({ data: createEmployeeDto }));
  }

  async findAll(paginationDto: PaginationDto) {
    const selectOptions: Prisma.employeeSelect = {
      id: true,
      company_id: true,
      address: true,
      type_of_contract: true,
      assignments: true,
      net_salary: true,
      afp: true,
      family_burdens: true,
      sistema_salud: true,
      bank_id: true,
      account_type: true,
      account_number: true,
      user_id: true,
      created_at: true,
      updated_at: true,
      user: {
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          rut: true,
        }
      },
      _count: {
        select: {
          company_employee: true,
          employee_requests: true
        }
      }
    };

    return PaginationHelper.paginateWithSelect(
      this.prisma.employee,
      selectOptions,
      paginationDto,
      '/employee',
      this.prisma
    );
  }

  findOne(id: string) {
    return this.prisma.safePrismaCall(this.prisma.employee.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            rut: true,
            phone: true,
          }
        },
        _count: {
          select: {
            company_employee: true,
            employee_requests: true
          }
        }
      }
    }));
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.prisma.safePrismaCall(this.prisma.employee.update({ where: { id }, data: updateEmployeeDto }));
  }

  remove(id: string) {
    return this.prisma.safePrismaCall(this.prisma.employee.delete({ where: { id } }));
  }
}
