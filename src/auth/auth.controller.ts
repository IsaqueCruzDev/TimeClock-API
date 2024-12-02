import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post()
    async login(@Body() data: { email: string, password: string }) {
        try {
            const user = await this.authService.login(data)
            return { data: user, message: "Login efetuado com sucesso!" }
        } catch (err) {
            throw err
        }
    }
}
