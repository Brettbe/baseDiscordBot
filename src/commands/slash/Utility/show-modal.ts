import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import ExtendedClient from "../../../class/ExtendedClient";

export default {
  structure: new SlashCommandBuilder()
    .setName("show-modal")
    .setDescription("Modal interaction testing."),
  /**
   * @param {ExtendedClient} client
   * @param {ChatInputCommandInteraction} interaction
   */
  run: async (client: ExtendedClient, interaction: ChatInputCommandInteraction) => {
    const modal = new ModalBuilder({
      title: "Modal Example",
      customId: "modal-example",
      components: [
        new ActionRowBuilder<TextInputBuilder>().addComponents(
          new TextInputBuilder({
            label: "What's your name?",
            customId: "name",
            placeholder: "Type your name here!",
            style: TextInputStyle.Short,
            required: true,
          })
        ),
      ],
    });

    await interaction.showModal(modal);
  },
};
