import { REST, Routes } from "discord.js";
import { log } from "../functions";
import config from "../config";
import ExtendedClient from "../class/ExtendedClient";

/**
 *
 * @param {ExtendedClient} client
 */
export default async (client: ExtendedClient) => {
  const token = config.client.token;
  const clientId = config.client.id;
  const guildId = config.development.guild;

  if (!token || !clientId) {
    log("Unable to load application commands: Missing Token or Client ID.", "err");
    return;
  }

  const rest = new REST({ version: "10" }).setToken(token);

  try {
    log("Started loading application commands... (this might take minutes!)", "info");

    if (config.development && config.development.enabled) {
      if (!guildId) {
        log("Development mode enabled but GUILD_ID is missing.", "err");
        return;
      }

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: client.applicationcommandsArray,
      });
      log(`Successfully loaded application commands to guild ${guildId}.`, "done");
    } else {
      await rest.put(Routes.applicationCommands(clientId), {
        body: client.applicationcommandsArray,
      });
      log("Successfully loaded application commands globally to Discord API.", "done");
    }
  } catch (error) {
    log("Unable to load application commands to Discord API:" + error, "err");
  }
};
