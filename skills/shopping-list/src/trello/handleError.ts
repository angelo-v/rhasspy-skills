import { AxiosError } from "axios";

export function handleError(err: AxiosError) {
  console.error(err);
  if (err.response) {
    return new Error(
      `Die Verbindung zu Trello ist fehlgeschlagen. Der Status-Code lautet: ${err.response.status}`
    );
  } else {
    return new Error(
      `Die Verbindung zu Trello ist fehlgeschlagen. Möglicherweise gibt es Netzwerkprobleme.`
    );
  }
}
