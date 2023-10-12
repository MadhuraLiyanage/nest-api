import { Controller, Post, Body, Res, HttpStatus} from '@nestjs/common';
import { AuthDto, SigninDto } from 'src/auth/dto';
import { AuthService } from '../auth/auth.service';
import { error } from 'console';

@Controller("/api/v1.0/auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("signup")
    signup(@Body() dto: AuthDto, @Res() response){
        /*console.log({
            dto
        });*/
        this.authService.signup(dto).then(resposeData=>{
            if (resposeData.status=="99"){
                return response.status(HttpStatus.BAD_REQUEST).send(resposeData);
            }else{
                return response.status(HttpStatus.OK).send(resposeData);
            }
        }).catch(error => {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(
                {
                    "status" : 99, 
                    "msg": "Failed", 
                    "data": {
                        "error:": error.message
                    }
                }
            );        
        });
    }

    @Post("signin")
    signin(@Body() dto: SigninDto, @Res() response){
        this.authService.signin(dto).then(resData=>{
            if (resData.status=="00"){
                return response.status(HttpStatus.OK).send(resData);
            }else{
                return response.status(HttpStatus.BAD_REQUEST).send(resData);
            }
        }).catch(error => {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(
                {
                    "status" : 99, 
                    "msg": "Failed", 
                    "data": {
                        "error:": error.message
                    }
                }
            );        
        }); 
    }
}
