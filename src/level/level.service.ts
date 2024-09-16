import { Injectable } from '@nestjs/common';
import { SubjectService } from '../subject/subject.service';
import { LEVELS } from './bdd';
import { LevelSubjectInterface } from './level';

@Injectable()
export class LevelService {
  constructor(private readonly SubjectService: SubjectService) {}
  findLevelAndSubjectByName(name: string): LevelSubjectInterface[] {
    const level = LEVELS.find((l) => l.name === name);
    const subjects = this.SubjectService.FindAll();
    const filteredSubject = subjects.filter((s) => s.levelId === level.id);
    return filteredSubject.map<LevelSubjectInterface>((subject) => ({
      subject,
      level,
    }));
  }
}
