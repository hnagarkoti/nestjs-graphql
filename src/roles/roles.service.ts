import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Role } from './entities/role.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListRolesInput } from './dto/list-roles.input';
import { Logger } from '@nestjs/common';

const fileName = `roles.service.ts`;

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
    ) {}
  private readonly logger = new Logger(fileName)
    
  create(createRoleInput: CreateRoleInput) {
    this.logger.debug(`createRoleInput called`, createRoleInput);
    const user = new this.roleModel(createRoleInput);
    return user.save();
  }

  findAll(paginationQuery: ListRolesInput) {
    const { limit, offset } = paginationQuery;
    return this.roleModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string) {
    const user = await this.roleModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateRoleInput: UpdateRoleInput) {
    const existingRole = await this.roleModel
      .findOneAndUpdate({ _id: id }, { $set: updateRoleInput }, { new: true })
      .exec();

    if (!existingRole) {
      throw new NotFoundException(`Role ${id} not found`);
    }
    return existingRole;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return user.remove();
  }

  async getUsers(paginationQuery: ListRolesInput) {
    const count = await this.roleModel.count();
    const roles = await this.findAll(paginationQuery);
    return { roles, count };
  }
}