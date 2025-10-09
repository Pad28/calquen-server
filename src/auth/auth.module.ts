// Third-party imports
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// Local imports
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy],
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                const secret = configService.get<string>('JWT_SECRET');
                const expiresIn = configService.get<string>('JWT_EXPIRES_IN') || '24h';
                if (!secret) throw new Error('JWT_SECRET no está definido en las variables de entorno');
                return {
                    secret: secret,
                    signOptions: { expiresIn }
                };
            },
            inject: [ConfigService],
        })
    ],
    exports: [AuthService]
})
export class AuthModule { }
