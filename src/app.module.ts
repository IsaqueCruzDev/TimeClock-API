import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TimeController } from './time/time.controller';
import { PrismaService } from './services/prisma/prisma.service';
import { UserService } from './services/user/user.service';
import { BcryptService } from './services/bcrypt/bcrypt.service';
import { TimeService } from './services/time/time.service';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { OrganizationService } from './services/organization/organization.service';
import { OrganizationController } from './organization/organization.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, TimeController, AuthController, OrganizationController],
  providers: [AppService, PrismaService, UserService, BcryptService, TimeService, AuthService, OrganizationService],
})
export class AppModule {}
