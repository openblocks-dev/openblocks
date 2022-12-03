import axios from "axios";
import { EmptyContent } from "components/EmptyContent";
import { LinkButton } from "openblocks-design";
import { useShallowEqualSelector } from "util/hooks";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux/reducers";
import { packageMetaReadyAction } from "redux/reduxActions/npmPluginActions";
import styled from "styled-components";
import { NpmPackageMeta } from "types/remoteComp";
import { ComListTitle } from "../styledComponent";
import { PluginCompItem } from "./PluginCompItem";
import { NPM_REGISTRY_URL } from "constants/npmPlugins";
import { trans } from "i18n";

const PluginViewWrapper = styled.div`
  margin-bottom: 12px;
  .remove-btn {
    display: none;
  }
  &:hover {
    .remove-btn {
      display: block;
    }
  }
`;

const PluginViewTitle = styled.div`
  height: 22px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PluginViewTitleText = styled.div`
  flex: 1;
`;

const PluginViewContent = styled.div`
  padding-top: 4px;
  margin-bottom: 12px;
`;

interface PluginViewProps {
  name: string;
  onRemove: () => void;
}

export function PluginItem(props: PluginViewProps) {
  const { name, onRemove } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const packageMeta = useShallowEqualSelector(
    (state: AppState) => state.npmPlugin.packageMeta[name]
  );
  const currentVersion = useSelector((state: AppState) => state.npmPlugin.packageVersion[name]);
  const versions = useMemo(() => packageMeta?.versions || {}, [packageMeta?.versions]);
  const comps = versions[currentVersion]?.openblocks?.comps || {};
  const compNames = Object.keys(comps);
  const hasComps = compNames.length > 0;

  useEffect(() => {
    setLoading(true);
    axios.get<NpmPackageMeta>(`${NPM_REGISTRY_URL}/${name}/`).then((res) => {
      if (res.status >= 400) {
        return;
      }
      setLoading(false);
      dispatch(packageMetaReadyAction(name, res.data));
    });
  }, [dispatch, name]);

  return (
    <PluginViewWrapper>
      <PluginViewTitle>
        <PluginViewTitleText>
          <ComListTitle>{name}</ComListTitle>
        </PluginViewTitleText>
        <LinkButton
          onClick={onRemove}
          className="remove-btn"
          text={trans("npm.removePluginBtnText")}
        />
      </PluginViewTitle>
      <PluginViewContent>
        {compNames.length === 0 && (
          <EmptyContent text={loading ? "Loading..." : "No components found."} />
        )}
        {hasComps &&
          compNames.map((compName) => (
            <PluginCompItem
              key={compName}
              compName={compName}
              compMeta={comps[compName]}
              packageName={name}
              packageVersion={currentVersion}
            />
          ))}
      </PluginViewContent>
    </PluginViewWrapper>
  );
}
