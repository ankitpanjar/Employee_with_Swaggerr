import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { PrismaModule } from 'src/prisma/prisma.module';
// import { AuthService } from './auth/auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports:[PrismaModule],
  controllers: [EmployeeController],
  providers: [EmployeeService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }]
})
export class EmployeeModule {}
