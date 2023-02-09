import { trans } from "i18n";
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
        </Section>
        <Section name={sectionNames.layout}>{children.autoHeight.getPropertyView()}</Section>
        {/* <Section name={sectionNames.style}>{children.showBorder.propertyView({ label: "" })}</Section> */}
        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    );
  };
}
