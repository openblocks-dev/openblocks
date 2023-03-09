import React, { ReactNode, Suspense } from "react";
import { useIsMobile } from "util/hooks";
import { Skeleton } from "antd";

export function useUIView(mobileView: ReactNode, pcView: ReactNode) {
  return <>{useIsMobile() ? <Suspense fallback={<Skeleton />}>{mobileView}</Suspense> : pcView}</>;
}
