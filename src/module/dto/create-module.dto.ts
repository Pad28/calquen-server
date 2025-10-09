import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, MaxLength, MinLength, Matches } from 'class-validator';

export class CreateModuleDto {
    @ApiProperty({
        description: 'Código único del módulo (snake_case)',
        example: 'user_management'
    })
    @IsString({ message: 'El code debe ser un string' })
    @MinLength(2, { message: 'El code debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El code no puede exceder 50 caracteres' })
    @Matches(/^[a-z_]+$/, { message: 'El code debe estar en snake_case (solo letras minúsculas y guiones bajos)' })
    code: string;

    @ApiProperty({
        description: 'Nombre del módulo',
        example: 'Gestión de Usuarios'
    })
    @IsString({ message: 'El name debe ser un string' })
    @MinLength(2, { message: 'El name debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El name no puede exceder 50 caracteres' })
    name: string;

    @ApiProperty({
        description: 'Descripción del módulo',
        example: 'Módulo para administrar usuarios del sistema'
    })
    @IsString({ message: 'La description debe ser un string' })
    @MaxLength(255, { message: 'La description no puede exceder 255 caracteres' })
    description: string;

    @ApiProperty({
        description: 'Estado activo del módulo',
        example: true
    })
    @IsBoolean({ message: 'El is_active debe ser un booleano' })
    is_active: boolean;
}
