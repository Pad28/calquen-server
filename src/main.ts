import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from './config/env.validation';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  );

  const configService = app.get(ConfigService<EnvVariables>);
  const port = configService.get('PORT')

  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true,
  });
  await app.listen(port, () => console.log(`Server is running on port ${port}`));
}
bootstrap();
