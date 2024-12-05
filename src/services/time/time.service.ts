import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TimeService {

    constructor(private readonly prismaService: PrismaService) {}

    async getTimes() {
        try {
            const times = await this.prismaService.timeClock.findMany({
                include: {
                    User: true,
                    Organization: true
                }
            })
    
            if (!times) {
                throw new NotFoundException("Nenhum horário foi encontrado!")
             }
            return times
        } catch (error) {
            throw error
        }
    }

    async createTime(data: Prisma.TimeClockCreateInput) {
        try {
            const createdTime = await this.prismaService.timeClock.create({ data })
            return createdTime   
        } catch (error) {
            throw error
        }
    }

    async updateTime(params: { where: Prisma.TimeClockWhereUniqueInput, data: Prisma.TimeClockUpdateInput }) {
        const { where, data } = params

        const foundTime = await this.prismaService.timeClock.findUnique({
            where: { id: where.id }
        })

        if (!foundTime) {
            throw new Error(`Horário não encontrado!`)
        }

        const updatedTime = await this.prismaService.timeClock.update({
            where,
            data: { hourEnd: data.hourEnd ?? null, ...data}
        })

        return updatedTime
    }

    async deleteTime(where: Prisma.TimeClockWhereUniqueInput) {
        const deletedTime = await this.prismaService.timeClock.delete({ where })
        return deletedTime
    }
}
