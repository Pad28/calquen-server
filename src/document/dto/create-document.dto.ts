import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MaxLength, IsDecimal } from 'class-validator';

export class CreateDocumentDto {
    @ApiProperty({
        description: 'Nombre del documento',
        example: 'Contrato de Trabajo.pdf'
    })
    @IsString({ message: 'El name debe ser un string' })
    @MaxLength(255, { message: 'El name no puede exceder 255 caracteres' })
    name: string;

    @ApiProperty({
        description: 'ID de la compañía',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID('4', { message: 'El company_id debe ser un UUID válido' })
    company_id: string;

    @ApiProperty({
        description: 'ID de la categoría del documento',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID('4', { message: 'El category_id debe ser un UUID válido' })
    category_id: string;

    @ApiProperty({
        description: 'ID del usuario',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID('4', { message: 'El user_id debe ser un UUID válido' })
    user_id: string;

    @ApiProperty({
        description: 'Tipo de archivo',
        example: 'application/pdf'
    })
    @IsString({ message: 'El type debe ser un string' })
    @MaxLength(255, { message: 'El type no puede exceder 255 caracteres' })
    type: string;

    @ApiProperty({
        description: 'Tamaño del archivo en bytes',
        example: 1024.50
    })
    @IsDecimal({ decimal_digits: '2' }, { message: 'El size debe ser un número decimal válido' })
    size: number;
}
