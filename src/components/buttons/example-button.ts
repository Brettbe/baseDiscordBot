import { ButtonInteraction } from "discord.js";
import ExtendedClient from "../../class/ExtendedClient";

export default {
  customId: "example-button",
  /**
   *
   * @param {ExtendedClient} client
   * @param {ButtonInteraction} interaction
   */
  run: async (client: ExtendedClient, interaction: ButtonInteraction) => {
    await interaction.reply({
      content: "The button has been successfully responded!",
      ephemeral: true,
    });
  },
};
