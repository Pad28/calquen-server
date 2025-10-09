// Third-party imports
import { Module } from '@nestjs/common';

// Local imports
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ModuleController],
  providers: [ModuleService],
  imports: [PrismaModule]
})
export class ModuleModule { }
