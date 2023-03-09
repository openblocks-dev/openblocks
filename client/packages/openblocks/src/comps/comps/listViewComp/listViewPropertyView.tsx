import { trans, transToNode } from "i18n";
import { Section, sectionNames } from "openblocks-design";
import { ListViewImplComp } from "./listViewComp";
import { ListCompType } from "./listViewUtils";

type Props = {
  comp: InstanceType<typeof ListViewImplComp>;
};

export function listPropertyView(compType: ListCompType) {
  return (props: Props) => {
    const { comp } = props;
    const children = comp.children;
    return (
      <>
        <Section name={sectionNames.basic}>
          {children.noOfRows.propertyView({
            label: trans("data"),
            tooltip: trans("listView.dataTooltip"),
          })}
          {compType === "grid" &&
            children.noOfColumns.propertyView({
              label: trans("listView.noOfColumns"),
            })}
          {children.itemIndexName.propertyView({
            label: trans("listView.itemIndexName"),
            tooltip: transToNode("listView.itemIndexNameDesc", {
              default: (
                <b>
                  <i>i</i>
                </b>
              ),
            }),
          })}
          {children.itemDataName.propertyView({
            label: trans("listView.itemDataName"),
            tooltip: transToNode("listView.itemDataNameDesc", {
              default: (
                <b>
                  <i>currentItem</i>
                </b>
              ),
            }),
          })}
        </Section>
        <Section name={trans("prop.pagination")}>
          {comp.children.pagination.getPropertyView()}
        </Section>
        <Section name={sectionNames.layout}>{children.autoHeight.getPropertyView()}</Section>
        {/* <Section name={sectionNames.style}>{children.showBorder.propertyView({ label: "" })}</Section> */}
        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    );
  };
}
