export const epochSecondToMillisecond = (epochSecond: number): number => epochSecond * 1000
export const millisecondToEpochSecond = (millisecond: number): number => Math.trunc(millisecond / 1000)