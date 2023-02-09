import { en } from "./en";

export const it: typeof en = {
  ...en,
  cancel: "Annulla",
  table: {
    ...en.table,
    saveChanges: "Salvare le modifiche",
    cancelChanges: "Annulla modifiche",
    saveChangesNotBind:
      "Nessun gestore eventi configurato per il salvataggio delle modifiche. Associa almeno un gestore di eventi prima del clic.",
  },
};
