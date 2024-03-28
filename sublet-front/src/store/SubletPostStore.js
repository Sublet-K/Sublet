import { create } from 'zustand';
const URL = process.env.NEXT_PUBLIC_BACKEND_URL + `/post?maxPost=6&page=`;

export const SubletPostStore = create(set => ({
  post: [],
  postExist: false,
  page: 1,
  postAll: [],
  postMarker: false,
  setPostMarker: flag => set(() => ({ postMarker: flag })),
  // setPost: (post) => set(() => ({ post: [...post], postExist: true })),
  clearPost: () => set(() => ({ post: [], postExist: false })),
  clearPostAll: () => set(() => ({ postAll: [], postExist: false })),
  asyncGetPost: async page => {
    const json = await fetch(URL + page).then(response => response.json());
    set(() => ({ post: [...json], postExist: true }));
  },
  asyncGetPostAll: async () => {
    let nowPage = 1;
    let tempPostAll = [];
    while (true) {
      const json = await fetch(URL + nowPage).then(response => response.json());

      if (json.length === 0) {
        set(state => ({ postAll: [...tempPostAll], postExist: true }));
        break;
      }
      tempPostAll = [...tempPostAll, ...json];
      nowPage++;
    }
  },
}));
