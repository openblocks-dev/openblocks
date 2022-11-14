import { changeValueAction } from "openblocks-core";
import { ColumnLinksComp } from "comps/comps/tableComp/column/columnLinksComp";
import { ColumnMarkdownComp } from "comps/comps/tableComp/column/columnMarkdownComp";
import { ColumnTagsComp } from "comps/comps/tableComp/column/columnTagsComp";
import ColumnTypeView from "comps/comps/tableComp/column/columnTypeView";
import {
  BadgeStatusComp,
  ButtonComp,
  ImageComp,
  LinkComp,
  SimpleTextComp,
} from "comps/comps/tableComp/column/simpleColumnTypeComps";
import { withType } from "comps/generators";
import { Dropdown } from "openblocks-design";
import { trans } from "i18n";
import { DateTimeComp } from "comps/comps/tableComp/column/columnDateComp";

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

export const ColumnTypeMap = {
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

type ColumnTypeMapType = typeof ColumnTypeMap;
export type ColumnTypeKeys = keyof ColumnTypeMapType;

const TypedColumnTypeComp = withType(ColumnTypeMap, "text");

export class ColumnTypeComp extends TypedColumnTypeComp {
  override getView(): any {
    return {
      view: <ColumnTypeView>{this.children.comp.getView()}</ColumnTypeView>,
      value: this.children.comp.getDisplayValue(),
    };
  }

  override getPropertyView() {
    return (
      <>
        <Dropdown
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
