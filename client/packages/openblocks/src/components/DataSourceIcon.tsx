import { getBottomResIcon } from "@openblocks-ee/util/bottomResUtils";
import { HttpMethod } from "api/api";
import { useSelector } from "react-redux";
import { getDataSource } from "redux/selectors/datasourceSelectors";
import { BottomResType } from "util/bottomResUtils";

export default function DataSourceIcon(props: {
  dataSourceType: BottomResType;
  size?: "middle" | "large";
  httpMethod?: HttpMethod;
}) {
  const { dataSourceType, size, httpMethod } = props;
  const datasourceList = useSelector(getDataSource);
  const datasource = datasourceList.find((i) => i.datasource.type === dataSourceType);
  return getBottomResIcon(
    dataSourceType,
    size,
    datasource?.datasource.pluginDefinition?.icon,
    httpMethod
  );
}
