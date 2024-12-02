import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TimeService } from 'src/services/time/time.service';

@Controller('time')
export class TimeController {
    constructor(private readonly timeService: TimeService) {}

    @Get()
    async getTimes() {
        const times = await this.timeService.getTimes()
        return { data: times, message: "Horários encontrados com sucesso!" }
    }

    @Post()
    async createTime(@Body() data: Prisma.TimeClockCreateInput) {
        const createdTime = await this.timeService.createTime(data)
        return { data: createdTime, message: "Horário criado com sucesso!" }
    }

    @Put()
    async updateTime(@Query("timeId", ParseIntPipe) timeId: number, @Body() data: Prisma.TimeClockUpdateInput) {
        const updatedTime = await this.timeService.updateTime({ where: { id: timeId }, data })
        return { data: updatedTime, message: "Horário atualizado com sucesso!" }
    }

    @Delete()
    async deleteTime(@Query("timeId", ParseIntPipe) timeId: number) {
        const deletedTime = await this.timeService.deleteTime({ id: timeId })
        return { data: deletedTime, message: "Horário deletado com sucesso!" }
    }
}
