import { useState } from "react";
import { useFormStatus } from "react-dom";

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

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      Submit
    </button>
  );
}

export function FormDataSupport() {
  const [user, setUser] = useState<User | null>(null);

  const action = async (formData: FormData) => {
    const name = formData.get("name");
    const note = formData.get("note");
    const user = await fetchData({
      name: name as string,
      note: note as string,
    });
    setUser(user.user);
  };

  return (
    <form action={action}>
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
        <SubmitButton />
      </div>
      <div>
        <pre>{user ? JSON.stringify(user, null, 2) : "No data"}</pre>
      </div>
    </form>
  );
}
