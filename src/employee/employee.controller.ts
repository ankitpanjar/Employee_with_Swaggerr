import { Controller, Get, Delete, Put, UseGuards, Param, ParseIntPipe, UnauthorizedException, Body } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guards';
import { User, UserInfoDecorator } from 'src/user/auth/decorators/user.decorator';
import { UpdateEmployeeDto } from 'src/user/auth/dtos/employee.dto';
import { EmployeeService } from './employee.service';
import { ApiTags,ApiSecurity } from '@nestjs/swagger/dist';


@Controller('employee')

export class EmployeeController {
    constructor(private readonly employeeService:EmployeeService){}

    @Get()
    @UseGuards(AuthGuard)
    @ApiTags('employee')
    @ApiSecurity("JWT-Auth")
    getEmployee(
        @User() user: UserInfoDecorator
    ){
         return this.employeeService.getEmployees();
    }


    @Get('/:id')
    @UseGuards(AuthGuard)
    @ApiTags('employee')
    @ApiSecurity("JWT-Auth")
    getEmployeeById(
        @Param('id', ParseIntPipe) id: number
    ){
        return this.employeeService.getEmployeeById(id)
    }

    @Put('/:id')
    @ApiTags('employee')
    @ApiSecurity("JWT-Auth")
    async updateEmployeeById(
        @Param('id', ParseIntPipe) id:number,
        @User() user: UserInfoDecorator,
        @Body() body: UpdateEmployeeDto
    ){
        const employee = await this.employeeService.getEmployeeById(id)

        if (employee.id !== user.id) throw new UnauthorizedException()
        return this.employeeService.updateEmployee(body, id);
    }

    @Delete('/:id')
    @ApiTags('employee')
    @ApiSecurity("JWT-Auth")
    async deleteEmployee(
        @Param('id', ParseIntPipe) id: number,
        @User() user: UserInfoDecorator
    ){
        const employee = await this.employeeService.getEmployeeById(id)

        if(employee.id !== user.id) throw new UnauthorizedException()
        return this.employeeService.deleteEmployee(id)
    }
}
