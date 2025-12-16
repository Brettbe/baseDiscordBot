import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import ExtendedClient from "../../../class/ExtendedClient";

export default {
  structure: new SlashCommandBuilder()
    .setName("help")
    .setDescription("View all the possible commands!"),
  options: {
    cooldown: 15000,
  },
  /**
   * @param {ExtendedClient} client
   * @param {ChatInputCommandInteraction} interaction
   */
  run: async (client: ExtendedClient, interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply();

    const mapIntCmds = client.applicationcommandsArray.map(
      (v: { type: number; name: string; description?: string }) =>
        `\`${v.type === 2 || v.type === 3 ? "" : "/"}${v.name}\`: ${
          v.description || "(No description)"
        }`
    );

    await interaction.followUp({
      embeds: [
        new EmbedBuilder()
          .setTitle("Help command")
          .addFields({ name: "Slash commands", value: `${mapIntCmds.join("\n")}` }),
      ],
    });
  },
};
