import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LevelService } from '../level/level.service';
import { SubjectService } from '../subject/subject.service';
import { AnnounceService } from './announce.service';
import { AnnounceEntity } from './entities/announce.entity';

describe('AnnounceService', () => {
  let subjectService = { findOneByName: jest.fn() };
  let levelService = { findOneByName: jest.fn() };
  let service: AnnounceService;
  let repository = { save: jest.fn() };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AnnounceService,
        {
          provide: getRepositoryToken(AnnounceEntity),
          useValue: repository,
        },
      ],
    })
      .useMocker((token) => {
        if (token === SubjectService) {
          return subjectService;
        }
        if (token === LevelService) {
          return levelService;
        }
      })
      .compile();
    service = module.get<AnnounceService>(AnnounceService);
  });

  describe('createAnnounce', () => {
    const spyLevel = jest
      .spyOn(levelService, 'findOneByName')
      .mockResolvedValue({
        id: 1,
        name: 'test-level',
      });
    const spySubject = jest
      .spyOn(subjectService, 'findOneByName')
      .mockResolvedValue({
        id: 1,
        name: 'test-subject',
      });

    const spyRepository = jest.spyOn(repository, 'save').mockResolvedValue({
      id: 1,
      price: 100,
      level: {
        id: 1,
        name: 'test-level',
      },
      subject: {
        id: 1,
        name: 'test-subject',
      },
    });
    it('should create an announce', async () => {
      const announceToCreate = {
        price: 100,
        level: {
          name: 'test-level',
        },
        subject: {
          name: 'test-subject',
        },
      };
      const result = await service.createAnnounce(announceToCreate);

      expect(result).toStrictEqual({
        id: 1,
        price: 100,
        level: {
          id: 1,
          name: 'test-level',
        },
        subject: {
          id: 1,
          name: 'test-subject',
        },
      });
      expect(spyLevel).toHaveBeenCalledWith('test-level');
      expect(spyLevel).toHaveBeenCalledTimes(1);
      expect(spySubject).toHaveBeenCalledWith('test-subject');
      expect(spySubject).toHaveBeenCalledTimes(1);
      expect(spyRepository).toHaveBeenCalledWith({
        price: 100,
        level: {
          id: 1,
          name: 'test-level',
        },
        subject: {
          id: 1,
          name: 'test-subject',
        },
      });
      expect(spyRepository).toHaveBeenCalledTimes(1);
    });
  });
});
