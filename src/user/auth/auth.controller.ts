import { Controller,Post ,Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dtos/employee.dto';
import {ApiTags,ApiSecurity} from "@nestjs/swagger"


@Controller('auth')

export class AuthController {
    constructor(private readonly authService:AuthService){}
    @ApiTags('SignUp')
    @Post('/signup')
    createEmployee(
        @Body() body:SignupDto
    ){
        return this.authService.signup(body)
    }
    @ApiTags('Login')
    @ApiSecurity("JWT-Auth")
    @Post('/signin')
    signin(@Body() body: SigninDto){
        return this.authService.signin(body)
    }
}
