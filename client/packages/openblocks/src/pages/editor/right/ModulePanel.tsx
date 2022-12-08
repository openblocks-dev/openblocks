import CreateAppButton from "components/CreateAppButton";
import { EmptyContent } from "components/EmptyContent";
import { ApplicationMeta, AppTypeEnum } from "constants/applicationConstants";
import { APPLICATION_VIEW_URL } from "constants/routesURL";
import {
  ActiveTextColor,
  BorderActiveShadowColor,
  BorderColor,
  GreyTextColor,
} from "constants/style";
import { ModuleDocIcon } from "openblocks-design";
import { trans } from "i18n";
import { draggingUtils } from "layout/draggingUtils";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllModules } from "redux/reduxActions/applicationActions";
import styled from "styled-components";
import { TransparentImg } from "util/commonUtils";
import { ExternalEditorContext } from "util/context/ExternalEditorContext";
import { formatTimestamp } from "util/dateTimeUtils";
import { RightContext } from "./rightContext";
import { modulesSelector } from "../../../redux/selectors/applicationSelector";
import { ComListTitle, ExtensionContentWrapper } from "./styledComponent";

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    cursor: grab;
    .module-icon {
      box-shadow: 0 0 5px 0 rgba(49, 94, 251, 0.15);
      border-color: ${BorderActiveShadowColor};
      transform: scale(1.2);
    }
    .module-name {
      color: ${ActiveTextColor};
    }
  }
  .module-icon {
    transition: all 200ms linear;
    margin-right: 8px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${BorderColor};
    border-radius: 4px;
  }
  .module-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }
  .module-name {
    line-height: 1.5;
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .module-desc {
    line-height: 1.5;
    font-size: 12px;
    color: ${GreyTextColor};
  }
`;

interface ModuleItemProps {
  meta: ApplicationMeta;
  onDrag: (type: string) => void;
}

function ModuleItem(props: ModuleItemProps) {
  const compType = "module";
  const { meta } = props;
  return (
    <ItemWrapper
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("compType", compType);
        e.dataTransfer.setDragImage(TransparentImg, 0, 0);
        draggingUtils.setData("compType", compType);
        draggingUtils.setData(
          "compLayout",
          meta.containerSize
            ? { w: meta.containerSize.width, h: meta.containerSize.height }
            : undefined
        );
        draggingUtils.setData("compInitialValue", {
          appId: props.meta.applicationId,
        });
        props.onDrag(compType);
      }}
    >
      <div className="module-icon">
        <ModuleDocIcon width="19px" />
      </div>
      <div className="module-content">
        <div className="module-name">{props.meta.name}</div>
        <div className="module-desc">{formatTimestamp(props.meta.createAt)}</div>
      </div>
    </ItemWrapper>
  );
}

export default function ModulePanel() {
  const dispatch = useDispatch();
  const modules = useSelector(modulesSelector);
  const { onDrag, searchValue } = useContext(RightContext);
  const { applicationId } = useContext(ExternalEditorContext);

  useEffect(() => {
    dispatch(fetchAllModules({}));
  }, [dispatch]);

  const filteredModules = modules.filter((i) => {
    if (i.applicationId === applicationId || i.applicationType !== AppTypeEnum.Module) {
      return false;
    }
    return i.name.includes(searchValue.trim().toLowerCase()) || !searchValue.trim();
  });

  const items = filteredModules.map((i) => (
    <ModuleItem onDrag={onDrag} key={i.applicationId} meta={i} />
  ));
  const empty = (
    <EmptyContent
      text={
        <>
          <p>{trans("rightPanel.emptyModules")}</p>
          <CreateAppButton
            type={AppTypeEnum.Module}
            onSuccess={(app) => {
              const appId = app.applicationInfoView.applicationId;
              const url = APPLICATION_VIEW_URL(appId, "edit");
              window.open(url);
            }}
          />
        </>
      }
    />
  );
  return (
    <>
      <ComListTitle>{trans("rightPanel.moduleListTitle")}</ComListTitle>
      <ExtensionContentWrapper>{items.length > 0 ? items : empty}</ExtensionContentWrapper>
    </>
  );
}
