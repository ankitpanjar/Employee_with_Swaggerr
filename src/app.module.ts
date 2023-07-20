import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthService } from './user/auth/auth.service';
// import { AuthController } from './user/auth/auth.controller';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import {APP_INTERCEPTOR} from '@nestjs/core'
import { EmployeeModule } from './employee/employee.module';
import {UserInterceptor} from './employee/interceptors/user.interceptor'
@Module({
  imports: [UserModule, PrismaModule, EmployeeModule],
  controllers: [AppController],
  providers: [
    AppService,
  {
    provide:APP_INTERCEPTOR,
    useClass:UserInterceptor
  }
  ],
})
export class AppModule {}
