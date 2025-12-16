import { log } from "../../functions";
import ExtendedClient from "../../class/ExtendedClient";
import { Client } from "discord.js";

module.exports = {
  event: "ready",
  once: true,
  /**
   *
   * @param {ExtendedClient} _
   * @param {Client<true>} client
   * @returns
   */
  run: (_: ExtendedClient, client: Client<true>) => {
    log("Logged in as: " + client.user.tag, "done");
  },
};
