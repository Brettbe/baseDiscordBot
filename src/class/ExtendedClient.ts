import { Client, Partials, Collection, GatewayIntentBits, GatewayIntentsString } from "discord.js";
import config from "../config";
import commands from "../handlers/commands";
import events from "../handlers/events";
import deploy from "../handlers/deploy";
import components from "../handlers/components";

export default class extends Client {
  collection = {
    interactioncommands: new Collection(),
    prefixcommands: new Collection(),
    aliases: new Collection(),
    components: {
      buttons: new Collection(),
      selects: new Collection(),
      modals: new Collection(),
    },
  };
  applicationcommandsArray = [];

  constructor() {
    super({
      intents: Object.keys(GatewayIntentBits) as GatewayIntentsString[],
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.User,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember,
      ],
      presence: {
        activities: [
          {
            name: "Test Bot",
            type: 4,
            state: "Looking at You",
          },
        ],
      },
    });
  }

  start = async () => {
    commands(this);
    events(this);
    components(this);

    await this.login(process.env.CLIENT_TOKEN || config.client.token);

    if (config.handler.deploy) deploy(this);
  };
}
