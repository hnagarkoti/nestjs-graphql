import { Module } from '@nestjs/common';
import { RoleSchema} from './entities/role.entity';
import { RolesResolver } from './roles.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from './roles.service'

@Module({
    imports: [
        MongooseModule.forFeature([{name:'Role' , schema: RoleSchema}])
      ],
      providers: [RolesResolver, RolesService],
})
export class RolesModule {}