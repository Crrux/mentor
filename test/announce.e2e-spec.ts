import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AnnounceController } from '../src/announce/announce.controller';
import { AnnounceService } from '../src/announce/announce.service';
import { AnnounceEntity } from '../src/announce/entities/announce.entity';
import { LevelService } from '../src/level/level.service';
import { SubjectService } from '../src/subject/subject.service';

describe('Announce E2E Tests', () => {
  let app: INestApplication;
  let subjectService = { findOneByName: jest.fn() };
  let levelService = { findOneByName: jest.fn() };
  let service: AnnounceService;
  let repository = { save: jest.fn(), findOneBy: jest.fn() };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [AnnounceController],
      providers: [
        AnnounceService,
        { provide: getRepositoryToken(AnnounceEntity), useValue: repository },
        SubjectService,
        LevelService,
      ],
    })
      .overrideProvider(SubjectService)
      .useValue(subjectService)
      .overrideProvider(LevelService)
      .useValue(levelService)
      .compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('create announce', () => {
    const spyLevel = jest.spyOn(levelService, 'findOneByName');
    const spySubject = jest.spyOn(subjectService, 'findOneByName');
    const spyRepository = jest.spyOn(repository, 'save');
    const announceToCreate = {
      price: 100,
      level: {
        name: 'test-level',
      },
      subject: {
        name: 'test-subject',
      },
    };

    it('should create a new announce', async () => {
      spyLevel.mockResolvedValue({
        id: 1,
        name: 'test-level',
      });

      spySubject.mockResolvedValue({
        id: 1,
        name: 'test-subject',
      });

      spyRepository.mockResolvedValue({
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

      await request(app.getHttpServer())
        .post('/announce')
        .send(announceToCreate)
        .expect(201)
        .expect({
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
    });
  });

  describe('create announce', () => {
    const spyLevel = jest.spyOn(levelService, 'findOneByName');
    const spySubject = jest.spyOn(subjectService, 'findOneByName');
    const spyRepository = jest.spyOn(repository, 'save');
    const announceToCreate = {
      price: 100,
      level: {
        name: 'test-level',
      },
      subject: {
        name: 'test-subject',
      },
    };

    it('should not create a new announce with bad request', async () => {
      await request(app.getHttpServer())
        .post('/announce')
        .send({ ...announceToCreate, price: 250 })
        .expect(400)
        .expect({
          message: ['price must not be greater than 150'],
          error: 'Bad Request',
          statusCode: 400,
        });
    });
  });
});
