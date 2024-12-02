import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly bcryptService: BcryptService
    ) {}

    async getUser(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw new Error(`Nenhum usuário foi encontrado!`)
        }

        return user
    }

    async getUserById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        })

        if (!user) {
            throw new Error(`Nenhum usuário foi encontrado!`)
        }

        return user
    }

    async getUsers(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params
        try {
            const users = await this.prisma.user.findMany({
                skip, take, cursor, where, orderBy, include: { organizations: true }
            });
            return users
        } catch (error) {
          throw new Error(`Não foi possível buscar os usuários: ${error}`)  
        }
    }
    
    async createUser(data: {name: string, email: string, password: string, role: number; organizationIds: number[] }): Promise<User> {
        const { name, email, password, role, organizationIds } = data
        try {
            const hashedPassword = await this.bcryptService.hashedPassword(data.password)
            data.password = hashedPassword

            const userCreated = this.prisma.user.create({ 
                data: {
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    organizationLinks: {
                        create: organizationIds.map((organizationId) => ({ organizationId }))
                    }
                },
                    include: { organizationLinks: true }
                },
            )
            return userCreated
        } catch (error) {

            if (error.code === "P2003") {
                throw new Error(`A organização fornecida não existe!`)
            }

            throw new Error(`Não foi possível criar o usuário: ${error.message}`)
        }
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput,
        data: Prisma.UserUpdateInput
    }): Promise<User> {
        try {
            const  { where, data } = params
            const userUpdated = this.prisma.user.update({
                data,
                where
            })
            return userUpdated
        } catch (error) {
                throw new Error(`Não foi possível atualizar o usuário: ${error}`)
        }
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        try {
           return await this.prisma.user.delete({ where })
        } catch (error) {
            throw new Error(`Não foi possível deletar o usuário: ${error}`)
        }
    }
}

