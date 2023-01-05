import { JsonSchemaFormComp } from "comps/comps/jsonSchemaFormComp/jsonSchemaFormComp";
import { trans } from "i18n";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

export default function jsonSchemaFormExample() {
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title=""
          hideSettings={true}
          config={{
            schema:
              '{\n  "title": "User profile",\n  "description": "form example",\n  "type": "object",\n  "required": [\n    "name",\n    "phone"\n  ],\n  "properties": {\n    "name": {\n      "type": "string",\n      "title": "Name"\n    },\n    "phone": {\n      "type": "string",\n      "title": "Phone",\n      "minLength": 11\n    },\n    "birthday": {\n      "type": "string",\n      "title": "Birthday"\n    }\n  }\n}',
            uiSchema:
              '{\n  "name": {\n    "ui:autofocus": true,\n    "ui:emptyValue": ""\n  },\n  "phone": {\n    "ui:help": "Please input a 11 digits number"\n  },\n  "birthday": {\n    "ui:widget": "date"\n  }\n}',
            data: '{\n  "name": "Tom",\n  "phone": "13488886666",\n  "birthday": "1980-03-16"\n}',
          }}
          compFactory={JsonSchemaFormComp}
        />
      </ExampleGroup>
    </>
  );
}
