import styled from "styled-components";
import { useSelector } from "react-redux";
import { getQueryLibrary } from "../../redux/selectors/queryLibrarySelectors";
import React, { ReactNode, useEffect, useState } from "react";
import { QueryLibraryContext, QueryLibraryState } from "../../util/context/QueryLibraryContext";
import { timestampToHumanReadable } from "../../util/dateTimeUtils";
import { QueryLibraryComp } from "../../comps/comps/queryLibrary/queryLibraryComp";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  min-width: min-content;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 95px;
  flex-shrink: 0;
  padding: 32px 36px 0 16px;
  border-bottom: 1px solid #e1e3eb;
`;
const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;

  .taco-edit-text-wrapper {
    width: 252px;
    color: #222222;
    font-size: 18px;
    font-weight: 500;
    margin-left: -8px;

    :hover {
      background-color: #f5f5f6;
    }
  }

  .taco-edit-text-input {
    width: 252px;
    color: #222222;
    font-weight: 500;
    font-size: 18px;
    background-color: #f5f5f6;
    border: 1px solid #3377ff;
    margin-left: -8px;

    :focus {
      border-color: #3377ff;
      box-shadow: 0 0 0 2px #d6e4ff;
    }
  }
`;
const QueryTime = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 13px;
  color: #b8b9bf;
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Body = styled.div`
  position: relative;
  display: flex;
  height: calc(100% - 95px);
  width: 100%;
`;
const BodyLeft = styled.div`
  position: relative;
  padding: 16px 16px 80px;
  flex-grow: 1;
  width: calc(100% - 297px);
`;
const BodyRight = styled.div`
  height: 100%;
  width: 297px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-left: 1px solid #e1e3eb;
`;

export const QueryLibraryEditorView = (props: {
  comp: InstanceType<typeof QueryLibraryComp>;
  title: ReactNode;
  subTitle?: ReactNode;
  headerRight: ReactNode;
  bodyLeft: ReactNode;
  bodyRight: ReactNode;
}) => {
  const { comp, title, subTitle, headerRight, bodyLeft, bodyRight } = props;
  const query = comp.children.query;

  const queryLibrary = useSelector(getQueryLibrary);

  const [queryLibraryState, setQueryLibraryState] = useState<QueryLibraryState>();

  useEffect(() => {
    const newQueryLibraryState = new QueryLibraryState(comp, (changeQueryLibraryStateFn) => {
      setQueryLibraryState((oldState) =>
        oldState ? changeQueryLibraryStateFn(oldState) : undefined
      );
    });
    setQueryLibraryState(newQueryLibraryState);
  }, []);

  useEffect(() => {
    if (queryLibraryState != null) {
      queryLibraryState.setComp(() => comp);
    }
  }, [comp]);

  if (!queryLibraryState) {
    return null;
  }

  return (
    <QueryLibraryContext.Provider value={queryLibraryState}>
      <Wrapper>
        <Header>
          <HeaderLeft>
            {title}
            <QueryTime>
              {timestampToHumanReadable(
                queryLibrary[query.children.id.getView()]?.createTime,
                30 * 24 * 60 * 60 * 1000
              )}
              {subTitle}
            </QueryTime>
          </HeaderLeft>
          <HeaderRight>{headerRight}</HeaderRight>
        </Header>
        <Body>
          <BodyLeft>{bodyLeft}</BodyLeft>
          <BodyRight>{bodyRight}</BodyRight>
        </Body>
      </Wrapper>
    </QueryLibraryContext.Provider>
  );
};
