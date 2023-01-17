import React from "react";
import { ResourceType } from "@openblocks-ee/constants/queryConstants";

class Query {
  readonly datasourceId?: string;
  readonly resourceType?: ResourceType;
  readonly disableJSCompletion?: boolean; // fixme: delete after server supports eval
  readonly placement?: "queryLibrary" | "editor";
}

export const QueryContext = React.createContext<Query | undefined>(undefined);
