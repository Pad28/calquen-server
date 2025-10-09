// Ejemplo de cómo usar el sistema de permisos en controllers

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PermissionGuard } from 'src/auth/guards/permission.guard';
import { RequirePermission } from 'src/auth/decorators/require-permission.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard, PermissionGuard)  // ← Aplica ambos guards globalmente
export class UserExampleController {
    constructor(private readonly userService: UserService) { }

    // ✅ Solo usuarios con permiso 'create' en módulo 'users'
    @RequirePermission('users', 'create')
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    // ✅ Solo usuarios con permiso 'read' en módulo 'users'
    @RequirePermission('users', 'read')
    @Get()
    async findAll(@Query() paginationDto: PaginationDto) {
        return this.userService.findAll(paginationDto);
    }

    // ✅ Solo usuarios con permiso 'read' en módulo 'users'
    @RequirePermission('users', 'read')
    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.userService.findOne(id);
    }

    // ✅ Solo usuarios con permiso 'update' en módulo 'users'
    @RequirePermission('users', 'update')
    @Patch(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    // ✅ Solo usuarios con permiso 'delete' en módulo 'users'
    @RequirePermission('users', 'delete')
    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.userService.remove(id);
    }
}

