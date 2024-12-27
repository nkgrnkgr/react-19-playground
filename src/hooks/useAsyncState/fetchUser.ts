type Param = {
  id: string;
};

export type User = {
  id: string;
  name: string;
  note: string;
};

type Response = {
  user: User | null;
};

// 非同期データ取得関数
export const fetchUser = async (param: Param): Promise<Response> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = USERS[param.id] || null;
      return resolve({
        user: user,
      });
    }, 2000);
  });
};

const USERS: Record<Param["id"], User> = {
  "1": {
    id: "1",
    name: "Alice",
    note: "Hello",
  },
  "2": {
    id: "2",
    name: "Bob",
    note: "World",
  },
  "3": {
    id: "3",
    name: "Charlie",
    note: "Note 3",
  },
  "4": {
    id: "4",
    name: "David",
    note: "Note 4",
  },
  "5": {
    id: "5",
    name: "Eve",
    note: "Note 5",
  },
  "6": {
    id: "6",
    name: "Frank",
    note: "Note 6",
  },
  "7": {
    id: "7",
    name: "Grace",
    note: "Note 7",
  },
  "8": {
    id: "8",
    name: "Hank",
    note: "Note 8",
  },
  "9": {
    id: "9",
    name: "Ivy",
    note: "Note 9",
  },
  "10": {
    id: "10",
    name: "Jack",
    note: "Note 10",
  },
};
