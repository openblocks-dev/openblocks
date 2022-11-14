import { EmptyContent } from "components/EmptyContent";
import KeyValueItemList, { KeyValueItem } from "components/KeyValueItemList";
import LinkPlusButton from "components/LinkPlusButton";
import { ActionSelectorControl } from "comps/controls/actionSelector/actionSelectorControl";
import CompNameControl from "comps/controls/compNameControl";
import { list } from "comps/generators/list";
import { NameGenerator } from "comps/utils";
import { Section, TacoButton } from "openblocks-design";
import { BluePlusIcon } from "openblocks-design";
import { trans } from "i18n";
import { ModuleMethodListItemComp } from "./moduleMethodListItemComp";
import { ConfigViewSection } from "./styled";

const ModuleMethodListCompBase = list(ModuleMethodListItemComp);

class ModuleMethodListComp extends ModuleMethodListCompBase {
  nameGen = new NameGenerator();

  names() {
    return this.getView().map((i) => i.children.name.getView());
  }

  handleAdd() {
    const name = this.nameGen.init(this.names()).genItemName("method");
    this.dispatch(
      this.pushAction({
        name,
      })
    );
  }

  handleDelete(idx: number) {
    this.dispatch(this.deleteAction(idx));
  }

  async executeMethodByName(name: string) {
    const method = this.getView().find((i) => i.children.name.getView() === name);
    if (!method) {
      return;
    }
    return method.execute();
  }

  getTestView() {
    const methodTriggers = this.getView().map((i) => {
      const name = i.children.name.getView();
      return (
        <TacoButton key={name} onClick={() => this.executeMethodByName(name)}>
          {trans("module.excuteMethod", { name: name })}
        </TacoButton>
      );
    });
    return (
      <Section name={trans("moduleContainer.methodTest")}>
        {methodTriggers.length > 0 ? (
          methodTriggers
        ) : (
          <EmptyContent text={trans("module.emptyTestMethod")} />
        )}
      </Section>
    );
  }

  getPropertyView() {
    const children = this.getView();
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
}

export default ModuleMethodListComp;

interface PropertyViewProps {
  onAdd: () => void;
  onDelete: (idx: number) => void;
  items: InstanceType<typeof ModuleMethodListItemComp>[];
}

function PropertyView(props: PropertyViewProps) {
  const { onDelete, onAdd, items } = props;

  return (
    <div>
      <KeyValueItemList
        title={trans("module.method")}
        keyTitle={trans("module.name")}
        valueTitle={trans("module.action")}
        extra={
          <LinkPlusButton icon={<BluePlusIcon />} onClick={onAdd}>
            {trans("addItem")}
          </LinkPlusButton>
        }
        emptyText={trans("module.emptyMethod")}
        onEmptyClick={onAdd}
      >
        {items.map((i, idx) => (
          <MethodItem key={idx} {...i.children} onDelete={() => onDelete(idx)} />
        ))}
      </KeyValueItemList>
    </div>
  );
}

interface MethodItemProps {
  name: InstanceType<typeof CompNameControl>;
  action: InstanceType<typeof ActionSelectorControl>;
  onDelete: () => void;
}

function MethodItem(props: MethodItemProps) {
  const { name, action, onDelete } = props;

  const content = (
    <>
      {name.propertyView({ label: trans("module.name") })}
      {action.propertyView({ label: trans("module.action") })}
    </>
  );

  return (
    <KeyValueItem
      del={onDelete}
      name={name.getView()}
      value={action.displayName()}
      clickPopoverContent={content}
    />
  );
}
