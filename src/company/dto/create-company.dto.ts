import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';

//TODO: verfificar si esta bien el dto
export class CreateCompanyDto {
    @ApiProperty({
        description: 'Nombre de la empresa',
        example: 'Empresa ABC S.A.'
    })
    @IsString({ message: 'El nombre debe ser un string' })
    @MaxLength(255, { message: 'El nombre no puede exceder 255 caracteres' })
    name: string;

    @ApiProperty({
        description: 'Sector de negocio',
        example: 'Tecnología'
    })
    @IsString({ message: 'El sector de negocio debe ser un string' })
    @MaxLength(255, { message: 'El sector de negocio no puede exceder 255 caracteres' })
    business_sector: string;

    @ApiProperty({
        description: 'URL de la empresa',
        example: 'https://www.empresa.com'
    })
    @IsString({ message: 'La URL debe ser un string' })
    @MaxLength(255, { message: 'La URL no puede exceder 255 caracteres' })
    url: string;

    @ApiProperty({
        description: 'Frecuencia de facturación',
        example: 'Mensual'
    })
    @IsString({ message: 'La frecuencia de facturación debe ser un string' })
    @MaxLength(255, { message: 'La frecuencia de facturación no puede exceder 255 caracteres' })
    billing_frequency: string;

    @ApiProperty({
        description: 'Estado activo de la empresa',
        example: true,
        required: false
    })
    @IsOptional()
    @IsBoolean({ message: 'is_active debe ser un booleano' })
    is_active?: boolean;
}
