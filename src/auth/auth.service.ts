// Third-party imports
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { user } from '@prisma/client';

// local imports
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.safePrismaCall(this.prisma.user.findUnique({
            where: { email },
            include: {
                role: true,
            },
        }));
        if (!user || !user.is_active || !user.password) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        const { password: userPassword, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }


    async login(user: user) {
        const payload = { email: user.email, sub: user.id };

        const updatedUser = await this.prisma.safePrismaCall(
            this.prisma.user.update({
                where: { id: user.id },
                data: { last_connection: new Date() },
                include: {
                    role: true,
                    user_module_permission: true,
                },
            })
        );

        return {
            access_token: this.jwtService.sign(payload),
            user: updatedUser
        }
    }

    async register(registerDto: CreateUserDto) {
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const user = await this.prisma.safePrismaCall(this.prisma.user.create({
            data: {
                ...registerDto,
                password: hashedPassword,
            },
            include: {
                role: true,
                user_module_permission: true,
            }
        }));

        return this.login(user);
    }


    async verifyToken(token: string) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.prisma.safePrismaCall(
                this.prisma.user.findUnique({
                    where: { id: payload.sub },
                    include: {
                        role: true,
                    },
                })
            )

            if (!user || !user.is_active) {
                throw new UnauthorizedException('Token inválido');
            }

            return user;
        } catch (error) {
            throw new UnauthorizedException('Token inválido o expirado');
        }
    }
}
