import axios, { AxiosInstance } from "axios";
import nock from "nock";
import { WttrInWeatherService } from "./WttrInWeatherService";

describe("WttrInWeatherService", () => {
  let wttrInClient: AxiosInstance;
  beforeEach(() => {
    wttrInClient = axios.create({
      baseURL: "http://wttr.in.example",
    });
  });

  it("gets data from wttr.in", async () => {
    const scope = nock("http://wttr.in.example")
      .get("/hamburg?format=j1&lang=de")
      .reply(200, {
        current_condition: [
          {
            lang_de: [
              {
                value: "Nebel",
              },
            ],
            temp_C: "18",
          },
        ],
        nearest_area: [
          {
            areaName: [
              {
                value: "Hamburg",
              },
            ],
          },
        ],
      });
    const service = new WttrInWeatherService(wttrInClient);
    const result = await service.getCurrentConditions("hamburg");
    expect(result).toMatchObject({
      locality: "Hamburg",
      description: "Nebel",
      temperatureInCelsius: "18"
    });
    scope.done();
  });

  it("gets data from wttr.in for locations with umlauts", async () => {
    const scope = nock("http://wttr.in.example")
        .get("/München?format=j1&lang=de")
        .reply(200, {
          current_condition: [
            {
              lang_de: [
                {
                  value: "sonnig",
                },
              ],
              temp_C: "22",
            },
          ],
          nearest_area: [
            {
              areaName: [
                {
                  value: "München",
                },
              ],
            },
          ],
        });
    const service = new WttrInWeatherService(wttrInClient);
    const result = await service.getCurrentConditions("München");
    expect(result).toMatchObject({
      locality: "München",
      description: "sonnig",
      temperatureInCelsius: "22"
    });
    scope.done();
  });
});
