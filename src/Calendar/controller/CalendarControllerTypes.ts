import { CalendarActions } from "../ui/CalendarTypes";

export type Observers = Partial<
  Record<CalendarActions, { [guid: GUID]: (data: any) => void }>
>;

export type GUID = string & { isGuid: true };
