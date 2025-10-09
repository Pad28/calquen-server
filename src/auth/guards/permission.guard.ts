import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY, RequiredPermission } from '../decorators/require-permission.decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private prisma: PrismaService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // 1. Obtener los permisos requeridos del decorador
        const requiredPermission = this.reflector.getAllAndOverride<RequiredPermission>(
            PERMISSION_KEY,
            [context.getHandler(), context.getClass()]
        );

        // 2. Si no hay permisos requeridos, permitir acceso
        if (!requiredPermission) {
            return true;
        }

        // 3. Obtener el usuario del request (viene del JwtAuthGuard)
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.id) {
            throw new ForbiddenException('Usuario no autenticado');
        }

        // 4. Buscar el módulo por código
        const module = await this.prisma.module.findFirst({
            where: {
                code: requiredPermission.module,
                is_active: true
            }
        });

        if (!module) {
            throw new ForbiddenException(`Módulo '${requiredPermission.module}' no encontrado`);
        }

        // 5. Verificar permisos del usuario
        const permission = await this.prisma.user_module_permission.findFirst({
            where: {
                user_id: user.id,
                module_id: module.id,
                is_active: true
            }
        });

        // 6. Si no tiene permisos para este módulo, denegar
        if (!permission) {
            throw new ForbiddenException(
                `No tienes acceso al módulo '${module.name}'`
            );
        }

        // 7. Verificar la acción específica
        const hasPermission = this.checkPermission(permission, requiredPermission.action);

        if (!hasPermission) {
            throw new ForbiddenException(
                `No tienes permiso para ${this.getActionName(requiredPermission.action)} en el módulo '${module.name}'`
            );
        }

        return true;
    }

    /**
     * Verifica si el usuario tiene el permiso específico
     */
    private checkPermission(
        permission: any,
        action: 'create' | 'read' | 'update' | 'delete'
    ): boolean {
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
     * Obtiene el nombre de la acción en español
     */
    private getActionName(action: string): string {
        const actions = {
            create: 'crear',
            read: 'leer',
            update: 'actualizar',
            delete: 'eliminar'
        };
        return actions[action] || action;
    }
}

