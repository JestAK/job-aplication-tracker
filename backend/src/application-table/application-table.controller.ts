import { Controller, Get } from '@nestjs/common';
import { ApplicationTableService } from './application-table.service.js';

@Controller('application-table')
export class ApplicationTableController {
  constructor(
    private readonly applicationTableService: ApplicationTableService,
  ) {}

  @Get('all')
  async getAllApplications() {
    return this.applicationTableService.getAllApplications();
  }
}
