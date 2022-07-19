import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Logger, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ListUsersInput } from './dto/list-users.input';
import { LoggedUserOutput } from './dto/logged-user.output';
import { LoginUserInput } from './dto/ login-user.input';
import { UseGuards } from '@nestjs/common';
import {JwtAuthGuard} from '../common/auth/jwt-auth.guard';


import ConnectionArgs, {
  getPagingParameters,
} from '../common/relay/connection.args';
import { connectionFromArraySlice } from 'graphql-relay';
import { ListUsersResponse } from './dto/list.users.response';

const fileName = `users.resolver.ts`;

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(fileName);

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    let newUser =  await this.usersService.create(createUserInput);
    return newUser;
  }

  @Query(() => [User], { name: 'users' })
  findAll(@Args('listUsersInput') listUsersInput: ListUsersInput) {
    this.logger.log('Doing something...');
    return this.usersService.findAll(listUsersInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => ListUsersResponse, { name: 'listUsersWithCursor' })
  async findAllWithCursor(
    @Args('args') args: ConnectionArgs,
  ): Promise<ListUsersResponse> {
    const { limit, offset } = getPagingParameters(args);
    const { users, count } = await this.usersService.getUsers({
      limit,
      offset,
    });
    const page = connectionFromArraySlice(users, args, {
      arrayLength: count,
      sliceStart: offset || 0,
    });

    return { page, pageData: { count, limit, offset } };
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('_id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }


  @Query(() => User, { name: 'user' })
  findOneByEmail(@Args('email', { type: () => String }) email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput._id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('_id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }

  @Mutation(() => LoggedUserOutput)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.usersService.loginUser(loginUserInput);
  }

}