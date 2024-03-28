import React, { useState } from 'react';
import { Login } from '@shared/components/FetchList/FetchList';

function CreateSubletInfo() {
  const [image_id, setImageId] = useState([]);
  const [title, setTitle] = useState('');
  const [basic_info, setBasicInfo] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState('');
  const [rule, setRule] = useState('');
  const [refund_policy, setRefundPolicy] = useState('');
  const [benefit, setBenefit] = useState('');
  const [extra_info, setExtraInfo] = useState('');
  const [start_day, setStartDay] = useState('');
  const [end_day, setEndDay] = useState('');
  const [min_duration, setMinDuration] = useState('');
  const [max_duration, setMaxDuration] = useState('');
  const [postuser_id, setPostUserId] = useState('');
  const [post_date, setPostDate] = useState('');
  const [privateField, setPrivateField] = useState(false);
  const [request, setRequest] = useState(false);
  const [limit_people, setLimitPeople] = useState('');
  const [number_room, setNumberRoom] = useState('');
  const [number_bathroom, setNumberBathroom] = useState('');
  const [number_bedroom, setNumberBedroom] = useState('');
  const [accomodation_type, setAccomodationType] = useState('');
  const [building_type, setBuildingType] = useState('');
  const [contract, setContract] = useState(false);
  const [x_coordinate, setXCoordinate] = useState('');
  const [y_coordinate, setYCoordinate] = useState('');
  const [city, setCity] = useState('');
  const [gu, setGu] = useState('');
  const [dong, setDong] = useState('');
  const [street, setStreet] = useState('');
  const [street_number, setStreetNumber] = useState('');
  const [post_code, setPostCode] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();

    // 자동 로그인...
    // Login({ id: "test", password: "Test@0525" });
    const login = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 'test',
          password: 'Test@0525',
        }),
      },
    );

    // const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/post`, {
    //   method: 'POST',
    //   credentials: "include",
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     title,
    //     basic_info,
    //     price,
    //     description,
    //     position,
    //     rule,
    //     refund_policy,
    //     benefit,
    //     extra_info,
    //     start_day,
    //     end_day,
    //     min_duration,
    //     max_duration,
    //     limit_people,
    //     number_room,
    //     number_bathroom,
    //     number_bedroom,
    //     accomodation_type,
    //     building_type,
    //     contract,
    //     x_coordinate,
    //     y_coordinate,
    //     city,
    //     gu,
    //     dong,
    //     street,
    //     street_number,
    //     post_code,
    //   }),
    // });

    const roomResp = await fetch(
      'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlNF9waG90b19vZl9hX2ZyYW1lX2luX3RoZV9saXZpbmdfcm9vbV9pbl90aGVfc3R5bF85YWM1MjY1ZS02OTdjLTQ4OWMtYTFmYS03NzgzMjJlMTEwODNfMi5qcGc.jpg',
      {
        method: 'GET',
      },
    );
    const roomBlobq = await roomResp.blob();
    console.log(roomBlobq);
    const formData = new FormData();
    formData.append('images', roomBlobq);
    const roomInfo = {
      title: 'title',
      content: 'content',
      price: 1000,
      category: 'category',
      basic_info: 'basic_info',
      benefit: 'benefit',
      description: 'description',
      end_day: new Date().toISOString(),
      extra_info: 'extra_info',
      max_duration: 2,
      min_duration: 1,
      position: 'position',
      refund_policy: 'refund_policy',
      rule: 'rule',
      start_day: new Date().toISOString(),
      limit_people: 2,
      number_room: 2,
      number_bathroom: 2,
      number_bedroom: 2,
      accomodation_type: 'accom',
      building_type: 'apart',
      x_coordinate: 127.086415,
      y_coordinate: 37.53799,
      city: 'city',
      gu: 'gu',
      dong: 'dong',
      street: 'street',
      street_number: 'street_number',
      post_code: 'post_code',
      contract: 'true',
      local_save: 'false',
    };
    for (const [key, value] of Object.entries(roomInfo)) {
      formData.append(key, value);
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post`,
      {
        method: 'POST',
        body: formData,
        credentials: 'include',
      },
    );

    // const data = await response.json();
    console.log(response);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ margin: '100px' }}>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          title:
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label>
          basic_info:
          <input
            type="text"
            value={basic_info}
            onChange={e => setBasicInfo(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          price:
          <input
            type="text"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          description:
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          position (주소 설명 예 : 00역에서 몇 분 거리):
          <input
            type="text"
            value={position}
            onChange={e => setPosition(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          rule:
          <input
            type="text"
            value={rule}
            onChange={e => setRule(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          refund_policy:
          <input
            type="text"
            value={refund_policy}
            onChange={e => setRefundPolicy(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          benefit:
          <input
            type="text"
            value={benefit}
            onChange={e => setBenefit(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          extra_info:
          <input
            type="text"
            value={extra_info}
            onChange={e => setExtraInfo(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          start_day (2024-01-10 형식):
          <input
            type="text"
            value={start_day}
            onChange={e => setStartDay(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          end_day (2024-01-10 형식):
          <input
            type="text"
            value={end_day}
            onChange={e => setEndDay(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          min_duration (숫자) (00 일 의미):
          <input
            type="text"
            value={min_duration}
            onChange={e => setMinDuration(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          max_duration:
          <input
            type="text"
            value={max_duration}
            onChange={e => setMaxDuration(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          limit_people:
          <input
            type="text"
            value={limit_people}
            onChange={e => setLimitPeople(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          number_room:
          <input
            type="text"
            value={number_room}
            onChange={e => setNumberRoom(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          number_bathroom:
          <input
            type="text"
            value={number_bathroom}
            onChange={e => setNumberBathroom(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          number_bedroom:
          <input
            type="text"
            value={number_bedroom}
            onChange={e => setNumberBedroom(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          accomodation_type:
          <input
            type="text"
            value={accomodation_type}
            onChange={e => setAccomodationType(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          building_type:
          <input
            type="text"
            value={building_type}
            onChange={e => setBuildingType(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          contract:
          <input
            type="text"
            value={contract}
            onChange={e => setContract(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          x_coordinate (127.000000 형식 / 좌표는 따로 api 써서 가져오기):
          <input
            type="text"
            value={x_coordinate}
            onChange={e => setXCoordinate(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          y_coordinate:
          <input
            type="text"
            value={y_coordinate}
            onChange={e => setYCoordinate(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          city:
          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          gu:
          <input
            type="text"
            value={gu}
            onChange={e => setGu(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          dong:
          <input
            type="text"
            value={dong}
            onChange={e => setDong(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          street:
          <input
            type="text"
            value={street}
            onChange={e => setStreet(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          street_number:
          <input
            type="text"
            value={street_number}
            onChange={e => setStreetNumber(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <label>
          post_code:
          <input
            type="text"
            value={post_code}
            onChange={e => setPostCode(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </label>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateSubletInfo;
