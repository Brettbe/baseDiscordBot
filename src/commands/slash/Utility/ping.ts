import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import ExtendedClient from "../../../class/ExtendedClient";

export default {
  structure: new SlashCommandBuilder().setName("ping").setDescription("See bot response time"),
  options: {
    cooldown: 5000,
  },
  /**
   * @param {ExtendedClient} client
   * @param {ChatInputCommandInteraction} interaction
   */
  run: async (client: ExtendedClient, interaction: ChatInputCommandInteraction) => {
    await interaction.reply({
      content: "Response time of " + client.ws.ping + " ms",
    });
  },
};
