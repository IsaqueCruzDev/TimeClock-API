import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationService {
    constructor(private readonly prismaService: PrismaService) {}

    async getOrganizations() {
        try {
            const organizations = await this.prismaService.organization.findMany()

            if (!organizations) {
                throw new NotFoundException("Nenhuma organização foi encontrada!")
            }
            return organizations
        } catch (error) {
            throw error
        }
    }
}
