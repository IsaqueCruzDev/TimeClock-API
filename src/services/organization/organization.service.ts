import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationService {
    constructor(private readonly prismaService: PrismaService) {}

    async getOrganizations() {
        try {
            const organizations = await this.prismaService.organization.findMany()
            return organizations
        } catch (error) {
            throw error
        }
    }
}
