import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AnnounceService } from './announce.service';
import { AnnounceEntity } from './entities/announce.entity';
import { CreateAnnounceDto } from './interface/create-announce.dto';
import { SeachQuery } from './interface/search-query';

@Controller('announce')
export class AnnounceController {
  constructor(private announceService: AnnounceService) {}
  @Post()
  createAnnounce(@Body() body: CreateAnnounceDto): Promise<AnnounceEntity> {
    return this.announceService.createAnnounce(body);
  }

  @Get('search')
  searchAnnounce(
    @Query() { levelName, subjectName }: SeachQuery,
  ): Promise<AnnounceEntity> {
    return this.announceService.searchAnnounce({ levelName, subjectName });
  }
}
