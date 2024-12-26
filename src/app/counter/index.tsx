import {
  startTransition,
  useActionState,
  useState,
  useTransition,
} from "react";
import { useFormStatus } from "react-dom";

// 非同期データ取得関数
const fetchData = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

export function CounterForUseTransition() {
  const [count, setCount] = useState(0);
  const [isPending, st] = useTransition();

  const handleClick = () => {
    st(async () => {
      await fetchData();
      setCount(count + 1);
    });
  };

  return (
    <div>
      <h2>CounterForUseTransition</h2>
      <p>Count: {count}</p>
      <button type="button" onClick={handleClick} disabled={isPending}>
        Increment
      </button>
    </div>
  );
}

export function CounterForUseActionState() {
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

  const handleClick = () => {
    startTransition(() => {
      runAction({ type: "INCREMENT" });
    });
  };

  return (
    <div>
      <h2>CounterFor formAction</h2>
      <p>Count: {count}</p>
      <button type="button" onClick={handleClick} disabled={isPending}>
        Increment
      </button>
    </div>
  );
}

export function CounterForFormAction() {
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
      <h2>CounterFor formAction</h2>
      <p>Count: {count}</p>
      <button type="submit" disabled={isPending}>
        Increment
      </button>
    </form>
  );
}

function SubmitButton() {
  const status = useFormStatus();

  return (
    <button type="submit" disabled={status.pending}>
      Increment
    </button>
  );
}

export function CounterForFormStatus() {
  const [count, runAction] = useActionState<number, { type: "INCREMENT" }>(
    async (prev, payload) => {
      if (payload.type === "INCREMENT") {
        await fetchData();
        return prev + 1;
      }
      return prev;
    },
    0,
  );

  const action = async () => {
    runAction({ type: "INCREMENT" });
  };

  return (
    <form action={action}>
      <h2>CounterFor formStatus</h2>
      <p>Count: {count}</p>
      <SubmitButton />
    </form>
  );
}
