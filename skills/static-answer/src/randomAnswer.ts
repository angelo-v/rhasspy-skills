export const randomAnswer = (possibleAnswers: string[], random = Math.random()) => {
    return possibleAnswers[Math.floor(random * possibleAnswers.length)]
}