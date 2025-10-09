// Third-party imports
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

// Local imports
import { validate } from './config/env.validation';
import { UserModule } from './user/user.module';
import { ModuleModule } from './module/module.module';
import { RoleModule } from './role/role.module';
import { DocumentModule } from './document/document.module';
import { RequestModule } from './request/request.module';
import { EmployeeModule } from './employee/employee.module';
import { CompanyModule } from './company/company.module';
import { BankModule } from './bank/bank.module';
import { DocumentCategoryModule } from './document-category/document-category.module';
import { RequestTypeModule } from './request-type/request-type.module';
import { SeedService } from './common/services/seed.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    CompanyModule,
    EmployeeModule,
    RequestModule,
    DocumentModule,
    RoleModule,
    ModuleModule,
    BankModule,
    DocumentCategoryModule,
    RequestTypeModule,
  ],
  controllers: [],
  providers: [
    SeedService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule { }
