// Third-party imports
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Local imports
import { handleExceptions } from '../common/helpers/handle-exceptions';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name);

    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log('Database connected successfully');
        } catch (error) {
            this.logger.error('Failed to connect to database', error);
            throw error;
        }
    }

    async onModuleDestroy() {
        try {
            await this.$disconnect();
            this.logger.log('Database disconnected successfully');
        } catch (error) {
            this.logger.error('Error disconnecting from database', error);
        }
    }

    /**
     * Ejecuta una operación de Prisma de forma segura con manejo de errores
     * @param operation - La operación de Prisma a ejecutar
     * @param operationName - Nombre descriptivo de la operación (opcional)
     * @returns El resultado de la operación
     */
    async safePrismaCall<T>(
        operation: Promise<T>,
        operationName?: string
    ): Promise<T> {
        const startTime = Date.now();
        const operationLabel = operationName || 'Unknown operation';

        try {
            const result = await operation;
            return result;
        } catch (error) {
            handleExceptions(error, operationLabel);
        }

        throw new Error('Unreachable code reached');
    }

    /**
     * Verifica la salud de la conexión a la base de datos
     * @returns true si la conexión está saludable
     */
    async isHealthy(): Promise<boolean> {
        try {
            await this.$queryRaw`SELECT 1`;
            return true;
        } catch (error) {
            this.logger.error('Database health check failed', error);
            return false;
        }
    }
}
