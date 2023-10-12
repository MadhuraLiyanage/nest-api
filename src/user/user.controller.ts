import { Controller, Get, HttpStatus, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('api/v1.0/users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private userService: UserService){}
    
    @Get("listUsers")
    listUsers(@Res() response){
        this.userService.listUsers().then(resposeData=>{
            if (resposeData.status=="99"){
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(resposeData);
            }else{
                return response.status(HttpStatus.OK).send(resposeData);
            }
        });
    }

    /*@Get("findUser/:userName") //Path parameters
    findUser(@Param("userName") userName: string){
        return this.authService.findUser(userName);
    }*/

    @Get("find") //Query parameter
    findUser(@Query('userName') userName: string, @Res() response) {
        const rest = this.userService.findUser(userName).then(resposeData=>{
            if (resposeData.status=="99"){
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(resposeData);
            }else{
                return response.status(HttpStatus.OK).send(resposeData);
            }
        });
    }

    @Get('me')
    async getMe(@Req() req: Request){
        const user = req.user;
        return {status: "00", msg: "Successful", data: user};
    }
}
