import { Skeleton } from "antd";
import { ComponentType, lazy, Suspense, useRef } from "react";
import { Route, RouteProps } from "react-router";
import PageSkeleton from "./PageSkeleton";

interface IProps extends Omit<RouteProps, "component"> {
  load: () => Promise<{ default: ComponentType<any> }>;

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
  const { fallback = "normal", load, ...routeProps } = props;

  const ref = useRef<ComponentType | null>(null);
  if (!ref.current) {
    ref.current = lazy(load);
  }

  const Comp = ref.current;
  return (
    <Suspense fallback={fallbacks[fallback]}>
      <Route {...routeProps} component={Comp}></Route>
    </Suspense>
  );
}
