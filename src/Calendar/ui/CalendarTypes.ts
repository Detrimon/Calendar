import { CalendarController } from "../controller/CalendarController"

export type CalendarProps = {
  events?: null,
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

