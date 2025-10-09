import { ApiProperty } from '@nestjs/swagger';
import { ROLE_NAME } from '@prisma/client';
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRoleDto {
    @ApiProperty({
        description: 'Nombre del rol',
        example: 'Administrador'
    })
    @IsString({ message: 'El name debe ser un string' })
    @MinLength(2, { message: 'El name debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El name no puede exceder 255 caracteres' })
    name: string;

    @ApiProperty({
        description: 'Descripción del rol',
        example: 'Rol con permisos de administración completa del sistema'
    })
    @IsString({ message: 'La description debe ser un string' })
    @MaxLength(255, { message: 'La description no puede exceder 255 caracteres' })
    description: string;

    @ApiProperty({
        description: 'Nombre del rol',
        example: 'ADMIN'
    })
    @IsEnum(ROLE_NAME, { message: `El role_name debe ser un ${Object.keys(ROLE_NAME)}` })
    role_name: ROLE_NAME;
}
