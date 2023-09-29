import { Module } from '@nestjs/common';
import { MotelsModule } from './motels/motels.module';
import { MotelDetailsModule } from './motel-details/motel-details.module';
import { AuthsModule } from './auths/auths.module';

const apis = [MotelsModule, MotelDetailsModule, AuthsModule];

@Module({
  imports: [...apis],
  exports: [...apis],
})
export class ApiModule {}
