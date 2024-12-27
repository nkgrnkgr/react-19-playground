import { useState } from "react";
import { useFormStatus } from "react-dom";
import { AsyncStateProvider } from "../../hooks/useAsyncState";

type Param = {
  name: string;
  note: string;
};

type User = {
  id: string;
  name: string;
  note: string;
};

type Response = {
  user: User;
};

// 非同期データ取得関数
const fetchData = async (param: Param): Promise<Response> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        user: {
          id: "1",
          name: param.name,
          note: param.note,
        },
      });
    }, 2000);
  });
};

function Form({ user }: { user: User | null }) {
  const { pending } = useFormStatus();

  if (pending) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <label>
          <span>名前：</span>
          <input type="text" name="name" />
        </label>
      </div>
      <div>
        <label>
          <span>メモ：</span>
          <input type="text" name="note" />
        </label>
      </div>
      <div>
        <button type="submit" disabled={pending}>
          Submit
        </button>
      </div>
      <div>
        <pre>{user ? JSON.stringify(user, null, 2) : "No data"}</pre>
      </div>
    </>
  );
}

export function FormDataSupport() {
  const [user, setUser] = useState<User | null>(null);

  const action = async (formData: FormData) => {
    const name = formData.get("name");
    const note = formData.get("note");
    const { user } = await fetchData({
      name: name as string,
      note: note as string,
    });
    setUser(user);
  };

  return (
    <form action={action}>
      <Form user={user} />
    </form>
  );
}
