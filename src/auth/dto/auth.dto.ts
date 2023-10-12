import { IsBoolean, IsDate, IsEmail, 
         IsInt, 
         IsNotEmpty, 
         IsOptional, 
         IsString } from "class-validator"


export class AuthDto{
    id: number
    
    @IsString()
    @IsNotEmpty()
    userName: String

    @IsString()
    @IsNotEmpty()
    userPassword: String

    @IsEmail()
    @IsNotEmpty()
    userEmail: String

    @IsString()
    @IsNotEmpty()
    userFullName: String

    @IsString()
    @IsNotEmpty()
    userGroupCode: String

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean

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

    @IsString()
    @IsNotEmpty()
    createdBy: String
}

function IsNullable() {
    throw new Error("Function not implemented.")
}
