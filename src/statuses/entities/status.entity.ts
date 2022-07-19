import { ObjectType, Field } from "@nestjs/graphql";
import mongoose, { Schema as MongooseSchema, Document} from "mongoose";
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'

enum StatusEnum {
    ACTIVE ,
    DEACTIVE
}

@Schema()
@ObjectType()
export class UserStatus {
    @Field(() => String)
    _id: MongooseSchema.Types.ObjectId;

    @Prop({ enum: StatusEnum })
    @Field(() => String, { description: 'User status such as active and deactive' })
    status: string;


    @Field(() => Number, { description: 'Status id only will be 1 and 2 for now' })
    statusId: number;

    @Prop({ default: Date.now() })
    @Field(() => Date, { description: 'Role createAt' })
    createdAt: Date;
}

export const UserStatusSchema = SchemaFactory.createForClass(UserStatus);