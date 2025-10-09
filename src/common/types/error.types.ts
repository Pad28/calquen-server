/**
 * Tipos de error personalizados para la aplicación
 */

/**
 * Códigos de error de Prisma más comunes
 */
export enum PrismaErrorCodes {
    // Errores de validación
    VALUE_TOO_LONG = 'P2000',
    RECORD_NOT_FOUND = 'P2001',
    UNIQUE_CONSTRAINT_VIOLATION = 'P2002',
    FOREIGN_KEY_CONSTRAINT_VIOLATION = 'P2003',
    RELATION_CONSTRAINT_VIOLATION = 'P2004',

    // Errores de conexión
    DATABASE_CONNECTION_ERROR = 'P1001',
    DATABASE_NOT_FOUND = 'P1003',
    INVALID_CREDENTIALS = 'P1017',
    SERVER_UNAVAILABLE = 'P1018',

    // Errores de operación
    OPERATION_CONFLICT = 'P2024',
    RECORD_NOT_FOUND_OPERATION = 'P2025',
    TRANSACTION_TIMEOUT = 'P2028',

    // Errores de permisos
    PERMISSION_ERROR = 'P2007',

    // Errores de transacción
    TRANSACTION_ERROR = 'P2008',

    // Errores de consulta
    QUERY_ERROR = 'P2009',

    // Errores de validación de datos
    VALIDATION_ERROR = 'P2010',
    CONSTRAINT_ERROR = 'P2011',
    RELATION_ERROR = 'P2012'
}

/**
 * Tipos de error HTTP correspondientes
 */
export enum HttpErrorTypes {
    BAD_REQUEST = 'BadRequestException',
    UNAUTHORIZED = 'UnauthorizedException',
    FORBIDDEN = 'ForbiddenException',
    NOT_FOUND = 'NotFoundException',
    CONFLICT = 'ConflictException',
    INTERNAL_SERVER_ERROR = 'InternalServerErrorException'
}

/**
 * Interfaz para metadatos de error de Prisma
 */
export interface PrismaErrorMeta {
    target?: string | string[];
    field_name?: string;
    constraint?: string;
    cause?: string;
    model_name?: string;
    relation_name?: string;
}

/**
 * Interfaz para errores personalizados de la aplicación
 */
export interface AppError {
    code: string;
    message: string;
    context?: string;
    timestamp: Date;
    stack?: string;
}

/**
 * Configuración de mapeo de errores de Prisma a HTTP
 */
export interface ErrorMapping {
    prismaCode: PrismaErrorCodes;
    httpError: HttpErrorTypes;
    message: string;
    logLevel: 'error' | 'warn' | 'info';
}

