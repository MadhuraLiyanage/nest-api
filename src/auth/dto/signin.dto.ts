import { IsBoolean, IsDate, IsEmail, IsInt, IsNotEmpty, 
    IsOptional, 
    IsString } from "class-validator"

export class SigninDto{
    id: number
    
    @IsString()
    @IsNotEmpty()
    userName: String

    @IsString()
    @IsNotEmpty()
    userPassword: String

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    userEmail: String

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    userFullName: String
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    userGroupCode: String

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean

    @IsOptional()
    @IsOptional()
    @IsDate()
    lastSucessfulLogin?: Date 

    @IsOptional()
    @IsBoolean()
    isLocked?: boolean 

    @IsOptional()
    @IsInt()
    noAttempt?: number

    @IsOptional()   
    @IsDate()
    lockDate?: Date

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    createdBy: String

}