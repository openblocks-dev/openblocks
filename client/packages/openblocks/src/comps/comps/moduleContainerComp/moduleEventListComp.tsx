import { message } from "antd";
import { EmptyContent } from "components/EmptyContent";
import { KeyValueItem, KeyValueItemListWithNewCreateState } from "components/KeyValueItemList";
import { StringControl } from "comps/controls/codeControl";
import CompNameControl from "comps/controls/compNameControl";
import { simpleMultiComp, valueComp } from "comps/generators";
import { list } from "comps/generators/list";
import { NameGenerator } from "comps/utils";
import { NameAndExposingInfo } from "comps/utils/exposingTypes";
import { controlItem, Section, Switch, SwitchWrapper } from "openblocks-design";
import { trans } from "i18n";
import { ModuleEventListItemComp } from "./moduleEventListItemComp";
import { ConfigViewSection } from "./styled";

const ModuleEventListComp = list(ModuleEventListItemComp);

export class ModuleEventComp extends simpleMultiComp({
  list: ModuleEventListComp,
  enableEventTestMessage: valueComp<boolean>(true),
}) {
  nameGen = new NameGenerator();

  names() {
    return this.children.list.getView().map((i) => i.children.name.getView());
  }

  trigger(name: string) {
    if (this.children.enableEventTestMessage.getView()) {
      message.success(trans("module.eventTriggered", { name: name }));
    }
  }

  handleAdd() {
    const list = this.children.list;
    const name = this.nameGen.init(this.names()).genItemName("event");
    list.dispatch(list.pushAction({ name }));
  }

  handleDelete(idx: number) {
    const list = this.children.list;
    list.dispatch(list.deleteAction(idx));
  }

  getTestView() {
    const hasEvents = this.children.list.getView().length > 0;
    const enableTestMessage = this.children.enableEventTestMessage.getView();
    const label = trans("module.globalPromptWhenEventTriggered");
    return (
      <Section name={trans("moduleContainer.eventTest")}>
        {hasEvents
          ? controlItem(
              { filterText: label },
              <SwitchWrapper label={label}>
                <Switch
                  value={enableTestMessage}
                  onChange={(value) => {
                    this.children.enableEventTestMessage.dispatchChangeValueAction(value);
                  }}
                />
              </SwitchWrapper>
            )
          : controlItem({}, <EmptyContent text={trans("module.emptyEventTest")} />)}
      </Section>
    );
  }

  getPropertyView() {
    const children = this.children.list.getView();
    return (
      <ConfigViewSection>
        <PropertyView
          onAdd={() => this.handleAdd()}
          onDelete={(i) => this.handleDelete(i)}
          items={children}
        />
      </ConfigViewSection>
    );
  }

  nameAndExposingInfo(): NameAndExposingInfo {
    const result: NameAndExposingInfo = {};
    this.children.list.getView().forEach((item) => {
      result[item.children.name.getView()] = item.exposingInfo();
    });
    return result;
  }
}

interface PropertyViewProps {
  onAdd: () => void;
  onDelete: (idx: number) => void;
  items: InstanceType<typeof ModuleEventListItemComp>[];
}

function PropertyView(props: PropertyViewProps) {
  const { onDelete, onAdd, items } = props;

  return (
    <div>
      <KeyValueItemListWithNewCreateState
        title={trans("module.event")}
        keyTitle={trans("module.name")}
        onAdd={onAdd}
        emptyText={trans("module.emptyEvent")}
      >
        {(newCreateIdx) =>
          items.map((i, idx) => (
            <EventItem
              key={idx}
              {...i.children}
              onDelete={() => onDelete(idx)}
              showPopover={idx === newCreateIdx}
            />
          ))
        }
      </KeyValueItemListWithNewCreateState>
    </div>
  );
}

interface EventItemProps {
  name: InstanceType<typeof CompNameControl>;
  description: InstanceType<typeof StringControl>;
  onDelete: () => void;
  showPopover: boolean;
}

function EventItem(props: EventItemProps) {
  const { name, onDelete } = props;
  const content = <>{name.propertyView({ label: trans("module.name") })}</>;
  return (
    <KeyValueItem
      del={onDelete}
      name={name.getView()}
      clickPopoverContent={content}
      defaultShowPopover={props.showPopover}
    />
  );
}
