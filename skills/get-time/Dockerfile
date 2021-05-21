FROM node

COPY ./dist/skill.js /opt/skill.js

ENV MQTT_BROKER_URL=mqtt://rhasspy:12183

CMD ["node", "/opt/skill.js"]
