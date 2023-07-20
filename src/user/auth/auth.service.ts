import { Injectable ,NotAcceptableException,UnauthorizedException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto } from './dtos/employee.dto';
// import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'


interface SignupParams{
    name:string;
    phone:string;
    email:string;
    password:string,
    desg:string;
}

interface SigninParam{
    email:string;
    password:string;
}
@Injectable()
export class AuthService {
    constructor(private readonly prismaService:PrismaService){}


    async signup(body:SignupParams){
        const employee = await this.getEmployeeByEmail(body.email)
        if(employee) throw new NotAcceptableException({message: `Email Id ${body.email} Exists`})

        const employeePhone = await this.getEmployeeByPhone(body.phone)
        if(employeePhone) throw new NotAcceptableException({message: `Phone ${body.phone} is already exist...`})
   
        const hashedPassword = await bcrypt.hash(body.password, 10)

        const newEmployee = await this.prismaService.employee.create({
            data: {
                name: body.name,
                phone: body.phone,
                email: body.email,
                desg: body.desg,
                password: hashedPassword,
            },
        });
        // const jwtToken =await this.generateJwtToken(newEmployee.email, newEmployee.id);
        // console.log(jwtToken)
        return  {newEmployee, 
            // jwtToken
        };
    }

    async signin({email,password}:SigninParam){
        const employee = await this.getEmployeeByEmail(email)

        if(!employee) throw new UnauthorizedException({message: `Invalid Email ${email}`})

        const hashedPassword = employee.password
        const isValidPassword = bcrypt.compare(password, hashedPassword)
        
        if(!isValidPassword) throw new NotAcceptableException({message: "Incorrect Password"});

        const jwtToken = await this.generateJwtToken(email, employee.id);
        console.log(jwtToken)
        return jwtToken;
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

    private async generateJwtToken(email:string, id:number){
        const jwtToken = await jwt.sign(
            {email, id},
            "MY_SECRET_TOKEN",
            {expiresIn: 3000}
        )

        return jwtToken;
    }
}
