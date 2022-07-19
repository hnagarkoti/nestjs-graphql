import { ObjectType, Field } from "@nestjs/graphql";
import mongoose, { Schema as MongooseSchema, Document} from "mongoose";
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'

export enum PossibleRole {
    SUPERADMIN = 'SUPERADMIN',
    ADMIN = 'ADMIN',
    USER = 'USER',
    PROJECTOWNER = 'PROJECTOWNER'
}

@Schema()
@ObjectType()
export class Role {
    @Field(() => String)
    _id: MongooseSchema.Types.ObjectId;

    @Prop({ enum: PossibleRole, required: true, trim: true, lowercase: true, default: PossibleRole.USER })
    @Field(() => String, { description: 'User Role such as admin/user etc...' })
    name: string;

    @Prop({ default: Date.now() })
    @Field(() => Date, { description: 'Role createAt' })
    createdAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);