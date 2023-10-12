import { Body, Controller, Get, HttpStatus, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserGroupDto } from './dto';
import { UsergroupService } from './usergroup.service';

@Controller('api/v1.0/usergroup')
@UseGuards(AuthGuard('jwt'))
export class UsergroupController {
    constructor(private userGroupService: UsergroupService){}

    @Post("create")
    signup(@Body() dto: UserGroupDto, @Res() response){
        this.userGroupService.createUserGroup(dto).then(resposeData=>{
            if (resposeData.status=="99"){
                return response.status(HttpStatus.BAD_REQUEST).send(resposeData);
            }else{
                return response.status(HttpStatus.OK).send(resposeData);
            }
        });
    }

    @Get("find") //Query parameter
    findUserGroup(@Query('userGroupCode') userGroupCode: string, @Res() response) {
        const rest = this.userGroupService.findUserGroup(userGroupCode).then(resposeData=>{
            if (resposeData.status=="99"){
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(resposeData);
            }else{
                return response.status(HttpStatus.OK).send(resposeData);
            }
        });
    }

    @Get("listUserGroups") //Query parameter
    listUserGroups(@Res() response) {
        const rest = this.userGroupService.listUserGroups().then(resposeData=>{
            if (resposeData.status=="99"){
                return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(resposeData);
            }else{
                return response.status(HttpStatus.OK).send(resposeData);
            }
        });
    }
}

