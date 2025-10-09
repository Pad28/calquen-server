import { Module } from '@nestjs/common';
import { DocumentCategoryService } from './document-category.service';
import { DocumentCategoryController } from './document-category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [DocumentCategoryController],
    providers: [DocumentCategoryService],
    imports: [PrismaModule]
})
export class DocumentCategoryModule { }

