import PageSkeleton from "./PageSkeleton";

interface ProductLoadingProps {
  hideHeader?: boolean;
}

export function ProductLoading(props: ProductLoadingProps) {
  return <PageSkeleton hideSideBar hideContent hideHeader={props.hideHeader} />;
}
