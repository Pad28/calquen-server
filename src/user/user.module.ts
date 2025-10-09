import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModulePermissionService } from './user-module-permission.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserModulePermissionService],
  imports: [PrismaModule],
})
export class UserModule { }
