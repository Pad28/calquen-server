import { SetMetadata } from '@nestjs/common';
import { ROLE_NAME } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ROLE_NAME[]) => SetMetadata(ROLES_KEY, roles);