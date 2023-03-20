import { routeByNameAction, executeQueryAction } from "openblocks-core";
import { CompAction } from "openblocks-core";
import { StringControl } from "comps/controls/codeControl";
import { jsonObjectStateControl } from "comps/controls/codeStateControl";
import { UICompBuilder, withDefault } from "comps/generators";
import { NameConfig, NameConfigHidden, withExposingConfigs } from "comps/generators/withExposing";
import { Section, sectionNames } from "openblocks-design";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { getPromiseAfterDispatch } from "util/promiseUtils";
import { EventData, EventTypeEnum } from "./types";
import { hiddenPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";

const defaultModel = {
  name: "{{currentUser.name}}",
  text: trans("customComp.text"),
  query: "query1",
};

const defaultCode = `
  <style type="text/css">
  body {
    padding: 5px;
  }
  </style>
  
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/antd@4.21.4/dist/antd.min.css"/>
  <script type="text/javascript" src="https://unpkg.com/antd@4.21.4/dist/antd.min.js" ></script>
  
  <div id="root"></div>
  
  <script type="text/babel">
  
  const { Button, Card, Space } = antd;
  
  const MyCustomComponent = ({ runQuery, model, updateModel}) => (
    <Card title={"Hello, " + model.name}>
        <p>{model.text}</p>
        <Space>
          <Button
            type="primary"
            onClick={() => runQuery(model.query)}
         >
            ${trans("customComp.triggerQuery")}
          </Button>
          <Button
            onClick={() => updateModel({ text: "${trans("customComp.updateText")}" })}
          >
          ${trans("customComp.updateData")}
          </Button>
      </Space>
    </Card>
  );
  
  const ConnectedComponent = ${trans("customComp.sdkGlobalVarName")}.connect(MyCustomComponent);
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<ConnectedComponent />);
  
  </script>
  `;

type IProps = {
  code: string;
  model: any;
  onModelChange: (v: any) => void;
  dispatch: (action: CompAction<any>) => void;
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  iframe {
    border: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
`;

function sendMessage(iframe: HTMLIFrameElement | null, data: any) {
  iframe?.contentWindow?.postMessage(data, "*");
}

function InnerCustomComponent(props: IProps) {
  const hostIdRef = useRef(String(Date.now()));
  const { model, code, onModelChange, dispatch } = props;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const modelRef = useRef<any>(model);
  const reloadFlagRef = useRef(false);

  const methodsRef = useRef({
    runQuery: async (data: any) => {
      const { queryName } = data;
      return getPromiseAfterDispatch(
        dispatch,
        routeByNameAction(queryName, executeQueryAction({}))
      ).catch((error) => Promise.resolve({}));
    },

    getModel: async (data: any) => {
      return modelRef.current;
    },

    updateModel: async (data: any) => {
      modelRef.current = {
        ...modelRef.current,
        ...data,
      };
      sendMessage(iframeRef.current, {
        type: EventTypeEnum.Data,
        payload: {
          model: modelRef.current,
        },
      });
      onModelChange(modelRef.current);
      return modelRef.current;
    },
  });

  // model update
  useEffect(() => {
    sendMessage(iframeRef.current, {
      type: EventTypeEnum.Data,
      payload: {
        model: model,
      },
    });
    modelRef.current = model;
  }, [model]);

  useEffect(() => {
    if (!iframeRef.current) {
      return;
    }
    const iframe = iframeRef.current;
    const handleMessage = (event: MessageEvent<EventData>) => {
      const { type, payload, hostId } = event.data;
      if (!type || !payload || !hostId) {
        // need not cared message
        return;
      }
      // log.info("HOST Receive:", event.data);
      if (hostId !== hostIdRef.current) {
        // log.info("hostId, current:", hostIdRef.current, ",receive: ", hostId);
        return;
      }
      const { method, data, id } = payload;
      if (type === EventTypeEnum.Invoke) {
        const fn = methodsRef.current[method];
        if (!fn || typeof fn !== "function") {
          // TODO: response error
          return;
        }
        fn(data).then((res: any) => {
          sendMessage(iframe, {
            type: EventTypeEnum.Invoke,
            payload: {
              id,
              method,
              response: res,
            },
          });
        });
      }
    };

    const handleIFrameLoad = () => {
      sendMessage(iframe, {
        type: EventTypeEnum.Init,
        payload: {
          hostId: hostIdRef.current,
          code,
        },
      });
    };
    window.addEventListener("message", handleMessage);
    iframe.addEventListener("load", handleIFrameLoad);

    const src = iframe.getAttribute("src");
    if (src && reloadFlagRef) {
      reloadFlagRef.current = false;
      const url = new URL("?_t=" + Date.now(), src);
      iframe.setAttribute("src", url.toString());
    }

    return () => {
      reloadFlagRef.current = true;
      window.removeEventListener("message", handleMessage);
      iframe.removeEventListener("load", handleIFrameLoad);
    };
  }, [code]);

  return (
    <Wrapper>
      <iframe ref={iframeRef} title="custom-comp" src={trans("customComponent.entryUrl")} />
    </Wrapper>
  );
}

const childrenMap = {
  model: jsonObjectStateControl(defaultModel),
  code: withDefault(StringControl, defaultCode),
};

const CustomCompBase = new UICompBuilder(childrenMap, (props, dispatch) => {
  const { code, model } = props;
  return (
    <InnerCustomComponent
      code={code}
      model={model.value}
      onModelChange={(v) => model.onChange(v)}
      dispatch={dispatch}
    />
  );
})
  .setPropertyViewFn((children) => {
    return (
      <>
        <Section name={sectionNames.basic}>
          {children.model.propertyView({ label: trans("data") })}
          {children.code.propertyView({ label: trans("code"), language: "html" })}
        </Section>
        <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>
      </>
    );
  })
  .build();

class CustomCompAutoHeight extends CustomCompBase {
  override autoHeight(): boolean {
    return false;
  }
}

export const CustomComp = withExposingConfigs(CustomCompAutoHeight, [
  new NameConfig("model", trans("data")),
  new NameConfig("code", trans("code")),
  NameConfigHidden,
]);
