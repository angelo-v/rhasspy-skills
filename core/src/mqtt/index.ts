import * as mqtt from "mqtt";
import { MqttClient } from "mqtt";
import { mqttSkill } from "./skill";

const brokerUrl = process.env.MQTT_BROKER_URL ?? "mqtt://localhost:12183";
const username = process.env.MQTT_USERNAME;
const password = process.env.MQTT_PASSWORD;
const clientId = process.env.MQTT_CLIENT_ID ?? `rhasspy-skill-${Math.floor(Math.random()*1000000000)}`;

const mqttOptions = username
  ? {
      clientId,
      username,
      password,
    }
  : { clientId };

const client: MqttClient = mqtt.connect(brokerUrl, mqttOptions);

export const skill = mqttSkill(client);
