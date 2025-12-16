import { MessageContextMenuCommandInteraction, ContextMenuCommandBuilder } from "discord.js";
import ExtendedClient from "../../../class/ExtendedClient";

export default {
  structure: new ContextMenuCommandBuilder().setName("Test Message command").setType(3),
  /**
   * @param {ExtendedClient} client
   * @param {MessageContextMenuCommandInteraction} interaction
   */
  run: async (client: ExtendedClient, interaction: MessageContextMenuCommandInteraction) => {
    await interaction.reply({
      content: "Hello message context command!",
    });
  },
};
