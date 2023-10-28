import {
  CreateMotelDto,
  CreateMotelParams,
  UpdateMotelDto,
  UpdateMotelParams,
} from '@/shared/dtos';
import { MotelEntity } from '@/shared/entities';
import { userWithoutPasswordField } from '@/shared/utils/function.global';
import { Pagination } from '@/shared/utils/type';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MotelsCoreService {
  constructor(
    @InjectRepository(MotelEntity)
    private readonly motelRepo: Repository<MotelEntity>,
  ) {}

  // create
  async create(createMotelDto: CreateMotelParams) {
    // TODO: upload thumbnails
    // if (createMotelDto.thumnails && createMotelDto.thumnails.length > 0) {

    // }
    const newMotel = this.motelRepo.create(createMotelDto);
    return await this.motelRepo.save(newMotel);
  }

  // update
  async update(updateMotelDto: UpdateMotelParams) {
    return await this.motelRepo.save({ ...updateMotelDto });
  }

  // delete
  async softDelete(id: string) {
    return await this.motelRepo.softDelete(id);
  }

  // find by id
  async findById(id: string) {
    const data = await this.motelRepo.findOne({
      where: {
        ID: id,
      },
      relations: ['comments', 'owner', 'category'],
    });
    delete data.owner.password;
    delete data.owner.token;
    return data;
  }

  // find and pagination
  async findAndPagination(pagination: Pagination) {
    const [list, count] = await this.motelRepo.findAndCount({
      where: {
        isChecked: true,
      },
      relations: ['comments', 'owner', 'category'],
      order: {
        CreatedAt: 'DESC',
      },
      skip: (pagination.page - 1) * pagination.size,
      take: pagination.size,
    });

    return {
      motels: list.map((motel) => ({
        ...motel,
        owner: userWithoutPasswordField(motel.owner),
      })),
      pagination: {
        ...pagination,
        count,
      },
    };
  }

  async findByUserId(userId: string, pagination: Pagination) {
    const [list, count] = await this.motelRepo.findAndCount({
      where: {
        owner: {
          ID: userId,
        },
      },
      relations: ['comments', 'owner', 'category'],
      order: {
        CreatedAt: 'DESC',
      },
      skip: (pagination.page - 1) * pagination.size,
      take: pagination.size,
    });

    return {
      motels: list.map((motel) => ({
        ...motel,
        owner: userWithoutPasswordField(motel.owner),
      })),
      pagination: {
        ...pagination,
        count,
      },
    };
  }

  async findWithoutPagination() {
    const [list] = await this.motelRepo.findAndCount({
      where: {
        isChecked: true,
      },
      relations: ['comments', 'owner', 'category'],
      order: {
        CreatedAt: 'DESC',
      },
    });
    return list.map((motel) => ({
      ...motel,
      owner: userWithoutPasswordField(motel.owner),
    }));
  }
}
