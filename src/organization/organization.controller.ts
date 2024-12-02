import { Controller, Get } from '@nestjs/common';
import { OrganizationService } from 'src/services/organization/organization.service';

@Controller('organization')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}

    @Get()
    async getOrganizations() {
        const organizations = await this.organizationService.getOrganizations()
        return { data: organizations, message: "Empresas buscadas com sucesso!" }
    }
}
