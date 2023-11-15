import { CalendarController } from "../controller/CalendarController";
import { CalendarEventsProvider } from "../data_provider/CalendarEventsProvider";

export type CalendarProps = {
  events_provider: CalendarEventsProvider,
  controller: CalendarController,
  view?: null
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

