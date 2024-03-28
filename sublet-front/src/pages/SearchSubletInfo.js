import React, { useEffect } from 'react';
import Map from '@shared/components/Map/Map.js';
import { SubletPostStore } from '../store/SubletPostStore';
import PinDropIcon from '@mui/icons-material/PinDrop';
import styled from 'styled-components';

const HoverBtnDiv = styled.div`
  margin: 0 0 0 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const HoverNewPageDiv = styled.div`
  display: flex;
  cursor: pointer;
  gap: 1rem;
  padding: 1rem;
  &:hover {
    background-color: #ceffc8;
  }
`;

function SubletInfo(props) {
  const start_day = new Date(props.start_day);

  // useEffect(() => {
  // }, [props.marker]);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex">
        <HoverNewPageDiv
          onClick={() => {
            window.open(`/roominfo/${props.id}`);
          }}>
          <img
            alt="Room"
            className="h-20 w-20 rounded-lg"
            height="80"
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${props.image_id[0]}.jpg`}
            style={{
              aspectRatio: '80/80',
              objectFit: 'cover',
            }}
            width="80"
          />
          <div className="flex flex-col justify-between w-full">
            <h2 className="text-lg font-semibold">{props.title}</h2>
            <p className="text-sm">
              {
                // (props.position !== undefined) ? props.position : props.city + " " + props.gu + " " + props.dong + " " + props.street
                props.position
              }
            </p>
            <p className="text-sm">
              {props.city +
                ' ' +
                props.gu +
                ' ' +
                props.dong +
                ' ' +
                props.street +
                ' ' +
                props.street_number}
            </p>
            <p className="text-sm">
              {start_day.getMonth() + 1}월 {start_day.getDate()}일 부터, 최소{' '}
              {props.min_duration}개월
            </p>
            <p className="text-lg font-bold text-[#bd1e59] text-right">
              ₩
              {(props.price * 30)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
              / 30일
            </p>
          </div>
        </HoverNewPageDiv>
        <HoverBtnDiv
          onClick={() => {
            console.log('props.marker : ', props.marker);
            props.marker?.trigger('click');
          }}>
          <PinDropIcon></PinDropIcon>
        </HoverBtnDiv>
      </div>
    </div>
  );
}

export default function SearchSubletInfo(props) {
  const { page, asyncGetPost, asyncGetPostAll } = SubletPostStore(state => ({
    page: state.page,
    asyncGetPost: state.asyncGetPost,
    asyncGetPostAll: state.asyncGetPostAll,
  }));
  const { post, postExist, postAll } = SubletPostStore(state => ({
    post: state.post,
    postExist: state.postExist,
    postAll: state.postAll,
  }));

  useEffect(() => {
    // asyncGetPost(page);
    if (!postExist) {
      asyncGetPostAll();
    }
  }, []);

  // 이게 왜 있는 건지 아는 사람..? jihwanki? @JiHwanKi
  useEffect(() => {}, [postAll[0]?.marker]);

  return (
    <div className="max-w-7xl mx-auto p-5">
      <div className="grid grid-cols-2 gap-4">
        <div
          className="col-span-1"
          style={{
            maxHeight: 'calc(100vh - 250px)',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              width: '5px',
              height: '100px',
              WebkitAppearance: 'none',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '8px',
              border: '2px solid',
              borderColor: '#E7EBF0',
              backgroundColor: 'rgba(0 0 0 / 0.5)',
            },
          }}>
          <div className="flex flex-col space-y-4">
            {postExist &&
              postAll?.map(ele => (
                <SubletInfo
                  key={ele.key}
                  id={ele.key}
                  title={ele.title}
                  position={ele.position}
                  city={ele.city}
                  gu={ele.gu}
                  dong={ele.dong}
                  street={ele.street}
                  street_number={ele.street_number}
                  price={ele.price}
                  min_duration={ele.min_duration}
                  start_day={ele.start_day}
                  image_id={ele.image_id}
                  marker={ele.marker}
                />
              ))}
          </div>
        </div>
        <div className="col-span-1">{postExist && <Map />}</div>
      </div>
    </div>
  );
}
