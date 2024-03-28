import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { create } from 'zustand';
import { Link } from 'react-router-dom';

const testStore = create(set => {
  return {
    user: {},
    setUser: async () => {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_TEST_BACKEND_URL}/user`,
        {
          method: 'GET',
          credentials: 'include',
        },
      );
      if (resp.ok) {
        const json = await resp.json();
        set({ user: json });
      }
    },
    login: async (id, password) => {
      await fetch(`${process.env.NEXT_PUBLIC_TEST_BACKEND_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          password: password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const resp2 = await fetch(
        `${process.env.NEXT_PUBLIC_TEST_BACKEND_URL}/user`,
        {
          method: 'GET',
          credentials: 'include',
        },
      );
      if (resp2.ok) {
        const json = await resp2.json();
        set({ user: json });
      }
    },
    register: async (id, password, email, phone) => {
      await fetch(`${process.env.NEXT_PUBLIC_TEST_BACKEND_URL}/user`, {
        method: 'POST',
        body: JSON.stringify({
          user_id: id,
          username: 'username',
          email: email,
          password: password,
          phone: phone,
          school: 'aaaa',
          gender: 'male',
          birth: '1999-01-01',
          student_id: 123234,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    },
    logOut: async afterFunc => {
      await fetch(`${process.env.NEXT_PUBLIC_TEST_BACKEND_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      set({ user: {} });
      afterFunc();
    },
    printUser: async () => {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_TEST_BACKEND_URL}/user`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      );
      const json = await resp.json();
      console.log(json);
    },
    posts: [],
    getPostsFromBackend: async () => {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_TEST_BACKEND_URL}/post`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      );
      if (resp.ok) {
        const json = await resp.json();
        set({ posts: json });
      }
    },
    sendPost: async () => {
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
        x_coordinate: 13.42,
        y_coordinate: 13.42,
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
      await fetch(`${process.env.NEXT_PUBLIC_TEST_BACKEND_URL}/post`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
    },
    rooms: [],
    setRooms: (rooms) => {
      set({ rooms });
    },
    socket: undefined,
    setSocket: (socket) => {
      set({ socket });
    },
  };
});

export { testStore };

const TestChat = () => {
  const { user, setUser, login, register, logOut, printUser, posts, getPostsFromBackend, sendPost, rooms, setRooms, socket, setSocket } = testStore(
    ({ user, setUser, login, register, logOut, printUser, posts, getPostsFromBackend, sendPost, rooms, setRooms, socket, setSocket }) =>
      ({ user, setUser, login, register, logOut, printUser, posts, getPostsFromBackend, sendPost, rooms, setRooms, socket, setSocket }),
  );

  useEffect(() => {
    getPostsFromBackend();
    setUser();
    if (!socket) {
<<<<<<< HEAD
<<<<<<< HEAD
      setSocket(io(process.env.NEXT_PUBLIC_BACKEND_WS_URL));
=======
      setSocket(io(process.env.REACT_APP_BACKEND_WS_URL, { withCredentials: true }));
>>>>>>> ce4619d3de54dcecbd54d44f9284806fc36d8a05
=======
      setSocket(io(process.env.REACT_APP_BACKEND_WS_URL, { withCredentials: true }));
>>>>>>> ce4619d3de54dcecbd54d44f9284806fc36d8a05
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('receive_message', log => {
      const newRooms = rooms.map(room => {
        if (room.room_id === log.chatroom_id) {
          room.new_message = true;
        }
        return room;
      });
      setRooms(newRooms);
    });
  }, [socket, rooms]);

  useEffect(() => {
    if (socket && user?.id) {
      socket.emit('login', { user_id: user.id }, (rooms) => {
        rooms = rooms.map((room) => {
          return { 'room_id': room, 'new_message': false };
        });
        setRooms(rooms);
      });
    }
  }, [socket, user?.id]);

  return <div>Testing!<button onClick={() => {
    socket.emit('testing', 'TestingMESSAGE', (data) => {
      console.log('on client, we received data=', data);
    });
  }}>Button Click</button>
    <ul>
      <li><button onClick={
        async () => {
          register('user1', 'PassWord1@!', 'emailformat@email.com', '+821011111111');
        }
      }>Register user1</button><button onClick={
        async () => {
          register('user2', 'PassWord2@@', 'emailformat2@email.com', '+821022222222');
        }
      }>Register user2</button><button onClick={
        async () => {
          register('user3', 'PassWord3###', 'emailformat3@email.com', '+821033333333');
        }
      }>Register user3</button></li>
      <li><button onClick={
        async () => {
          login('user1', 'PassWord1@!');
        }
      }>Login as user1</button><button onClick={
        async () => {
          login('user2', 'PassWord2@@');
        }
      }>Login as user2</button><button onClick={async () => {
        login('user3', 'PassWord3###');
      }}>Login as user3</button></li>
      <li><button onClick={async () => {
        logOut(() => {
          socket.emit('logout', () => {
            setRooms([]);
          });
        });
      }}>Logout</button></li>
      <li><button onClick={
        async () => {
          printUser();
        }
      }>WhoamI</button></li>
      <li><button onClick={
        async () => {
          sendPost();
        }
      }>Set post</button></li>
    </ul>
    <h3>Posts</h3>
    <ul>
      {
        posts ? posts.map((post, index) => {
          return <li key={index}>{post.postuser.user_id} <button onClick={() => {
            socket.emit('join_chatroom',
              { user1: user.id, user2: post.postuser.id, postKey: post.key },
              (data) => {
                console.log('server responded!', data);
              });
          }}>Create ChatRoom</button></li>;
        }) : <li>no posts</li>
      }
    </ul>
    <h3>Rooms</h3>
    <ul>
      {
        rooms ? rooms.map((room, index) => {
          return <li key={index}><Link to={`/test/chat/${room.room_id}`}>{room.room_id}</Link> {room.new_message ? <span>New Message!</span> : <span>None..</span>}</li>;
        }) : <li>no rooms</li>
      }
    </ul>
  </div>;
};

export default TestChat;
