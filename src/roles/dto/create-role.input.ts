import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';



@InputType()
export class CreateRoleInput {
  @IsString()
  @Field(() => String, { description: 'Role Name' })
  name: string;
}