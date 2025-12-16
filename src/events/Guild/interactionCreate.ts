import config from "../../config";
import { log } from "../../functions";
import ExtendedClient from "../../class/ExtendedClient";
import { Interaction } from "discord.js";

const cooldown = new Map();

export default {
  event: "interactionCreate",
  /**
   *
   * @param {ExtendedClient} client
   * @param {Interaction} interaction
   * @returns
   */
  run: async (client: ExtendedClient, interaction: Interaction) => {
    if (!interaction.isCommand()) return;

    if (config.handler.commands.slash === false && interaction.isChatInputCommand()) return;
    if (config.handler.commands.user === false && interaction.isUserContextMenuCommand()) return;
    if (config.handler.commands.message === false && interaction.isMessageContextMenuCommand())
      return;

    const command = client.collection.interactioncommands.get(interaction.commandName) as any;

    if (!command) return;

    try {
      if (config.users.developers === undefined) return;

      if (command.options?.developers) {
        if (
          config.users?.developers?.length > 0 &&
          !config.users?.developers?.includes(interaction.user.id)
        ) {
          await interaction.reply({
            content:
              config.messageSettings.developerMessage !== undefined &&
              config.messageSettings.developerMessage !== null &&
              config.messageSettings.developerMessage !== ""
                ? config.messageSettings.developerMessage
                : "You are not authorized to use this command",
            ephemeral: true,
          });

          return;
        } else if (config.users?.developers?.length <= 0) {
          await interaction.reply({
            content:
              config.messageSettings.missingDevIDsMessage !== undefined &&
              config.messageSettings.missingDevIDsMessage !== null &&
              config.messageSettings.missingDevIDsMessage !== ""
                ? config.messageSettings.missingDevIDsMessage
                : "This is a developer only command, but unable to execute due to missing user IDs in configuration file.",

            ephemeral: true,
          });

          return;
        }
      }

      if (command.structure?.nsfw) {
        if (interaction.channel && "nsfw" in interaction.channel && !interaction.channel.nsfw) {
          await interaction.reply({
            content:
              config.messageSettings.nsfwMessage !== undefined &&
              config.messageSettings.nsfwMessage !== null &&
              config.messageSettings.nsfwMessage !== ""
                ? config.messageSettings.nsfwMessage
                : "The current channel is not a NSFW channel",

            ephemeral: true,
          });

          return;
        }
      }

      if (command.options?.cooldown) {
        const cooldownFunction = () => {
          const data = cooldown.get(interaction.user.id);

          data.push(interaction.commandName);

          cooldown.set(interaction.user.id, data);

          setTimeout(() => {
            let data = cooldown.get(interaction.user.id);

            data = data.filter((v: string) => v !== interaction.commandName);

            if (data.length <= 0) {
              cooldown.delete(interaction.user.id);
            } else {
              cooldown.set(interaction.user.id, data);
            }
          }, command.options?.cooldown);
        };

        if (cooldown.has(interaction.user.id)) {
          const data = cooldown.get(interaction.user.id);

          if (data.some((v: string) => v === interaction.commandName)) {
            await interaction.reply({
              content:
                config.messageSettings.cooldownMessage !== undefined &&
                config.messageSettings.cooldownMessage !== null &&
                config.messageSettings.cooldownMessage !== ""
                  ? config.messageSettings.cooldownMessage
                  : "Slow down buddy! You're too fast to use this command",
            });

            return;
          } else {
            cooldownFunction();
          }
        } else {
          cooldown.set(interaction.user.id, [interaction.commandName]);

          cooldownFunction();
        }
      }

      command.run(client, interaction);
    } catch (error) {
      log(String(error), "err");
    }
  },
};
