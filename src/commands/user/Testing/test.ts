import { UserContextMenuCommandInteraction, ContextMenuCommandBuilder } from "discord.js";
import ExtendedClient from "../../../class/ExtendedClient";

export default {
  structure: new ContextMenuCommandBuilder().setName("Test User command").setType(2),
  /**
   * @param {ExtendedClient} client
   * @param {UserContextMenuCommandInteraction} interaction
   */
  run: async (client: ExtendedClient, interaction: UserContextMenuCommandInteraction) => {
    await interaction.reply({
      content: "Hello user context command!",
    });
  },
};
