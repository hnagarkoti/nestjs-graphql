import { UserStatus, UserStatusSchema } from '../entities/status.entity';
import { ObjectType } from '@nestjs/graphql';
import { RelayTypes } from '../../common/relay/relay.types';

@ObjectType()
export class ListRolesResponse extends RelayTypes<UserStatus>(UserStatus) {}