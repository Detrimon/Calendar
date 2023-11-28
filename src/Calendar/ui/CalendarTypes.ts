import { CalendarController } from "../controller/CalendarController";
import { CalendarDataProvider } from "../data_provider/CalendarDataProvider";
import { CalendarConfig } from "../config/CalendarConfig";
import { CalendarView } from "./CalendarView/CalendarView";
import { Setter } from "solid-js";

export type TCalendarProps = {
  data_provider: CalendarDataProvider
  controller: CalendarController
  view: CalendarView
  config?: CalendarConfig
};

export type MonthItemHeader = {
  month_name: string
  year?: number
}

export type MonthItemProps = {
  month: string
  month_dates: Date[][]
  year?: number
};

export type MonthItemBodyProps = {
  month_dates: Date[][]
};

export type PrevCreateEffectValues = Partial<Record<CalendarActions, any>>;

export enum CalendarActions{
  SELECTED_DATE = 'get_selected_date',
  GET_YEAR = 'get_year',
};

export type TChooseYearEvent = MouseEvent & {
  currentTarget: HTMLUListElement;
  target: Element;
};

export type TSelectMouseOver = MouseEvent & {
  currentTarget: HTMLSelectElement;
  target: Element;
};

export type TChooseYearProps = {
  set_show_modal: Setter<boolean>
};


