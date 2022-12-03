import ReactDOM from "react-dom";
import { CompIDE } from "openblocks-sdk";
import { name, version, openblocks } from "./package.json";
import compMap from "./src/index";

import "openblocks-sdk/dist/style.css";

function CompDevApp() {
  return (
    <CompIDE
      compMap={compMap}
      packageName={name}
      packageVersion={version}
      compMeta={openblocks.comps}
    />
  );
}

ReactDOM.render(<CompDevApp />, document.querySelector("#root"));
