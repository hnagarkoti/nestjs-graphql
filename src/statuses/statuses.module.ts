import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStatusSchema } from './entities/status.entity';

@Module({
    imports: [MongooseModule.forFeature([{name:'UserStatus' , schema: UserStatusSchema}])],
    controllers: [],
    providers: [],
})
export class StatusesModule {}
