import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field(() => String, { description: 'first name of the user' })
  firstName: string;

  @IsString()
  @Field(() => String, { description: 'last name of the user' })
  lastName: string;

  @IsString()
  @Field(() => String, { description: 'email of the user' })
  email: string;

  @IsString()
  @Field(() => String, { description: 'role of the user' })
  role: string;
}