import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, ROLE_NAME } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeedService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) { }

    async onModuleInit() {
        await this.seedDefaultData();
    }

    private readonly logger = new Logger(SeedService.name);

    private async seedDefaultData() {
        try {
            // Verificar si ya existen datos
            const [existingRoles, existingModules] = await Promise.all([
                this.prisma.role.count(),
                this.prisma.module.count()
            ]);

            if (existingRoles > 0 && existingModules > 0) {
                this.logger.debug('Datos por defecto ya existen, saltando seed...');
                return;
            }

            this.logger.debug('Iniciando seed de datos por defecto...');

            const roles: Prisma.roleCreateInput[] = [
                {
                    name: 'Administrador',
                    description: 'Administrador del sistema',
                    role_name: ROLE_NAME.ADMIN
                },
                {
                    name: 'Cliente',
                    description: 'Cliente del sistema',
                    role_name: ROLE_NAME.CLIENT
                },
                {
                    name: 'Super Administrador',
                    description: 'Super Administrador del sistema',
                    role_name: ROLE_NAME.SUPER_ADMIN
                }
            ];

            await this.prisma.role.createMany({ data: roles });
            this.logger.debug(`Roles creado: ${roles.map(role => role.name)}`);

            // 2. Crear módulos por defecto
            const modules: Prisma.moduleCreateInput[] = [
                {
                    name: 'Gestión de Usuarios',
                    description: 'Crear, editar y eliminar usuarios del sistema',
                    code: 'USER_MANAGEMENT'
                },
                {
                    name: 'Configuración',
                    description: 'Acceso a configuraciones generales del sistema',
                    code: 'CONFIGURATION'
                },
                {
                    name: 'Reportes',
                    description: 'Generar y visualizar reportes del sistema',
                    code: 'REPORTS'
                },
                {
                    name: 'Facturación',
                    description: 'Gestionar facturas y procesos de facturación',
                    code: 'BILLING'
                },
                {
                    name: 'Legal',
                    description: 'Acceso a documentos y procesos legales',
                    code: 'LEGAL'
                },
                {
                    name: 'Contabilidad',
                    description: 'Gestión de procesos contables y financieros',
                    code: 'ACCOUNTING'
                },
                {
                    name: 'Recursos Humanos',
                    description: 'Gestión de empleados y documentos de RRHH',
                    code: 'HR'
                }
            ];

            await this.prisma.module.createMany({ data: modules });
            this.logger.debug(`Módulos creados: ${modules.map(module => module.name)}`);

            // 3. Crear usuario administrador por defecto (opcional)
            // const adminRole = await this.prisma.role.findUnique({
            //     where: { name: 'Administrador' }
            // });

            // if (adminRole) {
            //     await this.prisma.user.upsert({
            //         where: { email: 'admin@calquen.cl' },
            //         update: {},
            //         create: {
            //             email: 'admin@calquen.cl',
            //             password: 'admin123', // En producción, usar hash
            //             first_name: 'Administrador',
            //             last_name: 'Sistema',
            //             rut: '12345678-9',
            //             phone: '123456789',
            //             role_id: adminRole.id
            //         }
            //     });
            //     console.log('✅ Usuario administrador creado: admin@calquen.cl');
            // }

            this.logger.debug('🎉 Seed de datos por defecto completado!');

        } catch (error) {
            this.logger.error('❌ Error durante el seed:', error);
        }
    }
}
