// Third-party imports
import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';

// local imports
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    /**
     * POST /auth/login
     * Login con email y contraseña
     */
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    /**
     * POST /auth/register
     * Registrar nuevo usuario
     */
    @Public()
    @Post('register')
    async register(@Body() registerDto: CreateUserDto) {
        return this.authService.register(registerDto);
    }

    /**
     * GET /auth/profile
     * Obtener perfil del usuario autenticado
     */
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@CurrentUser() user: any) {
        return user;
    }

    /**
     * POST /auth/verify
     * Verificar si el token es válido
     */
    @UseGuards(JwtAuthGuard)
    @Post('verify')
    verifyToken(@CurrentUser() user: any) {
        return {
            valid: true,
            user,
        };
    }
}
