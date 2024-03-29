import { useState } from 'react';
import { useTitle } from '@shared/components/hook/HookCollect.js';

import { RequestListComponent } from './components/UserProfile/RequsetListComponent';
import { UserPrivateComponent } from './components/UserProfile/UserPrivateComponent';
import { Horizon, Wrapper } from '@shared/components/styles/Public.styles.js';
import { ReservationInfo } from './components/Info/ReservationInfo';
import { PostUploadDialog } from '@shared/components/Popup/Popup.js';
import { PostListComponent } from './components/UserProfile/PostListComponent.js';
import { FetchGetMyUser } from '@shared/components/FetchList/FetchList';
import { UserBaseComponent } from './components/UserImageProfile';

function GuestInfo() {
  const [userInfo, setUserInfo] = useState([]);
  FetchGetMyUser(setUserInfo);
  // useTitle('프로필 | ItHome');
  return (
    <Wrapper>
      <div
        style={{ fontFamily: 'Pretendard' }}
        className="flex grid grid-cols-7">
        <div className="ml-3 mt-5">
          <UserBaseComponent user={userInfo} />
        </div>

        <div className="mb-2 ml-7 col-span-6 mt-5 w-5/6">
          <ReservationInfo />
          <Horizon className="my-y" />

          <UserPrivateComponent user={userInfo} />
          <Horizon className="mt-4 md-2" />

          <PostListComponent userId={userInfo.user_id} />
          <PostUploadDialog />
          <Horizon className="my-2" />

          <RequestListComponent />
        </div>
      </div>
    </Wrapper>
  );
}

export default GuestInfo;
