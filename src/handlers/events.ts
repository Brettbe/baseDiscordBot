import { readdirSync } from "fs";
import { log } from "../functions";
import ExtendedClient from "../class/ExtendedClient";

/**
 *
 * @param {ExtendedClient} client
 */
export default async (client: ExtendedClient) => {
  for (const dir of readdirSync("./src/events/")) {
    for (const file of readdirSync("./src/events/" + dir).filter((f) => f.endsWith(".js"))) {
      const module = await import("../events/" + dir + "/" + file);

      if (!module) continue;

      if (!module.event || !module.run) {
        log(
          "Unable to load the event " + file + " due to missing 'name' or/and 'run' properties.",
          "warn"
        );

        continue;
      }

      log("Loaded new event: " + file, "info");

      if (module.once) {
        client.once(module.event, (...args) => module.run(client, ...args));
      } else {
        client.on(module.event, (...args) => module.run(client, ...args));
      }
    }
  }
};
