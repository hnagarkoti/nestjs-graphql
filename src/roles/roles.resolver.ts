import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { Role } from "./entities/role.entity"; 
import { RolesService } from "./roles.service";
import { CreateRoleInput } from './dto/create-role.input';
import { Logger } from '@nestjs/common';



const fileName = 'roles.resolver.ts';


@Resolver(() => Role)
export class RolesResolver {
    constructor(private readonly rolesService: RolesService) {}
    private readonly logger =  new Logger(fileName);

    @Mutation(() => Role)
    createRole(@Args('createUserInput') createRoleInput: CreateRoleInput) {
        return this.rolesService.create(createRoleInput);
    }
}