import { Injectable, BadRequestException } from '@nestjs/common';
import { MotelsCoreService } from '@/services/motels/motels.core.service';
import { CreateMotelDto, SearchRooms, UpdateMotelDto } from '@/shared/dtos';
import { findLocationsByKilometers } from '@/shared/utils/function.global';
import { Pagination } from '@/shared/utils/type';
import { CategoriesCoreService } from '@/services/categories/categories.service';
import { UserCoreService } from '@/services/users/users.service';

@Injectable()
export class MotelsService {
  constructor(
    private readonly motelCoreRepo: MotelsCoreService,
    private readonly categoryCoreService: CategoriesCoreService,
    private readonly userCoreService: UserCoreService,
  ) {}

  // create
  async create(createMotelDto: CreateMotelDto) {
    const category = await this.categoryCoreService.findOne(
      createMotelDto.category,
    );
    if (!category) throw new BadRequestException('Thể loại không chính xác');

    const owner = await this.userCoreService.findById(createMotelDto.owner);
    if (!owner)
      throw new BadRequestException('Thông tin chủ sở hữu không chính xác');

    return await this.motelCoreRepo.create({
      ...createMotelDto,
      category: category,
      owner,
    });
  }

  // update
  async update(updateMotelDto: UpdateMotelDto) {
    const motel = await this.motelCoreRepo.findById(updateMotelDto.ID);
    if (!motel) throw new BadRequestException('Post not found!');

    // TODO: update category
    const category = await this.categoryCoreService.findOne(
      updateMotelDto.category,
    );
    if (!category) throw new BadRequestException('Thể loại không chính xác');

    const owner = await this.userCoreService.findById(updateMotelDto.owner);
    if (!owner) throw new BadRequestException('Owner không chính xác');

    return await this.motelCoreRepo.update({
      ...motel,
      ...updateMotelDto,
      category: category,
      owner,
    });
  }

  // delete
  async softDelete(id: string) {
    return await this.motelCoreRepo.softDelete(id);
  }

  // find by id
  async findById(id: string) {
    return await this.motelCoreRepo.findById(id);
  }

  // find and pagination
  async findAndPagination(pagination: Pagination) {
    return await this.motelCoreRepo.findAndPagination(pagination);
  }

  async findRoomsByLocation(options: SearchRooms) {
    const motels = await this.motelCoreRepo.findWithoutPagination();
    return findLocationsByKilometers(
      { latitude: options.latitude, longitude: options.longitude },
      motels,
      options.radius || 2,
    );
  }

  async findByOwnerId(ownerId: string, pagination: Pagination) {
    return await this.motelCoreRepo.findByUserId(ownerId, pagination);
  }
}
