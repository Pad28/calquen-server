// Third-party imports
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// local imports
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/config/env.validation';

export interface JwtPayload {
    sub: string; // user id
    email: string;
    role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private prisma: PrismaService,
        private configService: ConfigService<EnvVariables>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET', { infer: true }) as string,
        });
    }

    async validate(payload: JwtPayload) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
            include: {
                role: true,
                user_module_permission: true,
            }
        });

        if (!user || !user.is_active) throw new UnauthorizedException('Usuario no disponible');

        // Actualizar last_connection
        await this.prisma.user.update({
            where: { id: user.id },
            data: { last_connection: new Date() }
        });

        // Este objeto estará disponible en req.user
        return {
            id: user.id,
            email: user.email,
            role: user.role.role_name,
            user_module_permission: user.user_module_permission,
        };
    }
}