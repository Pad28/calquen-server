import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsIn } from 'class-validator';

export class CreateClientDto {
    // Company Information
    @IsNotEmpty({ message: 'El nombre de la empresa es requerido' })
    @IsString()
    companyName: string;

    @IsNotEmpty({ message: 'El RUT de la empresa es requerido' })
    @IsString()
    companyRut: string;

    @IsNotEmpty({ message: 'El sector empresarial es requerido' })
    @IsString()
    businessSector: string;

    @IsOptional()
    @IsString()
    website?: string;

    @IsNotEmpty({ message: 'El teléfono de la empresa es requerido' })
    @IsString()
    companyPhone: string;

    @IsNotEmpty({ message: 'La frecuencia de facturación es requerida' })
    @IsIn(['daily', 'weekly', 'monthly', 'quarterly', 'yearly'], {
        message: 'La frecuencia de facturación no es válida'
    })
    billingFrequency: string;

    // User Information
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString()
    firstName: string;

    @IsNotEmpty({ message: 'El apellido es requerido' })
    @IsString()
    lastName: string;

    @IsNotEmpty({ message: 'El RUT del usuario es requerido' })
    @IsString()
    userRut: string;

    @IsNotEmpty({ message: 'El teléfono del usuario es requerido' })
    @IsString()
    userPhone: string;

    @IsEmail({}, { message: 'Email inválido' })
    @IsNotEmpty({ message: 'El email es requerido' })
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password?: string;
}

