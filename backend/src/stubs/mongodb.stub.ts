import { PostCreateDto, PostFilterQueryDto } from '@/dto/post.dto';
import { RequestDto } from '@/dto/request.dto';
import { ReservationDto } from '@/dto/reservation.dto';
import {
  UserCreateDto,
  UserFilterDto,
  UserTokenVerifyUpdateDto,
  UserUpdateDto,
} from '@/dto/user.dto';
import { ImageInterface } from '@/interface/image.interface';
import { PostExportInterface, PostInterface } from '@/interface/post.interface';
import {
  RequestBase,
  RequestExportInterface,
  RequestInterface,
} from '@/interface/request.interface';
import {
  ReservationExportInterface,
  ReservationInterface,
} from '@/interface/reservation.interface';
import { UserExportInterface, UserInterface } from '@/interface/user.interface';
import { Stream } from 'stream';

export const userStub = (): UserInterface => {
  return {
    id: 'mocked-id',
    user_id: 'mocked-user_id',
    username: 'mocked-username',
    email: 'mocked@mocked.com',
    phone: '+82010-1234-5678',
    password: 'Mocked-password1)',
    delete: false,
    version: 1,
    school: 'ABC Univ',
    id_card: false,
    image_id: 'default',
    like_post_id: [],
    gender: '남',
    birth: '2024-01-10T00:00:00.000Z',
    student_id: 21,
    verify_school: false,
    verify_email: false,
    verify_phone: false,
    chat_id: [],
  };
};

export const userExportStub = (): UserExportInterface => {
  return {
    student_id: userStub().student_id,
    phone: userStub().phone,
    school: userStub().school,
    username: userStub().username,
    email: userStub().email,
    user_id: userStub().user_id,
    image_id: userStub().image_id,
    id_card: userStub().id_card,
    gender: userStub().gender,
    birth: userStub().birth,
    verify_school: userStub().verify_school,
    verify_email: userStub().verify_email,
    verify_phone: userStub().verify_phone,
  };
};

export const postCreateStub = (): PostCreateDto => {
  return {
    basic_info: 'mocked-basic_info',
    benefit: 'mocked-benefit',
    description: 'mocked-description',
    end_day: '2010-01-01',
    extra_info: 'mocked-extra_info',
    max_duration: 1,
    min_duration: 1,
    position: 'mocked-position',
    refund_policy: 'mocked-refund_policy',
    rule: 'mocked-rule',
    start_day: '2000-01-01',
    title: 'mocked-title',
    price: 1,
    limit_people: 3,
    number_room: 3,
    number_bathroom: 3,
    number_bedroom: 3,
    accomodation_type: '전대', //건물 유형
    building_type: '아파트', //아파트인지, 주택인지
    contract: false,
    x_coordinate: 3.0,
    y_coordinate: 3.0,
    city: 'mock-city',
    gu: 'mock-gu',
    dong: 'mock-dong',
    street: 'mock-street',
    street_number: 'mock-street-number',
    post_code: 'mock-post-code',
    local_save: false,
  };
};

export const postExportStub = (): PostExportInterface => {
  const createStub = postCreateStub();

  return {
    ...createStub,
    key: 1,
    image_id: ['mocked-image_id'],
    post_date: 'mocked-post_date',
    start_day: new Date(createStub.start_day).toISOString(),
    end_day: new Date(createStub.end_day).toISOString(),
    private: false,
    request: false,
    like_count: 0,
    like_user: [],
    postuser: userExportStub(),
  };
};

export const postStub = (): PostInterface => {
  return {
    ...postExportStub(),
    postuser_id: 'mocked-postuser_id',
    id: 'mocked-id',
    deleted: false,
    version: 1,
    postuser: userStub(),
    like_user: [],
    request_ids: [],
    like_user_id: [],
  };
};

export const imageStub = (): ImageInterface => {
  return {
    id: 'mocked-id1',
    filename: 'mocked-filename1',
    filetype: 'mocked-filetype1',
    image_hash: 'mocked-image_hash1',
  };
};

export const multerFileStub = (): Express.Multer.File => {
  return {
    fieldname: 'mocked-fieldname',
    originalname: 'mocked-originalname',
    encoding: 'mocked-encoding',
    mimetype: 'image/jpeg',
    destination: 'mocked-destination',
    filename: 'mocked-filename',
    path: 'mocked-path',
    size: 1,
    stream: Stream.Readable.from('mocked-stream'),
    buffer: Buffer.from('mocked-buffer'),
  };
};

export const filterStub = (): PostFilterQueryDto => {
  return {
    maxPost: 16,
    page: 1,
    fromDate: '2000-01:01',
    toDate: '2010-01-01',
  };
};

export const userCreateStub = (): UserCreateDto => {
  return {
    username: 'mocked-username',
    email: 'mocked@mocked.com',
    phone: '+82010-1234-5678',
    password: 'Mocked-password1)',
    school: userStub().school,
    user_id: 'mocked-user_id',
    gender: '남',
    birth: userStub().birth,
    student_id: 21,
  };
};

export const userUpdateStub = (): UserUpdateDto => {
  return {
    username: 'mocked-username',
    email: 'mocked@mocked.com',
    phone: '+82010-1234-5678',
    password: 'Mocked-password1))',
    school: 'ABC univ',
    user_id: 'mocked-user_id',
    image_id: 'second image',
  };
};
export const userVerifyUpdateStub = (): UserTokenVerifyUpdateDto => {
  return {
    tokenKey: 'mocked@mocked.com',
    verifyToken: 123456,
    verify_school: true,
    verify_email: false,
    verify_phone: false,
  };
};

export const userFilterStub = (): UserFilterDto => {
  return {
    school: 'ABC univ',
  };
};

export const reservationStub = (): ReservationDto => {
  return {
    key: 2,
    user_id: 'mocked-userid',
    post_key: 1,
    r_start_day: '2024-01-10T00:00:00.000Z',
    r_end_day: '2024-04-05T00:00:00.000Z',
    pay: 50000,
    reservation_progress: 'mocked-progress',
    move_in_instruction: 'mocked-instruction',
  };
};

export const reservationExportStub = (): ReservationExportInterface => {
  return {
    key: 2,
    user_id: 'mocked-userid',
    r_start_day: '2024-01-10T00:00:00.000Z',
    r_end_day: '2024-04-05T00:00:00.000Z',
    pay: 50000,
    reservation_progress: 'mocked-progress',
    move_in_instruction: 'mocked-instruction',

    user: {
      ...userExportStub(),
    },
    post: {
      ...postExportStub(),
    },
  };
};

export const reservationInterfaceStub = (): ReservationInterface => {
  return {
    id: 'mocked-id',
    key: 2,
    user_id: 'mocked-userid',
    r_start_day: '2024-01-10T00:00:00.000Z',
    r_end_day: '2024-04-05T00:00:00.000Z',
    post_id: 'post_id',
    pay: 50000,
    reservation_progress: 'mocked-progress',
    move_in_instruction: 'mocked-instruction',
    user: {
      ...userStub(),
    },
    post: {
      ...postStub(),
    },
  };
};

export const requestCreateStub = (): RequestBase => {
  return {
    price: 200000,
    start_day: '2024-01-10T00:00:00.000Z',
    end_day: '2024-04-05T00:00:00.000Z',
    limit_people: 2,
    number_room: 3,
    number_bathroom: 3,
    number_bedroom: 3,
    accomodation_type: '전대',
    building_type: '아파트',
    contract: true,
    city: 'seoul',
    gu: 'jongro',
    dong: 'aaa',
    alarm: true,
    school: '아주대',
    complete: false,
    request_text: 'mock-post-text',
  };
};

export const requestStub = (): RequestDto => {
  return {
    key: 2,
    price: 200000,
    start_day: '2024-01-10T00:00:00.000Z',
    end_day: '2024-04-05T00:00:00.000Z',
    limit_people: 2,
    number_room: 3,
    number_bathroom: 3,
    number_bedroom: 3,
    accomodation_type: '전대',
    building_type: '아파트',
    contract: true,
    city: 'seoul',
    gu: 'jongro',
    dong: 'aaa',
    alarm: true,
    school: '아주대',
    complete: false,
    request_text: 'mock-post-text',
  };
};

export const requestExportStub = (): RequestExportInterface => {
  return {
    key: 2,
    price: 200000,
    start_day: '2024-01-10T00:00:00.000Z',
    end_day: '2024-04-05T00:00:00.000Z',
    limit_people: 2,
    number_room: 3,
    number_bathroom: 3,
    number_bedroom: 3,
    accomodation_type: '전대',
    building_type: '아파트',
    contract: true,
    city: 'seoul',
    gu: 'jongro',
    dong: 'aaa',
    alarm: true,
    school: '아주대',
    complete: true,
    request_text: 'mock-post-text',
    user: {
      ...userExportStub(),
    },
    post: [
      {
        ...postExportStub(),
      },
    ],
  };
};

export const requestInterfaceStub = (): RequestInterface => {
  return {
    id: '3',
    delete: true,
    key: 2,
    price: 200000,
    start_day: '2024-01-10T00:00:00.000Z',
    end_day: '2024-04-05T00:00:00.000Z',
    limit_people: 2,
    number_room: 3,
    number_bathroom: 3,
    number_bedroom: 3,
    accomodation_type: '전대',
    building_type: '아파트',
    contract: true,
    city: 'seoul',
    gu: 'jongro',
    dong: 'aaa',
    alarm: true,
    school: '아주대',
    complete: true,
    request_text: 'mock-post-text',
    user: {
      ...userStub(),
    },
    post: [
      {
        ...postStub(),
      },
    ],
  };
};
