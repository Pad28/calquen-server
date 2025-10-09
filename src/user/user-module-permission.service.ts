import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserModulePermissionService {
    constructor(private readonly prisma: PrismaService) { }

    /**
     * Obtiene todos los permisos de un usuario por módulo
     */
    async getUserModulePermissions(userId: string) {
        return this.prisma.safePrismaCall(
            this.prisma.user_module_permission.findMany({
                where: { user_id: userId },
                include: {
                    module: true
                }
            })
        );
    }

    /**
     * Obtiene los permisos de un usuario para un módulo específico
     */
    async getUserModulePermission(userId: string, moduleId: string) {
        return this.prisma.safePrismaCall(
            this.prisma.user_module_permission.findFirst({
                where: {
                    user_id: userId,
                    module_id: moduleId
                },
                include: {
                    module: true
                }
            })
        );
    }

    /**
     * Crea o actualiza los permisos de un usuario para un módulo
     */
    async upsertUserModulePermission(userId: string, moduleId: string, permissions: {
        can_create?: boolean;
        can_read?: boolean;
        can_update?: boolean;
        can_delete?: boolean;
        is_active?: boolean;
    }) {
        return this.prisma.safePrismaCall(
            this.prisma.user_module_permission.upsert({
                where: {
                    user_id_module_id: {
                        user_id: userId,
                        module_id: moduleId
                    }
                },
                update: permissions,
                create: {
                    user_id: userId,
                    module_id: moduleId,
                    can_create: permissions.can_create ?? true,
                    can_read: permissions.can_read ?? true,
                    can_update: permissions.can_update ?? true,
                    can_delete: permissions.can_delete ?? true,
                    is_active: permissions.is_active ?? true
                }
            })
        );
    }

    /**
     * Elimina los permisos de un usuario para un módulo
     */
    async removeUserModulePermission(userId: string, moduleId: string) {
        return this.prisma.safePrismaCall(
            this.prisma.user_module_permission.delete({
                where: {
                    user_id_module_id: {
                        user_id: userId,
                        module_id: moduleId
                    }
                }
            })
        );
    }

    /**
     * Verifica si un usuario tiene un permiso específico en un módulo
     */
    async hasPermission(userId: string, moduleId: string, action: 'create' | 'read' | 'update' | 'delete') {
        const permission = await this.prisma.user_module_permission.findFirst({
            where: {
                user_id: userId,
                module_id: moduleId,
                is_active: true
            }
        });

        if (!permission) {
            return false;
        }

        switch (action) {
            case 'create':
                return permission.can_create;
            case 'read':
                return permission.can_read;
            case 'update':
                return permission.can_update;
            case 'delete':
                return permission.can_delete;
            default:
                return false;
        }
    }

    /**
     * Obtiene el resumen de permisos de un usuario
     */
    async getPermissionSummary(userId: string) {
        const permissions = await this.prisma.user_module_permission.findMany({
            where: { user_id: userId },
            include: { module: true }
        });

        const activePermissions = permissions.filter(p => p.is_active);
        const totalPermissions = activePermissions.length;
        const grantedPermissions = activePermissions.filter(p =>
            p.can_create || p.can_read || p.can_update || p.can_delete
        ).length;

        return {
            total: totalPermissions,
            granted: grantedPermissions,
            denied: totalPermissions - grantedPermissions,
            modules: permissions.map(p => ({
                module: p.module.name,
                can_create: p.can_create,
                can_read: p.can_read,
                can_update: p.can_update,
                can_delete: p.can_delete,
                is_active: p.is_active
            }))
        };
    }
}
