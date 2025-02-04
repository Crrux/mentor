import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { InterfacePostSubject } from './subject';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configServive: ConfigService,
  ) {}

  async findAll(): Promise<SubjectEntity[]> {
    let subjects = await this.cacheManager.get<SubjectEntity[]>('findAll');

    if (!subjects || subjects.length === 0) {
      subjects = await this.subjectRepository.find();
      await this.cacheManager.set('findAll', subjects, 0); // Cache for 1 hour
    }
    return subjects;
  }

  async findOneById(id: number): Promise<SubjectEntity> {
    const subject = await this.subjectRepository.findOneBy({ id });
    if (!subject) {
      throw new HttpException(
        `no subject with id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return subject;
  }

  findOneByName(name: string): Promise<SubjectEntity> {
    return this.subjectRepository.findOneBy({ name });
  }

  async createNewSubject({
    name,
  }: InterfacePostSubject): Promise<SubjectEntity> {
    return this.subjectRepository.save({
      name,
    });
  }

  findFavorite(): string {
    return this.configServive.get<string>('FAVORITE_SUBJECT');
  }
}
