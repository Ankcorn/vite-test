import { useRef } from "react";
import "./App.css";
import { trpc } from "./trpc";
export function loader() {
  console.log("hey");
}

function App() {
  const hello = trpc.useQuery(["getUser"]);
  if (!hello.data) return <div>Loading...</div>;
  return (
    <div>
      <p>{hello.data.name}</p>
    </div>
  );
}

export default App;
