import React, { useEffect, useState } from 'react';

const SaveSublet = () => {
  return <div>SaveSublet</div>;
};

export default SaveSublet;

// 미완. 오류나는데 어차피 작업이 덜 된 코드로 주석처리. Next.js 에서 구현하는 것이 더 좋다 판단.

// import React, { useEffect, useState } from 'react';
// import Map from '@shared/components/Map/Map';
// import PinDropIcon from '@mui/icons-material/PinDrop';
// import styled from 'styled-components';
// import { useUserInfoStore } from '@core/store/UserInfoStore.js';
// import { SaveSubletImage } from './components/SaveSubletImage';

// const HoverBtnDiv = styled.div`
//   margin: 0 0 0 0;
//   display: flex;
//   align-items: center;
//   cursor: pointer;
//   &:hover {
//     background-color: #f5f5f5;
//   }
// `;

// const HoverNewPageDiv = styled.div`
//   display: flex;
//   cursor: pointer;
//   gap: 1rem;
//   padding: 1rem;
//   &:hover {
//     background-color: #ceffc8;
//   }
// `;

// function SubletInfo(props) {
//   return (
//     <div className="bg-white rounded-lg shadow">
//       <div className="flex">
//         <HoverNewPageDiv onClick={() => window.open(`/roominfo/${props.id}`)}>
//           <SaveSubletImage image_id={props.image_id[0]} />
//           <SaveSubletText {...props} />
//         </HoverNewPageDiv>
//         <HoverBtnDiv
//           onClick={() => {
//             console.log('props.marker : ', props.marker);
//             props.marker?.trigger('click');
//           }}>
//           <PinDropIcon></PinDropIcon>
//         </HoverBtnDiv>
//       </div>
//     </div>
//   );
// }

// export default function SaveSublet() {
//   const { userInfo } = useUserInfoStore();
//   const [likes, setLikes] = useState({});
//   const [roomInfo, setRoomInfo] = useState([]);

//   const fetchRoomsDefault = async () => {
//     const data = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/post?maxPost=6&page=1`,
//     ).then(res => res.json());
//     setRoomInfo(data);
//   };

//   useEffect(() => {
//     userInfo.likes.map(itemKey => {
//       setLikes({ ...likes, [itemKey]: itemKey });
//     });
//     fetchRoomsDefault();

//     // let res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + `/post/${2}`);
//     // let data = await res.json();
//     // setRoomsData([...roomsData, ...data]);
//     // setListPageAmount(listPageAmount + 1);
//   }, []);

//   // useEffect(() => {}, [postAll[0]?.marker]);

//   return (
//     <div className="max-w-7xl mx-auto p-5">
//       <div className="grid grid-cols-2 gap-4">
//         <div
//           className="col-span-1"
//           style={{
//             maxHeight: 'calc(100vh - 250px)',
//             overflowY: 'scroll',
//             '&::-webkit-scrollbar': {
//               width: '5px',
//               height: '100px',
//               WebkitAppearance: 'none',
//             },
//             '&::-webkit-scrollbar-thumb': {
//               borderRadius: '8px',
//               border: '2px solid',
//               borderColor: '#E7EBF0',
//               backgroundColor: 'rgba(0 0 0 / 0.5)',
//             },
//           }}>
//           <div className="flex flex-col space-y-4">
//             {roomInfo?.map(ele => (
//               <SubletInfo
//                 key={ele.key}
//                 id={ele.key}
//                 title={ele.title}
//                 position={ele.position}
//                 city={ele.city}
//                 gu={ele.gu}
//                 dong={ele.dong}
//                 street={ele.street}
//                 street_number={ele.street_number}
//                 price={ele.price}
//                 min_duration={ele.min_duration}
//                 start_day={ele.start_day}
//                 image_id={ele.image_id}
//                 marker={ele.marker}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="col-span-1">{roomInfo && <Map />}</div>
//       </div>
//     </div>
//   );
// }
