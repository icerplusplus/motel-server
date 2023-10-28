import { Pagination } from '@/shared/utils/type';
import { Controller, Get, Body, Post, Param, Delete } from '@nestjs/common';
import { BillsService } from './bills.service';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post('get-bills')
  async findAll(@Body() body: Pagination) {
    return await this.billsService.find(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.billsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.billsService.remove(id);
  }
}
