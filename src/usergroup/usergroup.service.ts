import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserGroupDto } from './dto';
import { UsergroupModule } from './usergroup.module';

@Injectable()
export class UsergroupService {
    constructor(
        private prisma: PrismaService, 
    ){}

    async createUserGroup(dto: UserGroupDto):Promise<{status: string, msg: string, data: object}>{
        try{
            //check user group in the user table
            const userGroupFindResults = await this.findUserGroup(dto.userGroupCode.toString());

            if (!userGroupFindResults.data){
                //save the new user group detail in DB
                const user = await this.prisma.userGroup.create({
                    data: {
                        userGroupCode: dto.userGroupCode.toString(),
                        userGroupDescription: dto.userGroupDescription.toString(),
                        isActive: dto.isActive,                   
                        createdBy: dto.createdBy.toString(),
                        editedBy:"",
                    },
                    select:{
                        id: true,
                        userGroupCode: true,
                        userGroupDescription: false,
                        isActive: true,
                        createdBy: true,
                        createdOn: true,
                        editedBy: true,
                        editedOn: true,
                    }
                })
                //return saved user group
                return {status: "00", msg: "Successful", data: user};
            }
            else{
                return {status: "77", msg: "Record already exists", data: {        
                    id: 0,
                    userGroupCode: userGroupFindResults.data.userGroupCode, 
                    userGroupDescription: userGroupFindResults.data.userGroupDescription,
                    isActive: userGroupFindResults.data.isActive,
                    createdOn: userGroupFindResults.data.createdOn,
                    createdBy: userGroupFindResults.data.createdBy,
                    editedOn: userGroupFindResults.data.editedOn,
                    editedBy: userGroupFindResults.data.editedBy, 
                }}
            }
        }catch(err){
            //console.log(err);
            return {status: "99", msg: "Failed", data: err.message} 
        }
    }

    async findUserGroup(findUserGroupCode: string){
        try{
            const resUserGroup = await this.prisma.userGroup.findUnique({
                select:{
                    id: true,
                    userGroupCode: true,
                    userGroupDescription: true,
                    isActive: true,
                    createdBy: true,
                    createdOn: true,
                    editedBy: true,
                    editedOn: true
    
                },  
                where: {
                    userGroupCode: findUserGroupCode,
                }
            });
            if (!resUserGroup){
                return {status: "88", msg: "Matching record not found", data: resUserGroup};            
            }else{
                return {status: "00", msg: "Successful", data: resUserGroup};  
            }
        }catch(err){
            return {status: "99", msg: "Failed", data: err.message};            
        }
    }

    async listUserGroups():Promise<{status: string, msg: string, data: object[]}>{
        try{
            const resUserGroups = await this.prisma.userGroup.findMany({
                select:{
                    id: true,
                    userGroupCode: true,
                    userGroupDescription: true,
                    isActive: true,
                    createdBy: true,
                    createdOn: true,
                    editedBy: true,
                    editedOn: true
                }
            });
            if (!resUserGroups){
                return {status: "88", msg: "No record(s) found", data: resUserGroups}; 
            }else{
                return {status: "00", msg: "Successful", data: resUserGroups};   
            } 
        }catch(err){
            //console.log(err);
            return {status: "99", msg: "Failed", data: err.message};            
        }
    }
}
