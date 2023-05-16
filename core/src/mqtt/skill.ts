import { MqttClient } from "mqtt";
import { Handler, RhasspyEvent, Skill } from "../index";

export const mqttSkill =
  (client: MqttClient): Skill =>
  (intentNames: string[], handler: Handler) => {
    function say(text: string, siteId: string = "default") {
      client.publish(
        "hermes/tts/say",
        JSON.stringify({
          siteId,
          text,
        })
      );
    }

    client.on("connect", () => {
      client.subscribe("hermes/intent/#", () => {});
    });

    client.on("message", async (topic: string, message: Buffer) => {
      const event: RhasspyEvent = JSON.parse(message.toString());
      if (intentNames.includes(event.intent.intentName)) {
        console.debug("handling event", event);
        try {
          await handler.handle(event, { say });
        } catch (err) {
          console.error("Handling the event failed", event, err);
          say(err.message, event.siteId);
        }
      }
    });

    client.on("error", (err: Error) => {
      console.error("Connection failed", err);
    });
  };
