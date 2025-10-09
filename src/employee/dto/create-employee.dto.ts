import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsUUID, MaxLength, Min, IsDecimal } from 'class-validator';
import { CONTRACT_TYPE, AFP_TYPE, HEALTHCARE_SYSTEM } from '@prisma/client';

export class CreateEmployeeDto {
    @ApiProperty({
        description: 'ID de la compañía',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID('4', { message: 'El company_id debe ser un UUID válido' })
    company_id: string;

    @ApiProperty({
        description: 'Dirección del empleado',
        example: 'Av. Principal 123, Santiago'
    })
    @IsString({ message: 'El address debe ser un string' })
    @MaxLength(255, { message: 'El address no puede exceder 255 caracteres' })
    address: string;

    @ApiProperty({
        description: 'Tipo de contrato',
        enum: CONTRACT_TYPE,
        example: 'INDEFINIDO'
    })
    @IsEnum(CONTRACT_TYPE, { message: 'El type_of_contract debe ser un valor válido' })
    type_of_contract: CONTRACT_TYPE;

    @ApiProperty({
        description: 'Asignaciones del empleado',
        example: 'Desarrollador Senior'
    })
    @IsString({ message: 'Las assignments deben ser un string' })
    @MaxLength(255, { message: 'Las assignments no pueden exceder 255 caracteres' })
    assignments: string;

    @ApiProperty({
        description: 'Salario neto',
        example: 1500000
    })
    @IsDecimal({ decimal_digits: '2' }, { message: 'El net_salary debe ser un número decimal válido' })
    net_salary: number;

    @ApiProperty({
        description: 'Tipo de AFP',
        enum: AFP_TYPE,
        example: 'AFP_CAPITAL'
    })
    @IsEnum(AFP_TYPE, { message: 'El afp debe ser un valor válido' })
    afp: AFP_TYPE;

    @ApiProperty({
        description: 'Número de cargas familiares',
        example: 2
    })
    @IsNumber({}, { message: 'family_burdens debe ser un número' })
    @Min(0, { message: 'family_burdens debe ser mayor o igual a 0' })
    family_burdens: number;

    @ApiProperty({
        description: 'Sistema de salud',
        enum: HEALTHCARE_SYSTEM,
        example: 'FONASA'
    })
    @IsEnum(HEALTHCARE_SYSTEM, { message: 'El sistema_salud debe ser un valor válido' })
    sistema_salud: HEALTHCARE_SYSTEM;

    @ApiProperty({
        description: 'ID del banco',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID('4', { message: 'El bank_id debe ser un UUID válido' })
    bank_id: string;

    @ApiProperty({
        description: 'Tipo de cuenta bancaria',
        example: 'Cuenta Corriente'
    })
    @IsString({ message: 'El account_type debe ser un string' })
    @MaxLength(255, { message: 'El account_type no puede exceder 255 caracteres' })
    account_type: string;

    @ApiProperty({
        description: 'Número de cuenta bancaria',
        example: '1234567890'
    })
    @IsString({ message: 'El account_number debe ser un string' })
    @MaxLength(255, { message: 'El account_number no puede exceder 255 caracteres' })
    account_number: string;

    @ApiProperty({
        description: 'ID del usuario',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID('4', { message: 'El user_id debe ser un UUID válido' })
    user_id: string;
}
