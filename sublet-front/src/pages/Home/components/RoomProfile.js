import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { toggleLikes } from '@shared/components/FetchList/FetchList.js';
import { RoomSpan } from './RoomSpan.js';
import { Image } from '@shared/components/styles/Public.styles';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const RoomProfile = ({ room, likes, setLikes }) => {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em;
  `;

  const RoomTitleAndLike = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;

  const navigate = useNavigate();
  const moveToRoomInfo = ({ room }) => {
    // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.
    navigate(`/roominfo/${room.key}`, {
      room: room,
    });
  };

  if (!room) return <div></div>;
  return (
    <Container>
      <IconButton onClick={() => moveToRoomInfo({ room })}>
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${room.image_id[0]}.jpg`}
          alt="Room image"
        />
      </IconButton>
      <RoomTitleAndLike>
        <RoomSpan room={room} />
        <IconButton onClick={toggleLikes(room, likes, setLikes)}>
          {likes[room.key] !== undefined ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </RoomTitleAndLike>
    </Container>
  );
};
