import { Module , forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {UserSchema } from './entities/user.entity';
import { CommonModule } from '../common/common.module';
import { AuthModule } from 'src/common/auth.module';


@Module({
  imports: [
    CommonModule,
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{name:'User' , schema: UserSchema}])
  ],
  providers: [UsersResolver, UsersService],
  exports:[UsersService]
})
export class UsersModule {}