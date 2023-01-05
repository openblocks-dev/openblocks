import { Table } from "antd";
import { Comp } from "openblocks-core";
import { UICompType } from "comps/uiCompRegistry";
import { EventConfigsType } from "comps/controls/eventHandlerControl";
import { evalAndReduceWithExposing } from "comps/utils";
import { ExposingInfo } from "comps/utils/exposingTypes";
import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import extraExposeInfo from "../extraPropExposeInfo";
import { Desc, Section, Title1 } from "./Styled";
import { trans } from "i18n";

interface IProps {
  compName: UICompType;
  compFactory: new (...args: any[]) => Comp;
}

interface ICommonExposingInfo {
  name: ReactNode;
  desc: ReactNode;
}

export interface IMethod extends ICommonExposingInfo {}
export interface IEvent extends ICommonExposingInfo {}
export interface IProperty extends ICommonExposingInfo {
  type: string;
}

export interface IExposingInfo {
  properties?: IProperty[];
  methods?: IMethod[];
  events?: IEvent[];
}

const Wrapper = styled.div`
  table {
    border: 0 !important;
  }
  tr:last-child td {
    border-bottom: 0 !important;
  }
  td:last-child {
    border-right: 0 !important;
  }
  .ant-table {
    color: #333333;
  }
  .ant-table-container {
    border: 1px solid #d7d9e0 !important;
    border-radius: 4px;
  }
  .ant-table-thead > tr > th {
    background-color: #f9f9fa;
  }
  .ant-table-tbody > tr.ant-table-row:hover > td {
    background-color: #f9f9fa;
  }
`;

export default function Exposing(props: IProps) {
  const { compName, compFactory } = props;
  const [exposingInfo, setExposingInfo] = useState<IExposingInfo>({});

  useEffect(() => {
    const handleExposingInfo = (ins: any) => {
      const ei: ExposingInfo = ins.exposingInfo();
      const ev = ins.exposingValues;
      const eventNames: EventConfigsType = ins.children.onEvent?.getEventNames() || [];
      const properties = Object.entries(ei.propertyDesc).map(([name, desc]) => {
        const value = ev[name];
        let type = "";
        if (value !== undefined && value !== null) {
          const typeStr = Object.prototype.toString.call(value);
          const m = typeStr.match(/\[object (.+?)\]/);
          if (m) {
            type = m[1];
          }
        } else {
          const extra = extraExposeInfo[compName]?.properties?.[name];
          if (extra?.type) {
            type = extra.type;
          }
        }
        return {
          name,
          desc,
          type,
        };
      });
      const methods = Object.entries(ei.methods).map(([name, info]) => {
        return {
          name,
          desc:
            info.description ||
            trans("componentDoc.defaultMethodDesc", {
              name: name.replace(/^set/, ``).toLowerCase(),
            }),
        };
      });
      const events = eventNames.map(({ label, description }) => {
        return {
          name: label,
          desc: description,
        };
      });
      setExposingInfo({ properties, methods, events });
    };

    if (compFactory) {
      let ins: any = new compFactory({
        value: {
          hidden: true,
        },
      });
      ins = evalAndReduceWithExposing(ins);
      handleExposingInfo(ins);
      return;
    }
  }, [compFactory, compName]);

  return (
    <Wrapper>
      {(exposingInfo.properties || []).length > 0 && (
        <Section>
          <Title1>{trans("componentDoc.property")}</Title1>
          <Desc>{trans("componentDoc.propertyUsage")}</Desc>
          <Table
            bordered
            size="small"
            rowKey="name"
            pagination={false}
            columns={[
              { dataIndex: "name", title: trans("componentDoc.propertyName"), width: 180 },
              { dataIndex: "type", title: trans("componentDoc.type"), width: 120 },
              { dataIndex: "desc", title: trans("componentDoc.methodDesc") },
            ]}
            dataSource={exposingInfo.properties || []}
          />
        </Section>
      )}
      {(exposingInfo.events || []).length > 0 && (
        <Section>
          <Title1>{trans("componentDoc.event")}</Title1>
          <Table
            bordered
            size="small"
            rowKey="name"
            pagination={false}
            columns={[
              { dataIndex: "name", title: trans("componentDoc.eventName"), width: 180 },
              { dataIndex: "desc", title: trans("componentDoc.methodDesc") },
            ]}
            dataSource={exposingInfo.events || []}
          />
        </Section>
      )}
      {(exposingInfo.methods || []).length > 0 && (
        <Section>
          <Title1>{trans("componentDoc.mehtod")}</Title1>
          <Desc>{trans("componentDoc.methodUsage")}</Desc>
          <Table
            bordered
            size="small"
            rowKey="name"
            pagination={false}
            columns={[
              { dataIndex: "name", title: trans("componentDoc.methodName"), width: 180 },
              { dataIndex: "desc", title: trans("componentDoc.methodDesc") },
            ]}
            dataSource={exposingInfo.methods || []}
          />
        </Section>
      )}
    </Wrapper>
  );
}
