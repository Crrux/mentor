import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { LevelSubjectInterface } from 'src/level/level';
import { LevelService } from 'src/level/level.service';
import { BddService } from '../bdd/bdd.service';
import { SUBJECTS } from './bdd';
import { InterfacePostSubject, InterfaceSubject } from './subject';

@Injectable()
export class SubjectService {
  constructor(
    private BddService: BddService,
    @Inject(forwardRef(() => LevelService))
    private levelService: LevelService,
  ) {}
  FindAll(): InterfaceSubject[] {
    return this.BddService.get<InterfaceSubject>('subjects');
  }

  FindOneById(id: number) {
    return this.BddService.getById<InterfaceSubject>('subjects', id);
  }

  CreateNewSubject({ name }: InterfacePostSubject): InterfaceSubject[] {
    const sortedByIdSubject = this.FindAll().sort((a, b) => a.id - b.id);
    const newId = sortedByIdSubject[sortedByIdSubject.length - 1].id + 1;
    return [...SUBJECTS, { id: newId, name, levelId: 1 }];
  }

  levelAndSubjectFromName(name: string): LevelSubjectInterface[] {
    const subject = this.FindAll().find((s) => s.name === name);
    const filteredLevel = this.levelService
      .findAll()
      .filter((l) => l.id === subject.levelId);
    return filteredLevel.map((level) => ({
      level,
      subject,
    }));
  }
}
