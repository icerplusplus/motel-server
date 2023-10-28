import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseUUIDPipe,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import {
  CreateMotelDto,
  SearchByOwnerDto,
  SearchRooms,
  UpdateMotelDto,
} from '@/shared/dtos';
import { Pagination } from '@/shared/utils/type';
import { MotelsService } from './motels.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from '@/services/files/files.service';
import { multerOptions } from '@/shared/configs/multer.config';

@Controller('motels')
export class MotelsController {
  constructor(
    private readonly motelsService: MotelsService,
    private readonly filesService: FilesService,
  ) {}
  // find rooms by user'location
  @Post('find-rooms-by-location')
  async findRoomByLocation(@Body() body: SearchRooms) {
    const rooms = await this.motelsService.findRoomsByLocation(body);
    return { statusCode: 200, message: 'OK', data: rooms };
  }

  @Post('find-by-owner-id')
  async findByOwnerId(@Body() body: SearchByOwnerDto) {
    const posts = await this.motelsService.findByOwnerId(body.ownerId, {
      page: body.page,
      size: body.size,
    });
    return { statusCode: 200, message: 'OK', data: posts };
  }

  @Post('upload-images')
  @UseInterceptors(FilesInterceptor('thumbnails', 20, multerOptions))
  async uploadImages(@UploadedFiles() files: Array<Express.Multer.File>) {
    // Get image files
    const imageList = await this.filesService.uploadMutipleFiles(files);
    // Map to get image path
    const thumbnails = imageList.map?.((image) => image.path);
    // Filter properties of Product entity and response

    return { statusCode: 200, message: 'OK', data: thumbnails };
  }

  // create
  @Post()
  async create(@Body() createMotelDto: CreateMotelDto) {
    const newMotel = await this.motelsService.create(createMotelDto);
    return { statusCode: 200, message: 'OK', data: newMotel };
  }

  // update
  @Put()
  async update(updateMotelDto: UpdateMotelDto) {
    const updatedMotel = await this.motelsService.update({
      ...updateMotelDto,
    });
    return { statusCode: 200, message: 'OK', data: updatedMotel };
  }

  // delete
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.motelsService.softDelete(id);
    return { statusCode: 200, message: 'OK', data: result.affected === 1 };
  }

  // find by id
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.motelsService.findById(id);
    return { statusCode: 200, message: 'OK', data };
  }

  // find and pagination
  @Get()
  async findAndPagination(@Query() paginate: Pagination) {
    const data = await this.motelsService.findAndPagination(paginate);
    return { statusCode: 200, message: 'OK', data };
  }
}
