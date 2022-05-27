import * as mqtt from "mqtt";
import { MqttClient } from "mqtt";
import { mqttSkill } from "./skill";

const brokerUrl = process.env.MQTT_BROKER_URL ?? "mqtt://localhost:12183";
const username = process.env.MQTT_USERNAME;
const password = process.env.MQTT_PASSWORD;

const mqttOptions = username
  ? {
      username,
      password,
    }
  : {};

const client: MqttClient = mqtt.connect(brokerUrl, mqttOptions);

export const skill = mqttSkill(client);
