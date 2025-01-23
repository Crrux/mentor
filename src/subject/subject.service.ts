import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelSubjectInterface } from 'src/level/level';
import { Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { SubjectEntity } from './entities/subject.entity';
import { InterfacePostSubject } from './subject';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    private configService: ConfigService,
  ) {}
  FindAll(): Promise<SubjectEntity[]> {
    return this.subjectRepository.find();
  }

  FindOneById(id: number): Promise<SubjectEntity> {
    return this.subjectRepository.findOneBy({ id });
  }

  async CreateNewSubject({
    name,
  }: InterfacePostSubject): Promise<SubjectEntity> {
    const newSubject = await this.subjectRepository.save({ name });
    return newSubject;
  }

  async levelAndSubjectFromName(name: string): Promise<LevelSubjectInterface> {
    const subject = await this.subjectRepository.findOneBy({ name });
    return {
      subject: {
        id: subject.id,
        name: subject.name,
      },
      level: {
        id: subject.level.id,
        name: subject.level.name,
      },
    };
  }

  findFavorite(): string {
    return this.configService.get('FAVORITE_SUBJECT');
  }
}
