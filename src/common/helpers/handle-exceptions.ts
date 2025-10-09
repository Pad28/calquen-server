// Third-party imports
import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    UnauthorizedException
} from "@nestjs/common";
import { Prisma } from "@prisma/client";


const logger = new Logger('ExceptionHandler');

/**
 * Maneja excepciones de Prisma y otras excepciones de base de datos
 * @param error - El error a manejar
 * @param context - Contexto adicional para el logging (opcional)
 * @throws Nunca retorna, siempre lanza una excepción
 */
export const handleExceptions = (error: any, context?: string): never => {
    const errorContext = context ? ` [${context}]` : '';

    // Manejo de errores conocidos de Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        handlePrismaKnownError(error, errorContext);
    }

    // Manejo de errores de validación de Prisma
    if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException('Invalid data provided. Please check your input.');
    }

    // Manejo de errores de conexión de Prisma
    if (error instanceof Prisma.PrismaClientInitializationError) {
        logger.error(`Database initialization error${errorContext}: ${error.message}`);
        throw new InternalServerErrorException('Database connection failed. Please try again later.');
    }

    // Manejo de otros errores de Prisma
    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        logger.error(`Unknown Prisma error${errorContext}: ${error.message}`);
        throw new InternalServerErrorException('An unexpected database error occurred.');
    }

    // Manejo de errores no relacionados con Prisma
    logger.error(`Unexpected error${errorContext}:`, error instanceof Error ? error.stack : error);
    throw new InternalServerErrorException('An unexpected error occurred. Please try again later.');
};

/**
 * Maneja errores conocidos específicos de Prisma
 * @param error - Error conocido de Prisma
 * @param context - Contexto adicional para logging
 */
function handlePrismaKnownError(error: Prisma.PrismaClientKnownRequestError, context: string): never {
    const meta = error.meta;

    const errorHandlers: Record<string, (error: Prisma.PrismaClientKnownRequestError) => never> = {
        // Violación de restricción única
        'P2002': (error) => {
            const target = Array.isArray(meta?.target) ? meta.target.join(', ') : meta?.target;
            throw new ConflictException(`The ${target} already exists. Please use a different value.`);
        },

        // Violación de clave foránea
        'P2003': (error) => {
            const field = meta?.field_name || meta?.constraint;
            throw new BadRequestException(`The referenced ${field} does not exist.`);
        },

        // Registro no encontrado
        'P2025': (error) => {
            const cause = meta?.cause || 'Record not found';
            throw new NotFoundException(cause);
        },

        // Operación fallida debido a un conflicto
        'P2024': (error) => {
            throw new ConflictException('The operation failed due to a conflict. Please try again.');
        },

        // Timeout de transacción
        'P2028': (error) => {
            throw new InternalServerErrorException('The operation timed out. Please try again.');
        },

        // Error de conexión
        'P1001': (error) => {
            logger.error(`Database connection error${context}`);
            throw new InternalServerErrorException('Cannot connect to database. Please try again later.');
        },

        // Base de datos no encontrada
        'P1003': (error) => {
            logger.error(`Database not found${context}`);
            throw new InternalServerErrorException('Database not found. Please contact support.');
        },

        // Credenciales inválidas
        'P1017': (error) => {
            logger.error(`Invalid database credentials${context}`);
            throw new UnauthorizedException('Database authentication failed.');
        },

        // Servidor no disponible
        'P1018': (error) => {
            logger.error(`Database server unavailable${context}`);
            throw new InternalServerErrorException('Database server is temporarily unavailable.');
        },

        // Valor demasiado largo
        'P2000': (error) => {
            throw new BadRequestException('The provided value is too long.');
        },

        // Registro no encontrado (alternativo)
        'P2001': (error) => {
            throw new NotFoundException('The requested record was not found.');
        },

        // Restricción de relación
        'P2004': (error) => {
            throw new BadRequestException('The operation violates a relation constraint.');
        },

        // Error de permisos
        'P2007': (error) => {
            throw new ForbiddenException('Insufficient database permissions.');
        },

        // Error de transacción
        'P2008': (error) => {
            throw new InternalServerErrorException('Transaction failed.');
        },

        // Error de consulta
        'P2009': (error) => {
            throw new InternalServerErrorException('Query execution failed.');
        },

        // Error de validación
        'P2010': (error) => {
            throw new BadRequestException('Data validation failed.');
        },

        // Error de restricción
        'P2011': (error) => {
            throw new BadRequestException('Constraint violation.');
        },

        // Error de relación
        'P2012': (error) => {
            throw new BadRequestException('Relation error.');
        }
    };

    const handler = errorHandlers[error.code];
    if (handler) {
        handler(error);
    } else {
        logger.error(`Unhandled Prisma error${context}:`, {
            code: error.code,
            message: error.message,
            meta: error.meta
        });
        throw new InternalServerErrorException('An unexpected database error occurred. Please try again later.');
    }

    throw new InternalServerErrorException('Unreachable code reached');
}