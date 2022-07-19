import { forwardRef, Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListUsersInput } from './dto/list-users.input';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../common/services/auth.service';
import { LoginUserInput } from './dto/ login-user.input';
import { Hash } from 'crypto';

const fileName = `users.service.ts`;
enum HASH{
  SALTORROUNDS = 10
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    @Inject(forwardRef(() => AuthService))
    private readonly userModel: Model<User>,
    private readonly authService: AuthService,
    ) {}
  private readonly logger = new Logger(fileName)
    
  async create(createUserInput: CreateUserInput) {
    this.logger.debug(`createUserInput called`, createUserInput);
    const password = createUserInput.password;
    createUserInput.password = await bcrypt.hash(password, HASH.SALTORROUNDS);
    console.log(HASH.SALTORROUNDS  , "this is value");
    const user = new this.userModel(createUserInput);
    return user.save();
  }

  async loginUser(loginUserInput: LoginUserInput) {
    const user = await this.authService.validateUser(
      loginUserInput.email,
      loginUserInput.password,
    );
    console.log(user ,'this is user')
    if (!user) {
      throw new BadRequestException(`Email or password are invalid`);
    } else {
      return this.authService.generateUserCredentials(user);
    }
  }
  

  findAll(paginationQuery: ListUsersInput) {
    const { limit, offset } = paginationQuery;
    return this.userModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

 async findOneByEmail(email: string){
    const user = await this.userModel.findOne({email:email});
    return user;
 }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const existingUser = await this.userModel
      .findOneAndUpdate({ _id: id }, { $set: updateUserInput }, { new: true })
      .exec();

    if (!existingUser) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return existingUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return user.remove();
  }

  async getUsers(paginationQuery: ListUsersInput) {
    const count = await this.userModel.count();
    const users = await this.findAll(paginationQuery);
    return { users, count };
  }
}