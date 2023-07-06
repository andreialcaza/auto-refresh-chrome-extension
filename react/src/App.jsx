import { useState } from "react";
import Random from "./components/random";
import Fixed from "./components/fixed";

const App = () => {
  const [toggleUI, setToggleUI] = useState(true);

  return (
    <div className="p-5 w-72">
      <p className="text-lg font-semibold">Refresh within seconds:</p>
      {toggleUI ? <Random /> : <Fixed />}
      <p
        className="text-right cursor-pointer font-light underline mt-5"
        onClick={() => setToggleUI(!toggleUI)}
      >
        {toggleUI ? "Fixed" : "Random"}
      </p>
    </div>
  );
};

export default App;
