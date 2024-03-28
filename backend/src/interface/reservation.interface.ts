import { PostExportInterface, PostInterface } from './post.interface';
import { UserExportInterface, UserInterface } from './user.interface';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class ReservationBase {
  @IsDateString()
  r_start_day: Date | string;

  @IsDateString()
  r_end_day: Date | string;

  @IsString()
  user_id: string;

  @IsNumber()
  @IsPositive()
  @IsInt()
  pay: number;

  @IsString()
  reservation_progress: string;

  @IsString()
  move_in_instruction: string;
}

export class ReservationExportInterface extends ReservationBase {
  key: number;
  user: UserExportInterface;
  post: PostExportInterface;
}

export class ReservationInterface extends ReservationExportInterface {
  post_id: string;
  id: string;
  user: UserInterface;
  post: PostInterface;
}
