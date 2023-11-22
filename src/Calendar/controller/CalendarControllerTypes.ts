import { CalendarActions } from "../ui/CalendarTypes";

export type Observers = Partial<Record<CalendarActions, Array<(data: any) => void>>>;