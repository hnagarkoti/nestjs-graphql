import { InputType, Field } from '@nestjs/graphql';
import { IsObject, IsString } from 'class-validator';



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

  @Field(() => String, { description: 'Users password' })
  password: string;

  // @IsObject()
  // @Field(() => Object, { description: 'Pass user metadata information'})
  // userMetadata: object;

  // @IsString()
  // @Field(() => String, { description: 'role of the user' })
  // role: string;
}