// import { Prisma } from '@prisma/client';

// // Tipos para tipado avanzado de Prisma con paginación
// export type PrismaSelectOptions<T> = {
//     [K in keyof T]?: T[K] extends object
//     ? PrismaSelectOptions<T[K]> | boolean
//     : boolean;
// };

// // Tipo para el resultado de una consulta con select
// export type PrismaSelectResult<T, S> = {
//     [K in keyof S]: S[K] extends true
//     ? T[K]
//     : S[K] extends object
//     ? PrismaSelectResult<T[K], S[K]>
//     : never;
// };

// // Ejemplo de uso con tipos específicos de Prisma
// export type UserSelectOptions = PrismaSelectOptions<{
//     id: string;
//     email: string;
//     first_name: string;
//     last_name: string;
//     phone: string;
//     is_active: boolean;
//     role_id: string;
//     created_at: Date;
//     updated_at: Date;
//     role: {
//         id: string;
//         name: string;
//         description: string;
//     };
// }>;

// export type RoleSelectOptions = PrismaSelectOptions<{
//     id: string;
//     name: string;
//     description: string;
//     created_at: Date;
//     updated_at: Date;
//     user: Array<{
//         id: string;
//         email: string;
//         first_name: string;
//         last_name: string;
//     }>;
// }>;

// export type CompanySelectOptions = PrismaSelectOptions<{
//     id: string;
//     name: string;
//     business_sector: string;
//     url: string;
//     billing_frequency: string;
//     is_active: boolean;
//     created_at: Date;
//     updated_at: Date;
//     _count: {
//         client_request: number;
//         company_employee: number;
//         employee_requests: number;
//         rh_document: number;
//     };
// }>;
