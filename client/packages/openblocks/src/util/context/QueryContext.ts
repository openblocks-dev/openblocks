import React from "react";

class Query {
  readonly datasourceId?: string;
  readonly disableJSCompletion?: boolean; // fixme: delete after server supports eval
}

export const QueryContext = React.createContext<Query | undefined>(undefined);
