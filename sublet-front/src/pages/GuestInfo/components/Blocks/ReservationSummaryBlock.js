import {
  DeleteButton,
  DetailParagraph,
  Image,
  InfoButton,
  SecondHead,
} from '@shared/components/styles/Public.styles';
import { CancleReservationDialog } from '../Dialog/CancleReservationDialog';
import { useState } from 'react';
import {
  DateFormat,
  priceToString,
} from '@shared/components/StaticComponents/StaticComponents';

const { useNavigate } = require('react-router-dom');

export function ReservationSummaryBlock({ room }) {
  const [popupState, setpopupState] = useState(false);
  const [checkState, setCheckState] = useState(false);
  const navigate = useNavigate();

  const clickHandler = () => {
    setpopupState(!popupState);
    setCheckState(false);
  };

  const imageLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${room.Post.image_id[0]}.jpg`;

  const MoveToRoomInfo = ({ room }) => {
    // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.
    navigate(`/roominfo/${room.Post.key}`, {
      room: room.Post,
    });
  };
  return (
    <div className="flex grid grid-cols-5 mt-4 ml-4">
      <div className="w-46 h-26">
        <Image src={imageLink}></Image>
      </div>
      <div className="mb-2 ml-3 col-span-4">
        <SecondHead>
          <a
            href=""
            onClick={() => {
              MoveToRoomInfo({ room });
            }}>
            {room.Post.title}
          </a>
        </SecondHead>
        <DetailParagraph>호스트: {room.Post.postuser.user_id}</DetailParagraph>
        <DetailParagraph>
          기간: {DateFormat(room.r_start_day)} ~ {DateFormat(room.r_end_day)}
        </DetailParagraph>
        <DetailParagraph>비용: {priceToString(room.pay)}</DetailParagraph>
        <div>
          <div>
            <DeleteButton onClick={clickHandler}>취소하기</DeleteButton>
            <InfoButton className="ml-4">상세 정보</InfoButton>
          </div>

          <CancleReservationDialog
            popupState={popupState}
            clickHandler={clickHandler}
            checkState={checkState}
            checkHandled={setCheckState}
            key={room.key}
          />
        </div>
      </div>
    </div>
  );
}
