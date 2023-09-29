import {
  Body,
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from '@/services/files/files.service';
import { LocalAuthGuard, RefreshTokenGuard, RolesGuard } from '@/shared/guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '@/shared/configs/multer.config';
import { CreateOtpDto, CreateUserDto } from '@/shared/dtos';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles as RolesEnum } from '@/shared/utils/variables';
import { Roles } from '@/shared/decorators';
import { AuthsService } from './auths.service';

@Controller('auths')
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private readonly filesService: FilesService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return await this.authsService.login(req.user);
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('avatar', multerOptions)) // validate, filter file
  async register(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Upload avatar
    const avatar = (await this.filesService.uploadOneFile(file)).path;

    // Filters the properties: password, ...
    return await this.authsService.register({ ...createUserDto, avatar });
  }

  @Post('register-with-phone-number')
  async registerWithPhoneNumber(@Body() body: { phoneNumber: string }) {
    return await this.authsService.registerWithPhoneNumber(body.phoneNumber);
  }

  @Post('add-user-profiles')
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async addUserProfiles(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Upload avatar
    const avatar = (await this.filesService.uploadOneFile(file)).path;
    // Filters the properties: password, ...
    return await this.authsService.addUserInfo({ ...createUserDto, avatar });
  }

  @Post('generate-otp')
  async generateOtp(@Body() @Body() body: { phoneNumber: string }) {
    return await this.authsService.generateOtp(body.phoneNumber);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() createOtpDto: CreateOtpDto) {
    return await this.authsService.verifyOtp(createOtpDto);
  }

  @Post('refresh')
  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  async refreshToken(@Request() req) {
    return await this.authsService.refresh(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @Post('rollback-token')
  rollbackToken(@Request() req) {
    return this.authsService.rollbackToken(req.user.sub);
  }
}
