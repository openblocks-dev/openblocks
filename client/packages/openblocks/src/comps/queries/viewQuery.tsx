import { MultiCompBuilder } from "../generators";
import { list } from "../generators/list";
import { ParamsJsonControl } from "../controls/paramsControl";
import { FunctionProperty, toQueryView } from "./queryCompUtils";

const childrenMap = {
  fields: list(ParamsJsonControl),
};

/**
 * Only use in view mode.
 * The Server will transform the original query to this to hide sensitive data.
 */
export const ViewQuery = new MultiCompBuilder(childrenMap, (props) =>
  toQueryView(
    props.fields.reduce(
      (result: FunctionProperty[], kv) => [
        ...result,
        ...Object.entries(kv.getView()).map((pair) => ({
          key: pair[0],
          value: pair[1],
        })),
      ],
      []
    )
  )
)
  .setPropertyViewFn(() => null)
  .build();
