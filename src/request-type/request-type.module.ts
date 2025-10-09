import { Module } from '@nestjs/common';
import { RequestTypeService } from './request-type.service';
import { RequestTypeController } from './request-type.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [RequestTypeController],
    providers: [RequestTypeService],
    imports: [PrismaModule]
})
export class RequestTypeModule { }

