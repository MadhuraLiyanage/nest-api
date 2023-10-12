import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsergroupController } from './usergroup/usergroup.controller';
import { UsergroupService } from './usergroup/usergroup.service';
import { UsergroupModule } from './usergroup/usergroup.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule, 
    UsergroupModule,
    UserModule,
    EmployeeModule, 
    PrismaModule, UsergroupModule],
  controllers: [UsergroupController],
  providers: [UsergroupService]
})
export class AppModule {}
