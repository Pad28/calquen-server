import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        description: 'Email del usuario',
        example: 'usuario@ejemplo.com'
    })
    @IsEmail({}, { message: 'Debe ser un email válido' })
    @MaxLength(255, { message: 'El email no puede exceder 255 caracteres' })
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'MiContraseña123!',
        minLength: 8
    })
    @IsString({ message: 'La contraseña debe ser un string' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(255, { message: 'La contraseña no puede exceder 255 caracteres' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
        message: 'La contraseña debe contener al menos una minúscula, una mayúscula, un número y un carácter especial'
    })
    password: string;

    @ApiProperty({
        description: 'RUT del usuario',
        example: '12345678-9'
    })
    @IsString({ message: 'El RUT debe ser un string' })
    @MaxLength(15, { message: 'El RUT no puede exceder 15 caracteres' })
    @Matches(/^[0-9]+-[0-9kK]$/, { message: 'El RUT debe tener formato válido (12345678-9)' })
    rut: string;

    @ApiProperty({
        description: 'Primer nombre del usuario',
        example: 'Juan'
    })
    @IsString({ message: 'El primer nombre debe ser un string' })
    @MaxLength(100, { message: 'El primer nombre no puede exceder 100 caracteres' })
    first_name: string;

    @ApiProperty({
        description: 'Apellido del usuario',
        example: 'Pérez'
    })
    @IsString({ message: 'El apellido debe ser un string' })
    @MaxLength(100, { message: 'El apellido no puede exceder 100 caracteres' })
    last_name: string;

    @ApiProperty({
        description: 'Teléfono del usuario',
        example: '+56912345678'
    })
    @IsString({ message: 'El teléfono debe ser un string' })
    @MaxLength(20, { message: 'El teléfono no puede exceder 20 caracteres' })
    phone: string;

    @ApiProperty({
        description: 'ID del rol del usuario',
        example: 'uuid-del-rol'
    })
    @IsUUID('4', { message: 'El role_id debe ser un UUID válido' })
    role_id: string;
}
