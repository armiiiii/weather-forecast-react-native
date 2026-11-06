export const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export type RequestState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "notFound" }
  | { status: "error"; message: string };

export async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) => setTimeout(reject, ms))
  return Promise.race([promise, timeout])
}

export function today() {
  const weekday = WEEKDAYS[(new Date()).getDay()]
  const date = (new Date()).getDate()
  const month = MONTHS[(new Date()).getMonth()]

  return `${weekday.toUpperCase()}, ${date+1} ${month.toUpperCase()}`
} 

export function convertTemp(value: number, unit: "C" | "F") {
  return unit === "C" ? value : Math.round((value * 9) / 5 + 32)
}