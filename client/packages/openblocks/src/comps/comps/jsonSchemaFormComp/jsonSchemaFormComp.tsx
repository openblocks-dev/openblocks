import { AjvError, ErrorListProps, UISchemaSubmitButtonOptions, withTheme } from "@rjsf/core";
import { Button } from "antd";
import { BoolControl } from "comps/controls/boolControl";
import { jsonObjectExposingStateControl } from "comps/controls/codeStateControl";
import { styleControl } from "comps/controls/styleControl";
import { JsonSchemaFormStyle, JsonSchemaFormStyleType } from "comps/controls/styleControlConstants";
import { depsConfig, NameConfigHidden, withExposingConfigs } from "comps/generators/withExposing";
import { withMethodExposing } from "comps/generators/withMethodExposing";
import { ValueFromOption } from "openblocks-design";
import { i18n } from "openblocks-core";
import { i18nObjs, trans } from "i18n";
import { JSONSchema7 } from "json-schema";
import styled from "styled-components";
import { toBoolean, toNumber, toString } from "util/convertUtils";
import { Section, sectionNames } from "openblocks-design";
import { jsonObjectControl } from "../../controls/codeControl";
import { eventHandlerControl, submitEvent } from "../../controls/eventHandlerControl";
import { UICompBuilder } from "../../generators";
import DateWidget from "./dateWidget";
import ErrorBoundary from "./errorBoundary";
import { Theme } from "@rjsf/antd";
import { hiddenPropertyView } from "comps/utils/propertyUtils";

Theme.widgets.DateWidget = DateWidget(false);
Theme.widgets.DateTimeWidget = DateWidget(true);
const Form = withTheme(Theme);

const EventOptions = [submitEvent] as const;

const Container = styled.div<{ $style: JsonSchemaFormStyleType }>`
  background: ${(props) => props.$style.background};
  border: 1px solid ${(props) => props.$style.border};
  padding: 15px;
  width: 100%;
  height: 100%;
  overflow: auto;
  border-radius: ${(props) => props.$style.radius};

  label[for="root-title"] {
    font-size: 18px;
  }

  #root-description {
    font-size: 12px;
    display: inline-block;
    line-height: 2;
  }

  .ant-form-item-label {
    padding: 0;
    font-weight: 600;
  }

  .ant-form-item-extra {
    min-height: 0px;
  }
  .ant-form-item-explain {
    line-height: 24px;
  }

  .ant-form-item {
    margin-bottom: 8px;
  }

  .help-block {
    margin-bottom: 0px;
  }
`;

function convertData(schema?: JSONSchema7, data?: any) {
  if (!schema) {
    return data;
  }
  // fix required invalidation problem
  if (schema.type !== "object" && (data === undefined || data === null || data === "")) {
    return undefined;
  }
  switch (schema.type) {
    case "string":
      return toString(data);
    case "number":
      return toNumber(data);
    case "integer":
      return Math.trunc(toNumber(data));
    case "boolean":
      return toBoolean(data);
    case "null":
      return null;
    case "object": {
      const properties = schema.properties;
      if (!properties) {
        return data;
      }
      let newData: Record<string, unknown> = {};
      Object.entries(properties).forEach(([key, definition]) => {
        const value = data ? data[key] : undefined;
        newData[key] = typeof definition === "object" ? convertData(definition, value) : value;
      });
      return newData;
    }
    default:
      return data;
  }
}

// FIXME: translate more other errors
// refer to ajv-i18n, https://github.com/ajv-validator/ajv-i18n/blob/master/messages/index.js
// https://github.com/ajv-validator/ajv/tree/6a671057ea6aae690b5967ee26a0ddf8452c6297#Validation-keywords
// JSON schema refer to https://json-schema.org/understanding-json-schema/reference/
function getErrorMessage(error: AjvError): string {
  switch (error.name) {
    case "required":
      return trans("jsonSchemaForm.required");
    case "maximum":
      return trans("jsonSchemaForm.maximum", { value: error.params.limit });
    case "minimum":
      return trans("jsonSchemaForm.minimum", { value: error.params.limit });
    case "exclusiveMaximum":
      return trans("jsonSchemaForm.exclusiveMaximum", { value: error.params.limit });
    case "exclusiveMinimum":
      return trans("jsonSchemaForm.exclusiveMinimum", { value: error.params.limit });
    case "multipleOf":
      return trans("jsonSchemaForm.multipleOf", { value: error.params.multipleOf });
    case "minLength":
      return trans("jsonSchemaForm.minLength", { value: error.params.limit });
    case "maxLength":
      return trans("jsonSchemaForm.maxLength", { value: error.params.limit });
    case "pattern":
      return trans("jsonSchemaForm.pattern", { value: error.params.pattern });
    case "format":
      return trans("jsonSchemaForm.format", { value: error.params.format });
  }
  return "";
}

function transformErrors(errors: AjvError[]): AjvError[] {
  return errors.map((error) => {
    const message = getErrorMessage(error);
    if (message) {
      // Error message displayed below the comp (will not be displayed when "ui:help" is set in the UI schema)
      error.message = message;
      // Errors displayed in the error list, not displayed when empty
      error.stack = "";
    }
    return error;
  });
}

function ErrorList(props: ErrorListProps) {
  const errors = props.errors.filter((error) => error.stack);
  // Avoid showing blank space when there are no errors
  if (errors.length === 0) {
    return <></>;
  }
  return (
    <div style={{ color: "red" }}>
      <ul>
        {errors.map((error) => (
          <li key={error.stack}>{error.stack}</li>
        ))}
      </ul>
    </div>
  );
}

function onSubmit(props: {
  resetAfterSubmit: boolean;
  data: { reset: () => void };
  onEvent: (eventName: ValueFromOption<typeof EventOptions>) => Promise<unknown>;
}): Promise<void> {
  return props.onEvent("submit").then(() => {
    if (props.resetAfterSubmit) {
      props.data.reset();
    }
  });
}

let FormBasicComp = (function () {
  const childrenMap = {
    resetAfterSubmit: BoolControl,
    schema: jsonObjectControl(i18nObjs.jsonForm.defaultSchema),
    uiSchema: jsonObjectControl(i18nObjs.jsonForm.defaultUiSchema),
    data: jsonObjectExposingStateControl("data", i18nObjs.jsonForm.defaultFormData),
    onEvent: eventHandlerControl(EventOptions),
    style: styleControl(JsonSchemaFormStyle),
  };
  return new UICompBuilder(childrenMap, (props) => {
    // rjsf 4.20 supports ui:submitButtonOptions, but if the button is customized, it will not take effect. Here we implement it ourselves
    const buttonOptions = props?.uiSchema?.[
      "ui:submitButtonOptions"
    ] as UISchemaSubmitButtonOptions;

    return (
      <Container $style={props.style}>
        <ErrorBoundary>
          <Form
            schema={props.schema}
            uiSchema={props.uiSchema}
            formData={convertData(props.schema, props.data.value)}
            onSubmit={() => onSubmit(props)}
            onChange={(e) => props.data.onChange(e.formData)}
            transformErrors={(errors) => transformErrors(errors)}
            ErrorList={ErrorList}
            children={
              <Button
                hidden={buttonOptions?.norender}
                disabled={buttonOptions?.props?.disabled}
                className={buttonOptions?.props?.className}
                type="primary"
                htmlType="submit"
                style={{ float: "right" }}
              >
                {buttonOptions?.submitText ?? trans("event.submit")}
              </Button>
            }
          />
        </ErrorBoundary>
      </Container>
    );
  })
    .setPropertyViewFn((children) => {
      return (
        <>
          <Section name={sectionNames.basic}>
            {children.resetAfterSubmit.propertyView({
              label: trans("jsonSchemaForm.resetAfterSubmit"),
            })}
            {children.schema.propertyView({
              label: trans("jsonSchemaForm.jsonSchema"),
              tooltip: (
                <>
                  {trans("jsonSchemaForm.schemaTooltip") + " "}
                  <a
                    href={"http://json-schema.org/learn/getting-started-step-by-step"}
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    JSON schema
                  </a>
                </>
              ),
            })}
            {children.uiSchema.propertyView({
              label: trans("jsonSchemaForm.uiSchema"),
              tooltip: (
                <>
                  {trans("jsonSchemaForm.schemaTooltip") + " "}
                  <a
                    href={
                      "https://react-jsonschema-form.readthedocs.io/en/latest/api-reference/uiSchema/"
                    }
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    UI schema
                  </a>
                </>
              ),
            })}
            {children.data.propertyView({
              label: trans("jsonSchemaForm.defaultData"),
            })}
          </Section>

          <Section name={sectionNames.interaction}>{children.onEvent.getPropertyView()}</Section>

          <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>

          <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
        </>
      );
    })
    .build();
})();

let FormTmpComp = withExposingConfigs(FormBasicComp, [
  depsConfig({
    name: "data",
    desc: trans("jsonSchemaForm.dataDesc"),
    depKeys: ["schema", "data"],
    func: (input) => {
      return convertData(input.schema, input.data);
    },
  }),
  NameConfigHidden,
]);

FormTmpComp = withMethodExposing(FormTmpComp, [
  {
    method: {
      name: "submit",
      description: trans("export.submitDesc"),
      params: [],
    },
    // FIXME: currently, it cannot be verified when submitted through the method, fix it later
    execute: (comp, values) =>
      onSubmit({
        resetAfterSubmit: comp.children.resetAfterSubmit.getView(),
        data: comp.children.data.getView(),
        onEvent: comp.children.onEvent.getView(),
      }),
  },
]);

export const JsonSchemaFormComp = FormTmpComp;
