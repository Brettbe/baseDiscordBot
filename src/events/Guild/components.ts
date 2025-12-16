import config from "../../config";
import { log } from "../../functions";
import { Interaction } from "discord.js";
import ExtendedClient from "../../class/ExtendedClient";

export default {
  event: "interactionCreate",
  /**
   *
   * @param {ExtendedClient} client
   * @param {MessageComponentInteraction} interaction
   * @returns
   */
  run: async (client: ExtendedClient, interaction: Interaction) => {
    if (!interaction.isMessageComponent() && !interaction.isModalSubmit()) return;

    const componentPermission = async (component: any) => {
      if (
        component.options?.public === false &&
        interaction.user.id !== interaction.message?.interactionMetadata?.user.id
      ) {
        await interaction.reply({
          content:
            config.messageSettings.notHasPermissionComponent !== undefined &&
            config.messageSettings.notHasPermissionComponent !== null &&
            config.messageSettings.notHasPermissionComponent !== ""
              ? config.messageSettings.notHasPermissionComponent
              : "You do not have permission to use this component",
          ephemeral: true,
        });
        return false;
      }
      return true;
    };

    let component: any;

    if (interaction.isButton()) {
      component = client.collection.components.buttons.get(interaction.customId);
    }

    if (interaction.isAnySelectMenu()) {
      component = client.collection.components.selects.get(interaction.customId);
    }

    if (interaction.isModalSubmit()) {
      component = client.collection.components.modals.get(interaction.customId);
    }

    if (!component) return;

    try {
      if (!(await componentPermission(component))) return;

      component.run(client, interaction);
    } catch (error: any) {
      log(error.message, "err");
    }

    return;
  },
};
