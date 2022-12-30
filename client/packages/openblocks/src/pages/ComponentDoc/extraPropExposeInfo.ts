import { UICompType } from "comps/uiCompRegistry";
import { IProperty } from "./common/Exposing";

const TypeObject = "Object";

type IExtraPropExposeInfo = {
  [n in UICompType]?: {
    properties?: Record<string, Pick<IProperty, "type">>;
  };
};

const extraExposeInfo: IExtraPropExposeInfo = {
  table: {
    properties: {
      selectedRow: {
        type: TypeObject,
      },
    },
  },
};

export default extraExposeInfo;
