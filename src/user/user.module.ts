import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports:[PrismaModule,EmployeeModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class UserModule {}
