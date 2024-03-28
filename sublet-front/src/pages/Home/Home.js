import React, { useEffect, useState } from 'react';
import { useTitle } from '@shared/components/hook/HookCollect.js';
import styled from '@emotion/styled';
import { HomeTopButtonContainer } from './components/HomeTopButtonContainer.js';
import { HomeRoomContainer } from './components/HomeRoomContainer.js';
import { HomeMoreRoomButton } from './components/HomeMoreRoomButton.js';

const Layout = styled.div`
  margin-bottom: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
`;

export default function Home() {
  useTitle('ItHome | 딱 맞는 숙소를 찾아봐요.');

  const [roomsData, setRoomsData] = useState([]);
  const [preRoomsData, setPreRoomsData] = useState([]);
  const [likes, setLikes] = useState({});
  const [listRoomAmount, setListRoomAmount] = useState(6);
  const [listPageAmount, setListPageAmount] = useState(1);

  const getBackendURL = (listRoomAmount, listPageAmount) => {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/post?maxPost=${listRoomAmount}&page=${listPageAmount}`;
  };

  const fetchRoomsDefault = () => {
    // 6개 저 보여주기 필요할 수도..?
    fetch(getBackendURL(listRoomAmount, listPageAmount))
      .then(ele => ele.json())
      .then(ele => setPreRoomsData(ele));
    if (preRoomsData.length !== 0) {
      setRoomsData([...roomsData, ...preRoomsData]);
      setPreRoomsData([]);
    }
    setListPageAmount(listPageAmount + 1);
  };

  const fetchData = async () => {
    let data = await fetch(getBackendURL(listRoomAmount, listPageAmount)).then(
      response => response.json(),
    );
    setRoomsData([...roomsData, ...data]);
    data = await fetch(getBackendURL(listRoomAmount, listPageAmount + 1)).then(
      response => response.json(),
    );
    setPreRoomsData(data);
    setListPageAmount(listPageAmount + 2);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <HomeTopButtonContainer />
      <HomeRoomContainer
        roomsData={roomsData}
        likes={likes}
        setLikes={setLikes}
      />
      <HomeMoreRoomButton
        preRoomsData={preRoomsData}
        fetchRoomsDefault={fetchRoomsDefault}
      />
    </Layout>
  );
}
