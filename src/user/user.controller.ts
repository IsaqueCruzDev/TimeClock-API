import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get("/byId")
    async getUser(@Query("userId", ParseIntPipe) userId: number) {
       const user = await this.userService.getUserById(userId)
       return { data: user, message: "Usuário encontrado com sucesso!"}
    }

    @Get()
    async getUsers() {
       const users = await this.userService.getUsers({})
       return { data: users, message: "Usuários encontrados com sucesso!"}
    }

    @Post()
    async createUser(@Body() user: { name: string, email: string, password: string, role: number, organizationIds: number[] }) {
        const userCreated = await this.userService.createUser(user)
        return { data: userCreated, message: "Usuário criado com sucesso!" }
    }

    @Put()
    async updateUser(@Param() userId: number, @Body() data: { name: string, email: string, password: string, organizationIds: number[] }) {
        const userUpdated = await this.userService.updateUser({ where: { id: userId}, data })

        return { data: userUpdated, message: "Usuário atualizado com sucesso!" }
    }

    @Delete()
    async deleteUser(@Param() userId: number) {
        const userDeleted = await this.userService.deleteUser({ id: userId })
        return { data: userDeleted, message: "Usuário deletado com sucesso!" }
    }
}
