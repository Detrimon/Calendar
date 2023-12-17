import { CalendarActions, GUID } from "../Calendar"

export type TAsideEvents = {
  subscribe(event: CalendarActions, fn: (data: any) => void): GUID
}