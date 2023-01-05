import { CellProps } from "components/EditableCell";
import { DateTimeComp } from "comps/comps/tableComp/column/columnTypeComps/columnDateComp";
import ColumnTypeView from "comps/comps/tableComp/column/columnTypeView";
import { BadgeStatusComp, ButtonComp } from "comps/comps/tableComp/column/simpleColumnTypeComps";
import { withType } from "comps/generators";
import { trans } from "i18n";
import { changeValueAction } from "openblocks-core";
import { Dropdown } from "openblocks-design";
import { ImageComp } from "./columnTypeComps/columnImgComp";
import { LinkComp } from "./columnTypeComps/columnLinkComp";
import { ColumnLinksComp } from "./columnTypeComps/columnLinksComp";
import { ColumnMarkdownComp } from "./columnTypeComps/columnMarkdownComp";
import { ColumnTagsComp } from "./columnTypeComps/columnTagsComp";
import { SimpleTextComp } from "./columnTypeComps/simpleTextComp";

const actionOptions = [
  {
    label: trans("table.text"),
    value: "text",
  },
  {
    label: trans("table.link"),
    value: "link",
  },
  {
    label: trans("table.links"),
    value: "links",
  },
  {
    label: trans("table.tag"),
    value: "tag",
  },
  {
    label: trans("table.badgeStatus"),
    value: "badgeStatus",
  },
  {
    label: trans("table.button"),
    value: "button",
  },
  {
    label: trans("table.image"),
    value: "image",
  },
  {
    label: trans("table.dateTime"),
    value: "dateTime",
  },
  {
    label: "Markdown",
    value: "markdown",
  },
] as const;

export const ColumnTypeCompMap = {
  text: SimpleTextComp,
  button: ButtonComp,
  badgeStatus: BadgeStatusComp,
  link: LinkComp,
  tag: ColumnTagsComp,
  links: ColumnLinksComp,
  image: ImageComp,
  markdown: ColumnMarkdownComp,
  dateTime: DateTimeComp,
};

type ColumnTypeMapType = typeof ColumnTypeCompMap;
export type ColumnTypeKeys = keyof ColumnTypeMapType;

const TypedColumnTypeComp = withType(ColumnTypeCompMap, "text");

export class ColumnTypeComp extends TypedColumnTypeComp {
  override getView() {
    const childView = this.children.comp.getView();
    return {
      view: (cellProps: CellProps) => {
        const thisView = typeof childView === "function" ? childView(cellProps) : childView;
        return <ColumnTypeView>{thisView}</ColumnTypeView>;
      },
      value: this.children.comp.getDisplayValue(),
    };
  }

  override getPropertyView() {
    return (
      <>
        <Dropdown
          showSearch={true}
          value={this.children.compType.getView()}
          options={actionOptions}
          label={trans("table.columnType")}
          onChange={(value) => {
            // Keep the previous text value, some components do not have text, the default value is currentCell
            let textRawData = "{{currentCell}}";
            if (this.children.comp.children.hasOwnProperty("text")) {
              textRawData = (this.children.comp.children as any).text.toJsonValue();
            }
            this.dispatch(
              changeValueAction({
                compType: value,
                comp: { text: textRawData },
              })
            );
          }}
        />
        {this.children.comp.getPropertyView()}
      </>
    );
  }
}
