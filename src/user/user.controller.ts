// Third-party imports
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { UserService } from './user.service';

//local imports
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Query() paginationDto: PaginationDto
  ) {
    return this.userService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }

  // Endpoints para gestión de permisos por módulo

  @Get(':id/module-permissions')
  getUserModulePermissions(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserModulePermissions(id);
  }

  @Get(':id/module-permissions/summary')
  getUserPermissionSummary(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserPermissionSummary(id);
  }

  @Patch(':id/module-permissions/:moduleId')
  updateUserModulePermissions(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('moduleId', ParseUUIDPipe) moduleId: string,
    @Body() permissions: {
      can_create?: boolean;
      can_read?: boolean;
      can_update?: boolean;
      can_delete?: boolean;
      is_active?: boolean;
    }
  ) {
    return this.userService.updateUserModulePermissions(id, moduleId, permissions);
  }

  @Get(':id/module-permissions/:moduleId/:action')
  hasModulePermission(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('moduleId', ParseUUIDPipe) moduleId: string,
    @Param('action') action: 'create' | 'read' | 'update' | 'delete'
  ) {
    return this.userService.hasModulePermission(id, moduleId, action);
  }
}
