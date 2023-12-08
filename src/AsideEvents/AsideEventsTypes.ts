import { GUID } from "../Calendar/controller/CalendarControllerTypes"
import { CalendarActions } from "../Calendar/ui/CalendarTypes"

export type TAsideEvents = {
  subscribe(event: CalendarActions, fn: (data: any) => void): GUID
}