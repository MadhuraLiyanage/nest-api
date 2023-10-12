import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService, 
    ){}
    
    async findUser(findUserName: string, returnPassword: boolean=false){
        try{
            const resUser = await this.prisma.user.findUnique({
                select:{
                    id: true,
                    userName: true,
                    userPassword: returnPassword,
                    userFullName: true,
                    userEmail: true,
                    userGroup: true,
                    isActive: true,
                    lastSucessfulLogin: true,
                    isLocked: true,
                    noAttempt: true,
                    lockDate: true,
                    createdBy: true,
                    createdOn: true,
                    editedBy: true,
                    editedOn: true
    
                },
                where: {
                    userName: findUserName,
                }
            });
            if (!resUser){
                return {status: "88", msg: "Matching record not found", data: resUser};            
            }else{
                return {status: "00", msg: "Successful", data: resUser};  
            }
        }catch(err){
            return {status: "99", msg: "Failed", data: err.message};            
        }
    }

    async listUsers():Promise<{status: string, msg: string, data: object[]}>{
        try{
            const resUser = await this.prisma.user.findMany({
                select:{
                    id: true,
                    userName: true,
                    userFullName: true,
                    userEmail:true,
                    userGroup: true,
                    isActive: true,
                    lastSucessfulLogin: true,
                    isLocked: true,
                    lockDate: true,
                    noAttempt: true,
                    createdBy: true,
                    createdOn: true,
                    editedBy: true,
                    editedOn: true
                }
            });
            if (!resUser){
                return {status: "88", msg: "No record(s) found", data: resUser}; 
            }else{
                return {status: "00", msg: "Successful", data: resUser};   
            } 
        }catch(err){
            //console.log(err);
            return {status: "99", msg: "Failed", data: err.message};            
        }
    }
}
