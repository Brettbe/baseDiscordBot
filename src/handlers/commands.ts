import { readdirSync } from "fs";
import { log } from "../functions";
import ExtendedClient from "../class/ExtendedClient";

/**
 *
 * @param {ExtendedClient} client
 */
export default async (client: ExtendedClient) => {
  for (const type of readdirSync("./src/commands/")) {
    for (const dir of readdirSync("./src/commands/" + type)) {
      for (const file of readdirSync("./src/commands/" + type + "/" + dir).filter((f: string) =>
        f.endsWith(".js")
      )) {
        const module = await import("../commands/" + type + "/" + dir + "/" + file);

        if (!module) continue;

        if (type === "prefix") {
          if (!module.structure?.name || !module.run) {
            log(
              "Unable to load the command " +
                file +
                " due to missing 'structure#name' or/and 'run' properties.",
              "warn"
            );

            continue;
          }

          client.collection.prefixcommands.set(module.structure.name, module);

          if (module.structure.aliases && Array.isArray(module.structure.aliases)) {
            module.structure.aliases.forEach((alias: string) => {
              client.collection.aliases.set(alias, module.structure.name);
            });
          }
        } else {
          if (!module.structure?.name || !module.run) {
            log(
              "Unable to load the command " +
                file +
                " due to missing 'structure#name' or/and 'run' properties.",
              "warn"
            );

            continue;
          }

          client.collection.interactioncommands.set(module.structure.name, module);
          client.applicationcommandsArray.push(module.structure as never);
        }

        log("Loaded new command: " + file, "info");
      }
    }
  }
};
