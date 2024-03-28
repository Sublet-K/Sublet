import { useEffect, useState } from 'react';
import {
  notFoundError,
  raiseError,
} from '../StaticComponents/StaticComponents';

const headerOptions = (method, contentType = 'application/json') => ({
  credentials: 'include',
  method: method,
  headers: {
    'Content-Type': contentType,
  },
});
const bodyData = data => ({
  data: JSON.stringify({
    data,
  }),
});

async function FetchChangeEmail(emailState) {
  const UpdateURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update`;
  const ChangeVerifyURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/verifyupdate`;
  return await fetch(UpdateURL, {
    ...headerOptions('PUT'),
    body: JSON.stringify({
      email: emailState,
    }),
  }).then(
    await fetch(ChangeVerifyURL, {
      ...headerOptions('PUT'),
      body: JSON.stringify({
        verify_email: 'false',
      }),
    }),
  );
}

async function FetchChangePhone(phoneState) {
  const UpdateURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update`;
  const ChangeVerifyURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/verifyupdate`;
  return await fetch(UpdateURL, {
    ...headerOptions('PUT'),
    body: JSON.stringify({
      phone: phoneState,
    }),
  }).then(
    await fetch(ChangeVerifyURL, {
      ...headerOptions('PUT'),
      body: JSON.stringify({
        verify_phone: 'false',
      }),
    }),
  );
}

async function FetchGetPost(userId, setUserInfo) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/post/${userId}`;
  const getPostInfo = async () => {
    const json = await fetch(URL, headerOptions('GET'))
      .then(notFoundError)
      .catch(raiseError('FetchGetPost'));
    setUserInfo(json);
  };
  useEffect(() => {
    getPostInfo();
  }, [userId]);
}

async function FetchUploadPost(formData) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post`;
  await fetch(URL, {
    ...headerOptions('POST'),
    ...formData,
  })
    .then(notFoundError)
    .catch(raiseError('FetchUploadPost'));
}

async function FetchEditPost(postKey, formData) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${postKey}`;
  await fetch(URL, {
    ...headerOptions('PUT'),
    ...formData,
  })
    .then(notFoundError)
    .catch(raiseError('FetchEditPost'));
}

async function FetchReservation(setReservationInfo) {
  const getReservationInfo = async () => {
    const json = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation`,
      headerOptions('GET'),
    )
      .then(notFoundError)
      .catch(raiseError('FetchReservation'));

    setReservationInfo(json);
  };

  useEffect(() => {
    getReservationInfo();
  }, []);
}

async function FetchReservationByPostKey(setReservationInfo, postKey) {
  const URL =
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation/post?key=` + postKey;
  const getFetchReservation = async () => {
    const json = await fetch(URL, headerOptions('GET'))
      .then(notFoundError)
      .catch(raiseError('FetchReservationByPostKey'));
    setReservationInfo(json);
  };
  useEffect(() => {
    getFetchReservation();
  }, []);
}

async function FetchDeleteReservation(keyNum) {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation`, {
    ...headerOptions('DELETE'),
    body: JSON.stringify({
      key: keyNum,
    }),
  })
    .then(notFoundError)
    .catch(raiseError('FetchDeleteReservation'));
}

async function FetchReservationPost(userID, postKey, startDay, endDay, pay) {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation`, {
    ...headerOptions('POST'),
    body: JSON.stringify({
      user_id: userID,
      post_key: postKey,
      r_start_day: startDay,
      r_end_day: endDay,
      pay: pay,
    }),
  })
    .then(notFoundError)
    .catch(raiseError('FetchReservationPost'));
}

async function FetchDeletePost(key) {
  const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${key}`;
  fetch(link, headerOptions('DELETE'))
    .then(notFoundError)
    .catch(raiseError('FetchDeletePost'));
}

async function FetchLogin({ id, password }) {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    ...headerOptions('POST'),
    body: JSON.stringify({
      id: id,
      password: password,
    }),
  })
    .then(notFoundError)
    .catch(raiseError('FetchLogin'));
}

async function FetchLogout() {
  await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
    headerOptions('POST'),
  )
    .then(notFoundError)
    .catch(raiseError('FetchLogout'));
}

async function FetchImage(formData) {
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/image`, {
    ...headerOptions('PUT', 'image/jpeg'),
    body: formData,
  });
}

async function FetchGetMyUser() {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`;
  const json = await fetch(URL, headerOptions('GET'))
    .then(notFoundError)
    .catch(raiseError('FetchGetMyUser'));
  return json;
}

async function FetchIsLogin(setUserInfo) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`;
  const getUserInfo = async () => {
    const json = await fetch(URL, headerOptions('GET'))
      .then(notFoundError)
      .catch(raiseError('FetchGetMyUser'));
    setUserInfo(json);
  };
  return getUserInfo;
}

async function FetchGetOneUser(userId, setUserInfo) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`;

  const getUserInfo = async () => {
    const json = await fetch(URL, headerOptions('GET'))
      .then(notFoundError)
      .catch(raiseError('FetchGetOneUser'));
    setUserInfo(json);
  };
  getUserInfo();

  return true;
}

async function FetchGetRequest(setRequestInfo) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/request/`;

  const getRequestInfo = async () => {
    const json = await fetch(URL, headerOptions('GET'))
      .then(notFoundError)
      .catch(raiseError('FetchGetRequest'));
    setRequestInfo(json);
  };

  useEffect(() => {
    getRequestInfo();
  }, []);
}

function FetchSignUp({
  userId,
  password,
  username,
  email,
  phone,
  school,
  gender,
  birth,
  studentId,
}) {
  const requestOptions = {
    ...headerOptions('POST'),
    body: JSON.stringify({
      user_id: userId,
      password: password,
      username: username,
      email: email,
      phone: phone,
      school: school,
      gender: gender,
      birth: birth,
      student_id: studentId,
    }),

    path: '/',
  };

  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/`, requestOptions)
    .then(notFoundError)
    .catch(raiseError('FetchSignUp'));
}

async function FetchGetRequestByRequestId(idList, setRequestInfo) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/request/requestId`;

  const getRequestInfo = async () => {
    const json = await fetch(URL, {
      ...headerOptions('POST'),
      body: JSON.stringify({
        id: idList,
      }),
    })
      .then(notFoundError)
      .catch(raiseError('FetchGetRequestByRequestId'));

    setRequestInfo(json);
  };
  useEffect(() => {
    getRequestInfo();
  }, []);
}
async function FetchVerifyEmail(email) {
  const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/email`;
  await fetch(link, {
    ...headerOptions('POST'),
    body: JSON.stringify({
      email: email,
    }),
  })
    .then(notFoundError)
    .catch(raiseError('VerifyEmail'));
}

async function FetchVerifyUser({ method, tokenKey, verifyToken }) {
  // 학교 인증은 우리가 확인(김과외처럼)
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/verifyUser`;
  const json = {
    verify_email: method === 'email' ? 'true' : 'false',
    verify_phone: method === 'phone' ? 'true' : 'false',
    tokenKey: tokenKey,
    verifyToken: Number(verifyToken),
  };
  return await fetch(URL, {
    ...headerOptions('POST'),
    body: JSON.stringify(json),
  });
}

async function FetchResetPassword(userId, tokenKey, verifyToken) {
  // 학교 인증은 우리가 확인(김과외처럼)
  const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/resetpassword`;

  const requestOptions = {
    // sendEmail 라우터로 보내버리기
    ...headerOptions('POST'),
    body: JSON.stringify({
      user_id: userId,
      tokenKey: tokenKey,
      verifyToken: verifyToken,
    }),
  };

  return await fetch(link, requestOptions);
}

async function FetchChangePassword(userId, newPassword) {
  // 학교 인증은 우리가 확인(김과외처럼)
  const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/changepassword`;
  console;

  return await fetch(link, {
    ...headerOptions('PUT'),
    body: JSON.stringify({
      id: userId,
      password: newPassword,
    }),
  });
}

async function FetchDeleteRequest(keyNum) {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/request`, {
    ...headerOptions('DELETE'),
    body: JSON.stringify({
      key: keyNum,
    }),
  });
}

function FetchConnectRequestPost(requestKey, postKey) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/request/post/${postKey}`;

  fetch(URL, {
    ...headerOptions('POST'),
    body: JSON.stringify({
      key: requestKey,
    }),
  })
    .then(notFoundError(true))
    .catch(raiseError('ConnectRequestPost'));
}

async function FetchConverURLtoFile(id) {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/public/' + id + '.jpg';
  const response = await fetch(URL, headerOptions('GET'));
  const data = await response.blob();
  const ext = URL.split('.').pop(); // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` };
  return new File([data], id + '.jpg', metadata);
}

const toggleLikes = (item, likes, setLikes) => () => {
  if (!(item.key in likes)) {
    setLikes({ ...likes, [item.key]: item });
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/post/like', {
      ...headerOptions('POST'),
      body: JSON.stringify({
        post_key: item.key,
      }),
    }); // .then(response => response.json()).then(data => console.log(data));
  } else {
    let newLikes = {};
    Object.keys(likes).map(newItem => {
      if (likes[newItem].key !== item.key) {
        newLikes[newItem] = likes[newItem];
      }
    });
    setLikes(newLikes);
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/post/like', {
      ...headerOptions('DELETE'),
      body: JSON.stringify({
        post_key: item.key,
      }),
    }); // .then(response => response.json()).then(data => console.log(data));
  }
};

export {
  FetchVerifyUser,
  FetchResetPassword,
  FetchChangePassword,
  FetchSignUp,
  FetchVerifyEmail,
  FetchGetMyUser,
  FetchGetOneUser,
  FetchLogin,
  FetchDeleteRequest,
  FetchGetRequest,
  FetchLogout,
  FetchDeleteReservation,
  FetchGetRequestByRequestId,
  FetchReservation,
  FetchGetPost,
  FetchReservationByPostKey,
  FetchDeletePost,
  FetchImage,
  FetchReservationPost,
  FetchConnectRequestPost,
  FetchChangeEmail,
  FetchChangePhone,
  FetchUploadPost,
  FetchEditPost,
  FetchConverURLtoFile,
  FetchIsLogin,
  toggleLikes,
};
