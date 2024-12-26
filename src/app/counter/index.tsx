import { useActionState } from "react";

// 非同期データ取得関数
const fetchData = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

export function Counter() {
  const [count, runAction, isPending] = useActionState<
    number,
    { type: "INCREMENT" }
  >(async (prev, payload) => {
    if (payload.type === "INCREMENT") {
      await fetchData();
      return prev + 1;
    }
    return prev;
  }, 0);

  return (
    <form
      action={async () => {
        runAction({ type: "INCREMENT" });
      }}
    >
      <p>Count: {count}</p>
      <button type="submit" disabled={isPending}>
        Increment
      </button>
    </form>
  );
}
