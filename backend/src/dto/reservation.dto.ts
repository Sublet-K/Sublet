import { ReservationBase } from '@/interface/reservation.interface';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ReservationCreateDto extends ReservationBase {
  @IsNumber()
  @IsInt()
  post_key?: number;
}

export class ReservationDto extends ReservationBase {
  @IsNumber()
  @IsInt()
  key: number;

  @IsNumber()
  @IsInt()
  post_key?: number;
}

export class ReservationFilterDto {
  @IsOptional()
  @IsDateString()
  r_start_day?: string | Date;

  @IsOptional()
  @IsDateString()
  r_end_day?: string | Date;

  @IsOptional()
  @IsString()
  user_id?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  post_key?: number;

  @IsOptional()
  @IsString()
  reservation_progress?: string;

  @IsOptional()
  @IsString()
  move_in_instruction?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  key?: number;
}

export class reservationRequest {
  @IsNumber()
  @IsInt()
  key: number;
}
