import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthDto, SigninDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt/dist';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService, 
        private jwt: JwtService,
        private config: ConfigService,
        private userService: UserService,
    ){}

    async signup(dto: AuthDto):Promise<{status: string, msg: string, data: object}>{
        try{
            //generate password hash
            const hashPassword = await argon.hash(dto.userPassword.toString());

            //check userName in the user table
            const userFindResults = await this.userService.findUser(dto.userName.toString());
            if (!userFindResults.data){
                //save the new user detail in DB
                const user = await this.prisma.user.create({
                    data: {
                        id: dto.id,
                        userName: dto.userName.toString(),
                        userPassword: hashPassword.toString(),
                        userEmail: dto.userEmail.toString(),
                        userFullName: dto.userFullName.toString(),
                        userGroupCode: dto.userGroupCode.toString(),
                        isActive: dto.isActive,
                        lastSucessfulLogin: null,
                        lockDate: null,                      
                        createdBy: dto.createdBy.toString(),
                        editedBy:"",
                    },
                    select:{
                        id: true,
                        userName: true,
                        userPassword: false,
                        userFullName: true,
                        userEmail: true,
                        userGroup: true,
                        isActive: true,
                        createdBy: true,
                        createdOn: true,
                        editedBy: true,
                        editedOn: true,
                    }
                })
                //return saved user
                return {status: "00", msg: "Successful", data: user};
            }
            else{
                return {status: "77", msg: "Record already exists", data: {
                    id: 0,
                    userName: userFindResults.data.userName, 
                    userEmail: userFindResults.data.userEmail,
                    userGroupCode: userFindResults.data.userGroupId,
                    isActive: userFindResults.data.isActive,
                    userFullName: userFindResults.data.userFullName,
                    createdOn: userFindResults.data.createdOn,
                    createdBy: userFindResults.data.createdBy,
                    editedOn: userFindResults.data.editedOn,
                    editedBy: userFindResults.data.editedBy, 
                }}
            }
        }catch(err){
            throw new InternalServerErrorException(err.detail);
        }
    }
    
    async signin(dto: SigninDto): Promise<{status: string, msg: string, data: object}>{
        //check for user name
        try{
            const user = this.userService.findUser(dto.userName.toString(),true);

            if (!(await user).data){
                return {status: "99", msg: "Invalid credentials", data: dto}
            }
    
            //check for password validity
            const pwMatch = await argon.verify(
                (await user).data.userPassword, 
                dto.userPassword.toString());    
            if (!pwMatch){
                return {status: "99", msg: "Invalid credentials", data:dto}
            }
        
            delete (await user).data.userPassword;
            
            const secretToken =  (await this.signToken((await user).data)).toString();
    
            //update last successfull login date and time
    
            return {status:"00", msg:"Successful", data: {access_token: secretToken}} ; 
        } catch (err) {
            throw new InternalServerErrorException(err.detail);
        }

    }
    signToken(user: User): Promise<string>{
        const jwtPayload ={
            sub: user
        }

        return this.jwt.signAsync(jwtPayload,{
            expiresIn: this.config.get('JWT_TOKEN_EXP'),
            secret: this.config.get('JWT_SECRET')

        })
    }

}
function body() {
    throw new Error('Function not implemented.');
}

