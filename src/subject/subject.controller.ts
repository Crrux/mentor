import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LevelSubjectInterface } from 'src/level/level';
import { InterfacePostSubject, InterfaceSubject } from './subject';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  findAll(): InterfaceSubject[] {
    return this.subjectService.FindAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): InterfaceSubject {
    return this.subjectService.FindOneById(+id);
  }

  @Get(':name/level')
  findLevelAndSubject(@Param('name') name: string): LevelSubjectInterface[] {
    return this.subjectService.levelAndSubjectFromName(name);
  }

  @Post()
  addSubject(@Body() subject: InterfacePostSubject): InterfaceSubject[] {
    return this.subjectService.CreateNewSubject(subject);
  }
}
