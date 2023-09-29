import { MotelsCoreService } from '@/services/motels/motels.core.service';
import { CreateMotelDto, SearchRooms, UpdateMotelDto } from '@/shared/dtos';
import { findLocationsByKilometers } from '@/shared/utils/function.global';
import { LocationType, Pagination } from '@/shared/utils/type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MotelsService {
  constructor(private readonly motelCoreRepo: MotelsCoreService) {}

  // create
  async create(createMotelDto: CreateMotelDto) {
    // TODO: upload thumbnails
    // if (createMotelDto.thumnails && createMotelDto.thumnails.length > 0) {

    // }
    return await this.motelCoreRepo.create(createMotelDto);
  }

  // update
  async update(updateMotelDto: UpdateMotelDto) {
    // TODO: upload thumbnails

    // TODO: update motel detail

    return await this.motelCoreRepo.update(updateMotelDto);
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
}
