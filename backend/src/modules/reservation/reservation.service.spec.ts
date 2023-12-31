import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { MongodbService } from '../mongodb/mongodb.service';
import {
  reservationStub,
  userStub,
} from '../mongodb/__mocks__/stubs/mongodb.stub';

jest.mock('../mongodb/mongodb.service');

describe('ReservationService', () => {
  let service: ReservationService;
  let mongoDbService: MongodbService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [ReservationService, MongodbService],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    mongoDbService = module.get(MongodbService);
    jest.clearAllMocks();
  });

  describe('TESTING createReservation (POST /reservation)', () => {
    describe('when calling with normal input', () => {
      let result: Boolean | undefined;

      beforeEach(async () => {
        try {
          result = await service.createReservation(
            reservationStub(),
            userStub(),
          );
        } catch (_e) {
          result = undefined;
        }
      });

      it('then should return interface', () => {
        expect(result).toBeDefined();
      });

      it('then should call db to create reservation', () => {
        expect(mongoDbService.createReservation).toHaveBeenCalledTimes(1);
        expect(mongoDbService.createReservation).toHaveBeenCalledWith(
          reservationStub(),
          userStub(),
        );
      });
    });
  });
});
