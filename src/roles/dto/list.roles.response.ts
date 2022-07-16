import { Role } from '../entities/role.entity';
import { ObjectType } from '@nestjs/graphql';
import { RelayTypes } from '../../common/relay/relay.types';

@ObjectType()
export class ListRolesResponse extends RelayTypes<Role>(Role) {}