// Third-party imports
import { Injectable } from '@nestjs/common';

// Local imports
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationHelper } from 'src/common/helpers/pagination.helper';
import { UserModulePermissionService } from './user-module-permission.service';

@Injectable()
export class UserService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly userModulePermissionService: UserModulePermissionService
  ) { }

  async create(createUserDto: CreateUserDto) {
    return this.prisma.safePrismaCall(this.prisma.user.create({ data: createUserDto }));
  }

  async findAll(paginationDto: PaginationDto) {
    const selectOptions = {
      id: true,
      email: true,
      is_active: true,
      rut: true,
      first_name: true,
      last_name: true,
      phone: true,
      role_id: true,
      created_at: true,
      updated_at: true,
      role: {
        select: {
          id: true,
          name: true,
          description: true
        }
      }
    };

    return PaginationHelper.paginateWithSelect(
      this.prisma.user,
      selectOptions,
      paginationDto,
      '/user',
      this.prisma
    );
  }

  findOne(id: string) {
    return this.prisma.safePrismaCall(this.prisma.user.findUnique({
      where: { id },
      include: {
        role: {
          select: {
            id: true,
            name: true,
            description: true
          }
        },
        user_module_permission: {
          include: {
            module: true
          }
        }
      }
    }));
  }

  findOneByEmail(email: string) {
    return this.prisma.safePrismaCall(this.prisma.user.findUnique({
      where: { email },
    }));
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.safePrismaCall(this.prisma.user.update({ where: { id }, data: updateUserDto }));
  }

  remove(id: string) {
    return this.prisma.safePrismaCall(this.prisma.user.update({ where: { id }, data: { is_active: false } }));
  }

  // Métodos para gestión de permisos por módulo

  /**
   * Obtiene los permisos de un usuario por módulo
   */
  async getUserModulePermissions(userId: string) {
    return this.userModulePermissionService.getUserModulePermissions(userId);
  }

  /**
   * Actualiza los permisos de un usuario para un módulo específico
   */
  async updateUserModulePermissions(userId: string, moduleId: string, permissions: {
    can_create?: boolean;
    can_read?: boolean;
    can_update?: boolean;
    can_delete?: boolean;
    is_active?: boolean;
  }) {
    return this.userModulePermissionService.upsertUserModulePermission(userId, moduleId, permissions);
  }

  /**
   * Verifica si un usuario tiene un permiso específico en un módulo
   */
  async hasModulePermission(userId: string, moduleId: string, action: 'create' | 'read' | 'update' | 'delete') {
    return this.userModulePermissionService.hasPermission(userId, moduleId, action);
  }

  /**
   * Obtiene el resumen de permisos de un usuario
   */
  async getUserPermissionSummary(userId: string) {
    return this.userModulePermissionService.getPermissionSummary(userId);
  }
}
