import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, MaxLength, MinLength } from 'class-validator';

export class CreateRequestTypeDto {
    @ApiProperty({
        description: 'Nombre del tipo de solicitud',
        example: 'Solicitud de Vacaciones'
    })
    @IsString({ message: 'El name debe ser un string' })
    @MinLength(2, { message: 'El name debe tener al menos 2 caracteres' })
    @MaxLength(255, { message: 'El name no puede exceder 255 caracteres' })
    name: string;

    @ApiProperty({
        description: 'Descripción del tipo de solicitud',
        example: 'Solicitud para pedir días de vacaciones'
    })
    @IsString({ message: 'La description debe ser un string' })
    @MaxLength(255, { message: 'La description no puede exceder 255 caracteres' })
    description: string;

    @ApiProperty({
        description: 'Estado activo del tipo de solicitud',
        example: true
    })
    @IsBoolean({ message: 'El is_active debe ser un booleano' })
    is_active: boolean;
}

