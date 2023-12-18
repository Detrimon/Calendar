import { Accessor } from "solid-js";
import { CalendarActions, GUID, TDateTask } from "../Calendar"

export type TAsideEvents = {
  subscribe(event: CalendarActions, fn: (data: any) => void): GUID
}

export type TTaskProps = {
  task: TDateTask,
  order: Accessor<number>
};