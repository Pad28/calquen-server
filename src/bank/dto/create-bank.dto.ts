import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, MaxLength, MinLength } from 'class-validator';

export class CreateBankDto {
    @ApiProperty({
        description: 'Nombre del banco',
        example: 'Banco de Chile'
    })
    @IsString({ message: 'El name debe ser un string' })
    @MinLength(2, { message: 'El name debe tener al menos 2 caracteres' })
    @MaxLength(255, { message: 'El name no puede exceder 255 caracteres' })
    name: string;

    @ApiProperty({
        description: 'Código del banco',
        example: 'BCHI'
    })
    @IsString({ message: 'El code debe ser un string' })
    @MaxLength(255, { message: 'El code no puede exceder 255 caracteres' })
    code: string;

    @ApiProperty({
        description: 'Estado activo del banco',
        example: true
    })
    @IsBoolean({ message: 'El is_active debe ser un booleano' })
    is_active: boolean;
}

