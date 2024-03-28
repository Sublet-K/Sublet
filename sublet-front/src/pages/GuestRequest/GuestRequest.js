import React from 'react';
import { useState } from 'react';
import { Dialog, Popover } from '@headlessui/react';
import { GuestRequestTop } from './Components/GuestRequestTop.js';
import { ComfilrmButton } from './Components/ConfilrmButton.js';
import { MoreDetails } from './Components/MoreDetails/MoreDetails.js';
import GuestRequeststyles from '@shared/components/styles/GuestRequest.styles.js';
import { UserSelectInfo } from './Components/UserSelectInfo/index.js';

function GuestRequest() {
  const [inputs, setInputs] = useState({
    price: 1,
    start_day: '2024-04-05T00:00:00.000Z',
    end_day: '2024-04-05T00:00:00.000Z',
    limit_people: 1,
    number_room: 1,
    number_bathroom: 1,
    number_bedroom: 1,
    accomodation_type: 'short',
    building_type: 'oneRoom',
    contract: 'borrow',
    city: '',
    gu: '',
    dong: '',
    alarm: '',
    school: '',
  });

  const {
    price,
    start_day,
    end_day,
    limit_people,
    number_room,
    number_bathroom,
    number_bedroom,
    accomodation_type,
    building_type,
    contract,
    city,
    gu,
    dong,
    alarm,
    school,
  } = inputs;

  const requestHandle = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const styles = GuestRequeststyles();
  return (
    <div style={styles.BigContainer}>
      <GuestRequestTop />
      <div style={styles.GuestRequest_Content}>
        {/* 요청서 정보 입력 */}
        <GuestRequestDetail>
          <Popover.Group style={styles.RequestBox}>
            <UserSelectInfo />
            <MoreDetails />
            <ComfilrmButton />
          </Popover.Group>
        </GuestRequestDetail>
        <GuestRequestmap>
          <p> 지도</p>
        </GuestRequestmap>
      </div>
    </div>
  );

  function RequestPost({
    price,
    start_day,
    end_day,
    limit_people,
    number_room,
    number_bathroom,
    number_bedroom,
    accomodation_type,
    building_type,
    contract,
    city,
    gu,
    dong,
    alarm,
    school,
  }) {
    const RequestFunc = async () => {
      const requestOptions = {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        path: '/',
        body: JSON.stringify({
          price: price,
          start_day: start_day,
          end_day: end_day,
          limit_people: limit_people,
          number_room: number_room,
          number_bathroom: number_bathroom,
          number_bedroom: number_bedroom,
          accomodation_type: accomodation_type,
          building_type: building_type,
          contract: contract,
          city: city,
          gu: gu,
          dong: dong,
          alarm: alarm,
          school: school,
        }),
      };

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/request`, requestOptions)
        .then(res => res.json())
        .then(response => {
          console.log('result RequestFunc', response);
        })
        .catch(e => {
          console.log('[error] RequestFunc', e);
        });
    };
    RequestFunc();
  }
}

export default GuestRequest;
