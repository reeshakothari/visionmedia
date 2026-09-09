"use client";

import { ListManager } from "./ListManager";
import type { Client } from "@/lib/cms";
import { addClientAction, updateClientAction, deleteClientAction, reorderClientsAction } from "@/lib/actions";

export default function ClientsManager({ initialClients }: { initialClients: Client[] }) {
  return (
    <ListManager
      title="Clients"
      description={'Company logos shown in the Corporate Event page’s "Our Clients" section.'}
      items={initialClients}
      fields={[
        { name: "logo", label: "Logo", type: "image" },
        { name: "name", label: "Company name", type: "text" },
      ]}
      emptyDefaults={{ logo: "", name: "" }}
      createAction={(input) => addClientAction({ name: input.name, logo: input.logo })}
      updateAction={(id, patch) => updateClientAction(id, patch)}
      deleteAction={(id) => deleteClientAction(id)}
      reorderAction={(ids) => reorderClientsAction(ids)}
    />
  );
}
