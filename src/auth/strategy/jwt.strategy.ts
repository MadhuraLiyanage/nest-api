import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt',){
    constructor(config: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    validate(payload: any){
        return {
            id: payload.sub.id,
            userName: payload.sub.userName, 
            userFullName: payload.sub.userFullName, 
            userEmail: payload.sub.userEmail,
            userGroupCode: payload.sub.userGroupCode,
            userGroupDescription: payload.sub.userGroupDescription,
            isActive: payload.sub.isActive,
            lastSuccessfulLogin: payload.sub.lastSuccessfulLogin,
            isLocked: payload.sub.isLocked,
            noAttempt: payload.sub.noAttempt,
            lockDate: payload.sub.lockDate,
            createdBy: payload.sub.createdBy,
            createdOn: payload.sub.createdOn,
            editedBy: payload.sub.editedBy,
            editedOn: payload.sub.editedOn,
        };
    }
}
