import { Injectable,NotFoundException ,BadRequestException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateEmployeeDto } from 'src/user/auth/dtos/employee.dto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class EmployeeService {
    constructor(private readonly prismaService:PrismaService){}

    async getEmployees(){
        const employees = await this.prismaService.employee.findMany()

        return employees;
    }

    async getEmployeeById(id: number){
        const employee = await this.prismaService.employee.findUnique({
            where: {
                id,
            }
        })

        if(!employee) throw new NotFoundException({message: `Id ${id} is not Valid....`})

        return employee
    }

    async updateEmployee(
        body: UpdateEmployeeDto,
        id: number
    ){
        let data = body;
        const employee = await this.prismaService.employee.findUnique({
            where: {
                id,
            },
        });
        if (!employee) throw new NotFoundException({message: `Id ${id} is not valid...`})

        if (body.password){
            const hashedPassword = await bcrypt.hash(body.password, 10)
            const body2 = {
                ...body,
                password: hashedPassword,

            }
            data = body2
        }

        if (data.email){
            const employee = await this.getEmployeeByEmail(data.email)
            if (employee) throw new  BadRequestException({message: `Email Id ${data.email} is already exist...`})
        }

        if (data.phone){
            const employee = await this.getEmployeeByPhone(data.phone)
            if (employee) throw new  BadRequestException({message: `Phone no ${data.phone} is already exist...`})
        }

        const updatedEmployee = await this.prismaService.employee.update({
            where: {
                id,
            },
            data: {
                ...data
            }
        })

        return updatedEmployee
    }

    async deleteEmployee(id: number){
        const employee = await this.prismaService.employee.findUnique({
            where: {
                id,
            },
        });

        if (!employee) throw new NotFoundException()

        const deletedEmployee = await this.prismaService.employee.delete({
            where: {
                id,
            }
        })

        return {deletedEmployee, delete: `Deleted data with id ${id}...`}
    }

    async getEmployeeByEmail(email:string){
        const employee = await this.prismaService.employee.findUnique({
            where: {
                email, 
            }
        })

        return employee
    }

    async getEmployeeByPhone(phone:string){
        const employee = await this.prismaService.employee.findUnique({
            where: {
                phone, 
            }
        })

        return employee
    }
}
