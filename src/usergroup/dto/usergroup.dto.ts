import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UserGroupDto{    
    id: number
    
    @IsString()
    @IsNotEmpty()
    userGroupCode: String

    @IsString()
    @IsNotEmpty()
    userGroupDescription: String

    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean

    @IsString()
    @IsNotEmpty()
    createdBy: String

    @IsOptional()
    @IsDate()
    @IsNotEmpty()
    createdOn?: Date

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    editedBy: String

    @IsOptional()
    @IsDate()
    @IsNotEmpty()
    editedOn: Date
}

function IsNullable() {
    throw new Error("Function not implemented.")
}