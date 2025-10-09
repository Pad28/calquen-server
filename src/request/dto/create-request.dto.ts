import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsUUID, MaxLength } from 'class-validator';
import { CLIENT_REQUEST_STATUS } from '@prisma/client';

export class CreateRequestDto {
    @ApiProperty({
        description: 'ID de la compañía',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID('4', { message: 'El company_id debe ser un UUID válido' })
    company_id: string;

    @ApiProperty({
        description: 'ID del usuario',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID('4', { message: 'El user_id debe ser un UUID válido' })
    user_id: string;

    @ApiProperty({
        description: 'ID del tipo de solicitud',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID('4', { message: 'El request_type_id debe ser un UUID válido' })
    request_type_id: string;

    @ApiProperty({
        description: 'Asunto de la solicitud',
        example: 'Solicitud de vacaciones'
    })
    @IsString({ message: 'El subject debe ser un string' })
    @MaxLength(255, { message: 'El subject no puede exceder 255 caracteres' })
    subject: string;

    @ApiProperty({
        description: 'Mensaje de la solicitud',
        example: 'Solicito vacaciones del 1 al 15 de enero'
    })
    @IsString({ message: 'El message debe ser un string' })
    message: string;

    @ApiProperty({
        description: 'Estado de la solicitud',
        enum: CLIENT_REQUEST_STATUS,
        example: 'PENDING',
        required: false
    })
    @IsEnum(CLIENT_REQUEST_STATUS, { message: 'El status debe ser un valor válido' })
    status?: CLIENT_REQUEST_STATUS;
}
