import styled from "styled-components";
import { HomeRes } from "./HomeLayout";
import { HomeResCard } from "./HomeResCard";
import React, { useState } from "react";
import { MoveToFolderModal } from "./MoveToFolderModal";

const ApplicationCardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(408px, 1fr));
  grid-template-rows: repeat(auto-fill, min(68px, 100%));
  grid-column-gap: 112px;
  margin: 48px 26px 80px;
  overflow: hidden;
  @media screen and (max-width: 500px) {
    display: block;
    margin: 48px 18px 80px;
  }
`;

export function HomeCardView(props: { resources: HomeRes[] }) {
  const [needMoveRes, setNeedMoveRes] = useState<HomeRes | undefined>(undefined);

  return (
    <ApplicationCardsWrapper>
      {props.resources.map((res) => (
        <HomeResCard key={res.id} res={res} onMove={setNeedMoveRes} />
      ))}
      <MoveToFolderModal source={needMoveRes} onClose={() => setNeedMoveRes(undefined)} />
    </ApplicationCardsWrapper>
  );
}
