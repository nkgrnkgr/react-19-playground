import type React from "react";
import {
  type ReactNode,
  createContext,
  startTransition,
  useActionState,
  useContext,
} from "react";
import type { User } from "./fetchUser";

type State = {
  user: User | null;
};

type ContextProps = {
  state: State;
  updateState: (payload: Partial<State>) => Promise<void>;
  pending: boolean;
};

const AsyncStateContext = createContext<ContextProps | null>(null);

export const AsyncStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, runAction, pending] = useActionState<State, Partial<State>>(
    (prev, payload) => {
      return { ...prev, ...payload };
    },
    {
      user: null,
    },
  );

  const updateState = async (payload: Partial<State>) => {
    startTransition(() => {
      runAction(payload);
    });
  };

  return (
    <AsyncStateContext.Provider
      value={{
        state,
        updateState,
        pending,
      }}
    >
      {children}
    </AsyncStateContext.Provider>
  );
};

export const useAsyncStateContext = () => {
  const context = useContext(AsyncStateContext);
  if (context === null) {
    throw new Error("not found AsyncStateProvider");
  }
  return context;
};
