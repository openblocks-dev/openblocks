import React from "react";

class Query {
  readonly datasourceId?: string;
  readonly disableJSCompletion?: boolean; // fixme: delete after server supports eval
  readonly placement?: "queryLibrary" | "editor";
}

export const QueryContext = React.createContext<Query | undefined>(undefined);
