import {IsString,IsOptional,IsNotEmpty,IsEmail,Matches} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger/dist';
export class SignupDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name:string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email:string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password:string;

    @Matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 
    {message: 'Enter valid phone number'})
    @ApiProperty()
    phone:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    desg :string
}

export class SigninDto{
    
    @ApiProperty()
    @IsEmail()
    email:string;

    @ApiProperty()
    @IsString()
    password:string;

    
}

export class UpdateEmployeeDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsOptional()
    @Matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/, 
    {message: 'phone must be a valid phone number'})
    @ApiProperty()
    phone: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    desg: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;  
} 