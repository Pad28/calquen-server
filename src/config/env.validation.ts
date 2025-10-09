import { plainToInstance } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, validateSync } from "class-validator";

export enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

export interface EnvVariables {
    NODE_ENV: Environment;
    PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN?: string;
}

class EnvironmentConfig {
    @IsEnum(Environment)
    NODE_ENV: Environment = Environment.Development;

    @IsNumber()
    @Max(65535)
    @IsNotEmpty()
    PORT: number;

    @IsString()
    @IsNotEmpty()
    DATABASE_URL: string;

    @IsString()
    @IsNotEmpty()
    JWT_SECRET: string;

    @IsOptional()
    @IsString()
    JWT_EXPIRES_IN?: string;
}

export const validate = (config: Record<string, unknown>) => {
    const validatedConfig = plainToInstance(
        EnvironmentConfig,
        config,
        { enableImplicitConversion: true }
    );
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}