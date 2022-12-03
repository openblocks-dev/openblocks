import { Skeleton } from "antd";
import { ComponentType, lazy, Suspense, useRef } from "react";
import { Route, RouteProps } from "react-router";
import PageSkeleton from "./PageSkeleton";

interface IProps extends RouteProps {
  /**
   * normal: only one antd's skeleton
   * layout: including basic layout
   */
  fallback?: "normal" | "layout" | "outAppLayout";
}

const fallbacks = {
  normal: <Skeleton style={{ padding: 32 }} />,
  layout: <PageSkeleton />,
  outAppLayout: <PageSkeleton logoWithName />,
};

export default function LazyRoute(props: IProps) {
  const { fallback = "normal", ...routeProps } = props;
  return (
    <Suspense fallback={fallbacks[fallback]}>
      <Route {...routeProps}></Route>
    </Suspense>
  );
}
