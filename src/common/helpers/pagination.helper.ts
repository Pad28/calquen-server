import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from '../dto/pagination.dto';
import { Prisma } from '@prisma/client';

export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    links: {
        first: string | null;
        prev: string | null;
        next: string | null;
        last: string | null;
    };
}

export class PaginationHelper {
    /**
     * Helper genérico para paginación
     * @param findManyQuery - Función que ejecuta la consulta findMany
     * @param countQuery - Función que ejecuta la consulta count
     * @param paginationDto - Parámetros de paginación
     * @param baseUrl - URL base para los links (ej: '/user', '/role')
     * @param prismaService - Instancia del PrismaService para safePrismaCall
     * @returns Respuesta paginada
     */
    static async paginate<T>(
        findManyQuery: (params: any) => Promise<T[]>,
        countQuery: () => Promise<number>,
        { limit = 10, page = 1 }: PaginationDto,
        baseUrl: string,
        prismaService: any
    ): Promise<PaginatedResponse<T>> {
        const validLimit = Math.min(Math.max(1, limit), 100);
        const validPage = Math.max(1, page);

        const [data, total] = await Promise.all([
            prismaService.safePrismaCall(findManyQuery({
                take: validLimit,
                skip: (validPage - 1) * validLimit,
                orderBy: { created_at: 'desc' }
            })),
            prismaService.safePrismaCall(countQuery())
        ]);

        const totalPages = Math.ceil(total / validLimit);

        const buildLink = (pageNum: number): string | null =>
            pageNum > 0 ? `${baseUrl}?page=${pageNum}&limit=${validLimit}` : null;

        return {
            data,
            page: validPage,
            limit: validLimit,
            total,
            total_pages: totalPages,
            links: {
                first: buildLink(1),
                prev: buildLink(validPage > 1 ? validPage - 1 : 0),
                next: buildLink(validPage < totalPages ? validPage + 1 : 0),
                last: buildLink(totalPages)
            }
        };
    }

    /**
     * Helper específico para Prisma con select personalizado y tipado
     * @param prismaModel - Modelo de Prisma (ej: this.prisma.user)
     * @param selectOptions - Opciones de select para la consulta (tipado)
     * @param paginationDto - Parámetros de paginación
     * @param baseUrl - URL base para los links
     * @param prismaService - Instancia del PrismaService
     * @returns Respuesta paginada
     */
    static async paginateWithSelect<T>(
        prismaModel: any,
        selectOptions: any,
        { limit = 10, page = 1 }: PaginationDto,
        baseUrl: string,
        prismaService: any
    ): Promise<PaginatedResponse<T>> {
        const findManyQuery = (params: any) =>
            prismaModel.findMany({
                ...params,
                select: selectOptions
            });

        const countQuery = () => prismaModel.count();

        return this.paginate(
            findManyQuery,
            countQuery,
            { limit, page },
            baseUrl,
            prismaService
        );
    }

    /**
     * Helper específico para Prisma con include personalizado
     * @param prismaModel - Modelo de Prisma (ej: this.prisma.user)
     * @param includeOptions - Opciones de include para la consulta
     * @param paginationDto - Parámetros de paginación
     * @param baseUrl - URL base para los links
     * @param prismaService - Instancia del PrismaService
     * @returns Respuesta paginada
     */
    static async paginateWithInclude<T>(
        prismaModel: any,
        includeOptions: any,
        { limit = 10, page = 1 }: PaginationDto,
        baseUrl: string,
        prismaService: any
    ): Promise<PaginatedResponse<T>> {
        const findManyQuery = (params: any) =>
            prismaModel.findMany({
                ...params,
                include: includeOptions
            });

        const countQuery = () => prismaModel.count();

        return this.paginate(
            findManyQuery,
            countQuery,
            { limit, page },
            baseUrl,
            prismaService
        );
    }


    /**
     * Helper para paginación con select e include opcionales en Prisma
     * @param prismaModel - Modelo de Prisma (ej: this.prisma.user)
     * @param options - Objeto con select e include opcionales
     * @param paginationDto - Parámetros de paginación
     * @param baseUrl - URL base para los links
     * @param prismaService - Instancia del PrismaService
     * @returns Respuesta paginada
     */
    static async paginateWithSelectAndInclude<T>(
        prismaModel: any,
        options: { select?: any; include?: any } = {},
        { limit = 10, page = 1 }: PaginationDto,
        baseUrl: string,
        prismaService: any
    ): Promise<PaginatedResponse<T>> {
        const findManyQuery = (params: any) =>
            prismaModel.findMany({
                ...params,
                ...(options.select && { select: options.select }),
                ...(options.include && { include: options.include }),
            });

        const countQuery = () => prismaModel.count();

        return this.paginate(
            findManyQuery,
            countQuery,
            { limit, page },
            baseUrl,
            prismaService
        );
    }
}
