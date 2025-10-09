import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, MaxLength, MinLength } from 'class-validator';

export class CreateDocumentCategoryDto {
    @ApiProperty({
        description: 'Nombre de la categoría',
        example: 'Contratos'
    })
    @IsString({ message: 'El name debe ser un string' })
    @MinLength(2, { message: 'El name debe tener al menos 2 caracteres' })
    @MaxLength(255, { message: 'El name no puede exceder 255 caracteres' })
    name: string;

    @ApiProperty({
        description: 'Estado activo de la categoría',
        example: true
    })
    @IsBoolean({ message: 'El is_active debe ser un booleano' })
    is_active: boolean;
}

