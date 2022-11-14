import styled from "styled-components";

const SnapshotItemDiv = styled.div<{ selected?: boolean }>`
  padding: 10px 16px 12px 0;
  border-left: 4px solid transparent;
  cursor: pointer;
  ${(props) =>
    props.selected &&
    `
      background: #f2f7fc;
      border-radius: 4px;
      border-left: 4px solid #315efb;
    
      .snapshot-item-dot {
        visibility: hidden;
      }
  `};

  :hover {
    background: #f2f7fc;
    border-radius: 4px;
  }
`;

const ItemTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    width: 264px;
    font-weight: 500;
    font-size: 14px;
    color: #222222;
    line-height: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const Dot = styled.div`
  border-radius: 50%;
  height: 4px;
  width: 4px;
  background: #b8b9bf;
`;

const ItemNameTime = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
  margin-top: 10px;
  height: 16px;
`;

const NameLabel = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 104px;

  font-size: 13px;
  color: #8b8fa3;
  line-height: 16px;
`;

const TimeLabel = styled.span`
  font-size: 13px;
  color: #b8b9bf;
  line-height: 16px;
`;

export interface SnapshotItemProps {
  title: string;
  timeInfo: string;
  userName: string;
  onClick: () => void;
  selected?: boolean;
}

const SnapshotItem = (props: SnapshotItemProps) => (
  <SnapshotItemDiv onClick={props.onClick} tabIndex={0} selected={props.selected}>
    <ItemTitle>
      <Dot className="snapshot-item-dot" />
      <span title={props.title}>{props.title}</span>
    </ItemTitle>
    <ItemNameTime>
      <NameLabel>{props.userName}</NameLabel>
      <TimeLabel>{props.timeInfo}</TimeLabel>
    </ItemNameTime>
  </SnapshotItemDiv>
);

export const SnapshotList = (props: { items: SnapshotItemProps[] }) => {
  return (
    <>
      {props.items.map((item, index) => (
        <SnapshotItem key={index} {...item} />
      ))}
    </>
  );
};
