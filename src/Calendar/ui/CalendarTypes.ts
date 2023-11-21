import { CalendarController } from "../controller/CalendarController";
import { CalendarActions } from "../controller/CalendarControllerTypes";
import { CalendarEvents } from "../controller/CalendarEvents";
import { CalendarConfig } from "./CalendarConfig";

export type CalendarProps = {
  // events: CalendarEvents,
  // controller: CalendarController,
  // view?: null,
  initial_settings: CalendarConfig
}

export type MonthItemHeader = {
  month_name: string
}

export type MonthItemProps = {
  month: string
  month_dates: Date[][]
};

export type MonthItemBodyProps = {
  month_dates: Date[][]
};

export type PrevCreateEffectValues = Partial<Record<CalendarActions, any>>;


