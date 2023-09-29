import { OtpsCoreService } from '@/services/otps/otps.core.service';
import { UserCoreService } from '@/services/users/users.service';
import {
  CreateOtpDto,
  CreateUserParams,
  RefreshParams,
  UserDto,
} from '@/shared/dtos';
import {
  compare,
  encode,
  encodePassword,
  passwordCompare,
} from '@/shared/utils/bcrypt';
import {
  sendSmsMessage,
  userWithoutPasswordField,
} from '@/shared/utils/function.global';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthsService {
  constructor(
    private readonly userService: UserCoreService,
    private readonly otpService: OtpsCoreService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(user: Partial<UserDto>) {
    const payload = { email: user.email, sub: user.ID, role: user.role };

    // generate JWT token
    // access token
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
    });

    // refresh token
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN'),
    });

    const findUser = await this.userService.findById(user.ID);

    if (findUser) {
      // TODO: Save refresh token to database
      await this.userService.update(findUser.ID, { token: refreshToken });
    }
    return {
      ...user,
      accessToken,
      refreshToken,
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    // TODO: find user by username in database
    const user = await this.userService.findByEmail(email);

    // If user is found
    if (user) {
      // TODO: compare password
      const isPasswordValid = await passwordCompare(password, user.password);

      // Password incorrect
      if (!isPasswordValid) return null;

      // Password is valid
      return user;
    }
    return null;
  }

  async validatePhoneNumber(phoneNumber: string, password: string) {
    const user = await this.userService.findByPhoneNumber(phoneNumber);

    // If user is found
    if (user) {
      // TODO: compare password
      const isPasswordValid = await passwordCompare(password, user.password);

      // Password incorrect
      if (!isPasswordValid) return null;

      // Password is valid
      return user;
    }
    return null;
  }

  async register(createUserParams: CreateUserParams) {
    try {
      // check user have been existing before
      const checkUser = await this.userService.findByEmail(
        createUserParams.email,
      );

      if (checkUser) throw new BadRequestException('User already exists');

      // hash password by bcrypt handler(custom)
      const paswordHashed = await encodePassword(createUserParams.password);

      // use create() of user repository to create new user
      const newUser = await this.userService.create({
        ...createUserParams,
        password: paswordHashed,
      });

      // response
      return newUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async addUserInfo(createUserParams: CreateUserParams) {
    try {
      // check user have been existing before
      const checkEmail = await this.userService.findByEmail(
        createUserParams.email,
      );

      if (checkEmail) throw new BadRequestException('Email đã được đăng ký!');

      // hash password by bcrypt handler(custom)
      const paswordHashed = await encodePassword(createUserParams.password);

      // use create() of user repository to create new user
      const newUser = await this.userService.create({
        ...createUserParams,
        password: paswordHashed,
      });

      const token = await this.login({
        phoneNumber: newUser.phoneNumber,
        ID: newUser.ID,
        role: newUser.role,
      });
      // response
      return token;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async registerWithPhoneNumber(phoneNumber: string) {
    // find user phone number
    const isPhoneNumberExist = await this.userService.findByPhoneNumber(
      phoneNumber,
    );

    if (isPhoneNumberExist)
      throw new BadRequestException('Số điện thoại đã được đăng ký');

    return {
      status: 200,
      message: 'Bạn có 5 phút để nhập mã OTP',
    };
  }

  async generateOtp(phoneNumber: string) {
    // generate otp
    const newOtp = await this.otpService.generate();

    // send this OTP to phone number by TWILIO
    const message = newOtp + ' là mã OTP của bạn trên ứng dụng MOTEL APP.';
    const status = await sendSmsMessage(message, phoneNumber);

    if (!status) throw new BadRequestException('Số điện thoại không hợp lệ');
    // if send success then hash it

    const hashOtp = await encode(newOtp);

    // save to database
    const saveOtp = await this.otpService.create({ phoneNumber, otp: hashOtp });

    if (!saveOtp)
      throw new BadRequestException(
        'Đã xảy ra lỗi trong quá trình khởi tạo OTP',
      );

    return { status: 200, otp: newOtp };
  }

  async verifyOtp(createOtpDto: CreateOtpDto) {
    const isOtpExist = await this.otpService.findByPhone(
      createOtpDto.phoneNumber,
    );
    if (!isOtpExist)
      throw new BadRequestException('Mã xác thực OTP không chính xác!');

    const isOtpValid = await compare(createOtpDto.otp, isOtpExist.otp);

    if (!isOtpValid)
      throw new BadRequestException('Mã xác thực OTP không chính xác!');

    return {
      confirm: true,
    };
  }

  async refresh(payloadParams: RefreshParams) {
    // TODO: generate new access token
    const { ID, email, role } = payloadParams;

    // TODO: something...
    return {
      accessToken: await this.jwtService.signAsync(
        {
          ID,
          email,
          role,
        },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
        },
      ),
    };
  }

  rollbackToken(userId: string) {
    return this.userService.update(userId, { token: null });
  }
}
