import { Inject, Injectable } from '@nestjs/common';
import { TOKEN_LEVELS } from 'src/bdd/constante';
import { LevelInterface, LevelSubjectInterface } from 'src/level/level';
import { BddService } from '../bdd/bdd.service';
import { ConfigService } from '../config/config.service';
import { InterfacePostSubject, InterfaceSubject } from './subject';

@Injectable()
export class SubjectService {
  constructor(
    private BddService: BddService,
    @Inject(TOKEN_LEVELS) private bddLevels: LevelInterface[],
    private configService: ConfigService,
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
    return [...this.FindAll(), { id: newId, name, levelId: 1 }];
  }

  levelAndSubjectFromName(name: string): LevelSubjectInterface[] {
    const subject = this.FindAll().find((s) => s.name === name);
    const filteredLevel = this.bddLevels.filter(
      (l) => l.id === subject.levelId,
    );
    return filteredLevel.map((level) => ({
      level,
      subject,
    }));
  }

  findFavorite(): string {
    return this.configService.get('FAVORITE_SUBJECT');
  }
}
