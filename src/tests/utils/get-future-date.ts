import { setYear, parseISO } from "date-fns";
// setYear -> the year will always be one year from now
// parseISO -> convert date string to object date

/*
    Receives "2022-08-20" and returns "2023-08-20"
*/

export function getFutureDate(date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1);
}
