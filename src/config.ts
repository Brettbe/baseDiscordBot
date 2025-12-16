export default {
  client: {
    token: process.env.CLIENT_TOKEN,
    id: process.env.CLIENT_ID,
  },
  handler: {
    prefix: "?",
    deploy: true,
    commands: {
      prefix: true,
      slash: true,
      user: true,
      message: true,
    },
  },
  users: {
    developers: process.env.DEVELOPERS_ID,
  },
  development: {
    enabled: true,
    guild: process.env.GUILD_ID,
  },
  activities: {
    name: process.env.BOT_ACTIVITY_NAME || "NoName",
    type: process.env.BOT_ACTIVITY_TYPE || 4,
    state: process.env.BOT_ACTIVITY_STATE || "NoState",
  },
  messageSettings: {
    nsfwMessage: "The current channel is not a NSFW channel.",
    developerMessage: "You are not authorized to use this command.",
    cooldownMessage: "Slow down buddy! You're too fast to use this command.",
    notHasPermissionMessage: "You do not have the permission to use this command.",
    notHasPermissionComponent: "You do not have the permission to use this component.",
    missingDevIDsMessage:
      "This is a developer only command, but unable to execute due to missing user IDs in configuration file.",
  },
};
