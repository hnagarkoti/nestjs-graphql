import { ObjectType, Field, ID } from '@nestjs/graphql';
import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Role, RoleSchema } from '../../roles/entities/role.entity'

const ACTIVE = 1
const DE_ACTIVE = 0
const USER_STATUS = [DE_ACTIVE,ACTIVE]

export enum StatusEnum {
  ACTIVE = 1,
  DISABLED = 0
}

const userMetadata = {
  isVerified: { type: Number, require: true, enum: USER_STATUS, default: DE_ACTIVE }
};


@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: 'User firstName' })
  firstName: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'User lastName' })
  lastName: string;

  @Prop({
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  })
  @Field(() => String, { description: 'User email' })
  email: string;

  @Prop({ default: '' })
  @Field(() => String, { description: 'User password' })
  password: String;

  @Prop({ enum: StatusEnum, default: StatusEnum.ACTIVE })
  @Field(() => Number, { description: 'User status Active/Deactive'})
  status: Number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  @Field(() => ID, { description: 'User Role'})
  role: Role;

  @Prop({ default: Date.now() })
  @Field(() => Date, { description: 'User createAt' })
  createdAt: Date;

 

  // @Prop()
  // @Field(() => String, { description: 'User role' })
  // role: string;

  // @Prop(raw({
  //     status: { enum: USER_STATUS, required: true, default: ACTIVE }
  // }))
  // @Field(() => Number, { description: 'Status of User whether he is active or not'})
  // status: Number;
  // @Prop(raw({userMetadata}))
  // userMetadata: Record<string, any>[];
}



// @Schema() 
// class UserMetaData {
//   @Field(() => Number, { description: 'isVerified user'}) // any options will be evaluated
//   isVerified: Number; // data type will be checked
// }

export const UserSchema = SchemaFactory.createForClass(User);