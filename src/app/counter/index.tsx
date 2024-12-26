import { useState, useTransition } from "react";

// 非同期データ取得関数
const fetchData = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

export function Counter() {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await fetchData();
      setCount((prev) => prev + 1);
    });
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button type="button" onClick={handleClick} disabled={isPending}>
        Increment
      </button>
    </div>
  );
}
