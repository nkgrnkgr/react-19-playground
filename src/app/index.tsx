import {
  CounterForFormAction,
  CounterForFormStatus,
  CounterForUseTransition,
} from "./counter";

export function App() {
  return (
    <div>
      <h1>Hello React 19</h1>
      <CounterForFormAction />
      <CounterForUseTransition />
      <CounterForUseTransition />
      <CounterForFormStatus />
    </div>
  );
}
