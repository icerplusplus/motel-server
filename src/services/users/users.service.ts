import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@/shared/entities';
import { CreateUserParams, UpdateUserParams } from '@/shared/dtos';
import { Pagination } from '@/shared/utils/type';
import { userDisplay } from '@/shared/utils/function.global';
import { Roles } from '@/shared/utils/variables';

@Injectable()
export class UserCoreService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByAdminAccount(phoneNumber: string) {
    return await this.userRepository.findOne({
      where: {
        phoneNumber,
        role: Roles.ADMIN,
      },
    });
  }
  async findByToken(token: string) {
    return await this.userRepository.findOne({
      where: {
        token,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return await this.userRepository.findOne({
      where: {
        ID: id,
      },
    });
  }

  async create(createUserParams: CreateUserParams) {
    const newUser = this.userRepository.create(createUserParams);
    const userSaved = await this.userRepository.save(newUser);
    return userDisplay(userSaved);
  }

  async findAndPagination(pagination: Pagination) {
    const [list, count] = await this.userRepository.findAndCount({
      order: {
        CreatedAt: 'DESC',
      },
      skip: (pagination.page - 1) * pagination.size,
      take: pagination.size,
    });

    return {
      users: list.map((user) => userDisplay(user)),
      pagination: {
        ...pagination,
        count,
      },
    };
  }

  async findByPhoneNumber(phoneNumber: string) {
    const user = await this.userRepository.findOne({
      where: { phoneNumber },
    });
    return user;
  }

  async update(id: string, updateUserParams: UpdateUserParams) {
    const findUser = await this.findById(id);
    const user = await this.userRepository.save({
      ...findUser,
      ...updateUserParams,
    });

    return userDisplay(user);
  }

  async softDelete(id: string) {
    return await this.userRepository.softDelete(id);
  }
}
