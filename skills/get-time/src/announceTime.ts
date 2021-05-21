const sentences = [
  (hours: number, minutes: number) => `Es ist ${hours} Uhr ${minutes}!`,
  (hours: number, minutes: number) => `${hours} Uhr ${minutes}!`,
  (hours: number, minutes: number) => `Wir haben ${hours} Uhr ${minutes}!`,
  (hours: number, minutes: number) =>
    `Genau ${hours} Uhr und ${minutes} Minuten!`,
];

export function announceTime(time: Date, variation = Math.random()): string {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  return chooseRandom(variation, sentences)(hours, minutes);
}

function chooseRandom(variation: number, sentences: any[]) {
  return sentences[Math.floor(variation * sentences.length)];
}
