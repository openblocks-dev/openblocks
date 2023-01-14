import { BottomResType, getBottomResIcon } from "@openblocks-ee/util/bottomResUtils";
import { useSelector } from "react-redux";
import { getDataSource } from "redux/selectors/datasourceSelectors";

export default function DataSourceIcon(props: {
  dataSourceType: BottomResType;
  size?: "middle" | "large";
}) {
  const { dataSourceType, size } = props;
  const datasourceList = useSelector(getDataSource);
  const datasource = datasourceList.find((i) => i.datasource.type === dataSourceType);
  return getBottomResIcon(dataSourceType, size, datasource?.datasource.pluginDefinition?.icon);
}
