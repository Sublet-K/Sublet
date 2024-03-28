import { useState } from 'react';
import { useTitle } from '@shared/components/hook/HookCollect.js';
import { useParams } from 'react-router-dom';
import { UserBaseComponent } from './Components/UserImageProfile.js';
import { PostListComponent } from 'pages/GuestInfo/components/UserProfile/PostListComponent.js';
import { Wrapper } from '@shared/components/styles/Public.styles.js';
import { FetchGetOneUser } from '@shared/components/FetchList/FetchList.js';

function HostInfo({ user }) {
  const { userId } = useParams();
  console.log(userId)
  const title = user.username + '님의 프로필 | ItHome';
  // useTitle(title);
  const [userInfo, setUserInfo] = useState([]);
  FetchGetOneUser(userId, setUserInfo);
  return (
    <Wrapper>
      <div
        style={{ fontFamily: 'Pretendard' }}
        className="flex grid grid-cols-7">
        <div className="ml-3 mt-5">
          <UserBaseComponent user={userInfo} />
        </div>

        <div className="mb-2 ml-7 col-span-6 mt-5 w-5/6">
          <PostListComponent userId={userInfo.user_id} guestMode={false} />
        </div>
      </div>
    </Wrapper>
  );
}

export default HostInfo;
