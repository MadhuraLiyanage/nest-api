import { Module } from '@nestjs/common';
import { UsergroupController } from './usergroup.controller';
import { UsergroupService } from './usergroup.service';

@Module({
    controllers: [UsergroupController],
    providers: [UsergroupService]
})
export class UsergroupModule {}
