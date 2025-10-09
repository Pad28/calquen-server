// Third-party imports
import { Injectable } from '@nestjs/common';

// Local imports
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationHelper } from 'src/common/helpers/pagination.helper';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    return this.prisma.safePrismaCall(this.prisma.role.create({ data: createRoleDto }));
  }

  async findAll(paginationDto: PaginationDto) {
    const selectOptions: Prisma.roleSelect = {
      id: true,
      name: true,
      description: true,
      created_at: true,
      updated_at: true,
    };

    return PaginationHelper.paginateWithSelect(
      this.prisma.role,
      selectOptions,
      paginationDto,
      '/role',
      this.prisma
    );
  }

  findOne(id: string) {
    return this.prisma.safePrismaCall(this.prisma.role.findUnique({
      where: { id },
    }));
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.prisma.safePrismaCall(this.prisma.role.update({ where: { id }, data: updateRoleDto }));
  }

  remove(id: string) {
    return this.prisma.safePrismaCall(this.prisma.role.delete({ where: { id } }));
  }
}
