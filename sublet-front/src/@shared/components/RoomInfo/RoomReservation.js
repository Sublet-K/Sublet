import * as RS from 'components/styles/RoomInfo.styles.js';
import { getDateDiff } from 'components/StaticComponents.js';
import * as s from 'components/styles/Public.styles.js';
import SearchDate from '@core/Header/Desktop/components/SearchDate.js';

export function RoomReservation({ nowRoomPost, moveToBooking }) {
  return (
    <RS.RoomInfoSection>
      <div className="text-xl font-bold">예약하기</div>
      <SearchDate />
      <div className="mt-4 mb-2 text-2xl font-bold">
        {`${(getDateDiff(searchDate[0], searchDate[1]) * nowRoomPost.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}{' '}
        원
        <span className="text-sm font-normal">
          {' '}
          / {getDateDiff(searchDate[0], searchDate[1])} 일
        </span>
      </div>
      <s.NormalButton onClick={moveToBooking}>예약하기</s.NormalButton>
      <div className="mt-2 mb-2 text-sm text-gray-600">
        예약 확정 전에 환불 규정을 확인 하셨나요?
      </div>
    </RS.RoomInfoSection>
  );
}