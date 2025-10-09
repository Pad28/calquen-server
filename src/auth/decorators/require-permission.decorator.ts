import { SetMetadata } from '@nestjs/common';

export type PermissionAction = 'create' | 'read' | 'update' | 'delete';

export interface RequiredPermission {
    module: string;  // Código del módulo
    action: PermissionAction;
}

export const PERMISSION_KEY = 'permissions';

/**
 * Decorador para requerir permisos específicos en una ruta
 * @param module - Código del módulo (ej: 'users', 'companies')
 * @param action - Acción requerida ('create', 'read', 'update', 'delete')
 * 
 * @example
 * @RequirePermission('users', 'create')
 * @Post()
 * createUser() { }
 */
export const RequirePermission = (module: string, action: PermissionAction) =>
    SetMetadata(PERMISSION_KEY, { module, action } as RequiredPermission);

