// Third-party imports
import { Injectable } from '@nestjs/common';

// Local imports
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationHelper } from 'src/common/helpers/pagination.helper';

@Injectable()
export class ModuleService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createModuleDto: CreateModuleDto) {
    return this.prisma.safePrismaCall(this.prisma.module.create({ data: createModuleDto }));
  }

  async findAll(paginationDto: PaginationDto) {

    return PaginationHelper.paginate(
      this.prisma.module.findMany,
      this.prisma.module.count,
      paginationDto,
      '/module',
      this.prisma
    );
  }

  findOne(id: string) {
    return this.prisma.safePrismaCall(this.prisma.module.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            user_module_permission: true
          }
        }
      }
    }));
  }

  update(id: string, updateModuleDto: UpdateModuleDto) {
    return this.prisma.safePrismaCall(this.prisma.module.update({ where: { id }, data: updateModuleDto }));
  }

  remove(id: string) {
    return this.prisma.safePrismaCall(this.prisma.module.update({ where: { id }, data: { is_active: false } }));
  }
}
