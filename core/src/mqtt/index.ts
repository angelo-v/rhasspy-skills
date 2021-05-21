import * as mqtt from "mqtt";
import {MqttClient} from "mqtt";
import {mqttSkill} from "./skill";

const brokerUrl = process.env.MQTT_BROKER_URL ?? "mqtt://localhost:12183"

const client: MqttClient = mqtt.connect(brokerUrl);

export const skill = mqttSkill(client);