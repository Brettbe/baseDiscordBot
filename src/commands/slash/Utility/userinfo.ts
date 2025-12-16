import { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import ExtendedClient from "../../../class/ExtendedClient";
import { time } from "../../../functions";

export default {
  structure: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Get a user's information.")
    .addUserOption((opt) => opt.setName("user").setDescription("The user.").setRequired(false)),
  /**
   * @param {ExtendedClient} client
   * @param {ChatInputCommandInteraction} interaction
   */
  run: async (client: ExtendedClient, interaction: ChatInputCommandInteraction) => {
    const user = interaction.options.getUser("user") || interaction.user;

    if (!interaction.guild) {
      await interaction.reply({
        content: "There is no guild specified.",
      });

      return;
    }

    const guild = interaction.guild;

    const member = interaction.guild.members.cache.get(user.id);

    if (!member || member.joinedTimestamp === null) {
      await interaction.reply({
        content: "That user is not on the guild.",
      });

      return;
    }

    const roles: any[] = [];

    if (member.roles)
      if (!interaction.guild) {
        await interaction.reply({
          content: "There is no guild specified.",
        });

        return;
      }

    member.roles.cache.forEach((role) => {
      if (role.id !== guild.roles.everyone.id) roles.push(`${role.toString()}`);
    });

    const arr = [
      `**Username**: ${user.username}`,
      `**Display name**: ${member.nickname || user.displayName}`,
      `**ID**: ${user.id}`,
      `**Joined Discord**: ${time(user.createdTimestamp, "d")} (${time(
        user.createdTimestamp,
        "R"
      )})`,
      `**Joined server**: ${time(member.joinedTimestamp, "d")} (${time(
        member.joinedTimestamp,
        "R"
      )})`,
      `**Roles** [${member.roles?.cache?.size - 1}]: ${roles.join(", ")}`,
      `**In a voice channel?**: ${member.voice.channel ? "Yes" : "No"}`,
      `**Guild owner?**: ${interaction.guild.ownerId === user.id ? "Yes" : "No"}`,
      `**Timed out?**: ${member.communicationDisabledUntilTimestamp ? "Yes" : "No"}`,
    ];

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("User info - " + user.username)
          .setThumbnail(member.displayAvatarURL())
          .setDescription(`${arr.join("\n")}`)
          .setColor("Blurple"),
      ],
    });
  },
};
