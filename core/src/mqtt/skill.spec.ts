import {MqttClient} from "mqtt";
import {Handler, RhasspyEvent, RhasspySession, Skill} from "../index";
import {mqttSkill} from "./skill";

const EventEmitter = require("events");

function mockClient(): MqttClient {
  const client: MqttClient = new EventEmitter() as MqttClient;
  client.subscribe = jest.fn();
  client.publish = jest.fn();
  return client;
}

describe("mqtt skill", () => {
  let client: MqttClient;
  let skill: Skill;
  beforeEach(() => {
    client = mockClient();
    skill = mqttSkill(client);
  });

  describe("connection", () => {
    it("subscribes to hermes intent on connect", () => {
      skill(["TestIntent"], {} as Handler);
      client.emit("connect");
      expect(client.subscribe).toHaveBeenCalledWith(
        "hermes/intent/#",
        expect.anything()
      );
    });
  });

  describe("intent handling", () => {
    it("passes incoming intents to handler", () => {
      const handle = jest.fn();
      skill(["TestIntent"], {
        handle,
      });
      client.emit(
        "message",
        "hermes/intent/#",
        '{"intent": {"intentName": "TestIntent"}}'
      );
      expect(handle).toHaveBeenCalledWith(
        { intent: { intentName: "TestIntent" } },
        expect.anything()
      );
    });

    it("ignores incoming intents it is not interested in", () => {
      const handle = jest.fn();
      skill(["TestIntent"], {
        handle,
      });
      client.emit(
        "message",
        "hermes/intent/#",
        '{"intent": {"intentName": "OtherIntent"}}'
      );
      expect(handle).not.toHaveBeenCalled();
    });
  });

  describe("session", () => {
    it("publishes text to say to text-to-speech topic", () => {
      class TestHandler implements Handler {
        handle(event: RhasspyEvent, session: RhasspySession): void {
          session.say("text to say");
        }
      }
      skill(["TestIntent"], new TestHandler());
      client.emit(
        "message",
        "hermes/intent/#",
        '{"intent": {"intentName": "TestIntent"}}'
      );
      expect(client.publish).toHaveBeenCalledWith(
        "hermes/tts/say",
        '{"text":"text to say"}'
      );
    });
  });
});
