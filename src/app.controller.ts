import { Controller, Get, Injectable } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('auths')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
