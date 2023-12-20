import { TRepeatRate } from "../../Calendar";

export const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const DAYS_IN_WEEK = 7;
export const WEEKDAYS_SHORT_LIST = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
export enum WEEKDAYS_SHORT{
  MON = "пн",
  TUE = "вт",
  WED = "ср",
  THU = "чт",
  FRI = "пт",
  SAT = "сб",
  SUN = "вс"
};
export const WEEKDAYS_FULL =
  ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

export const MONTHS = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const Month = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

export type REPEAT_RATE_DAYS = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";

export type FORM_STORE = {
  is_allday_meeting: boolean,
  is_repeated: boolean,
  time_period: {
    start: string,
    end: string
  },
  repeat_rate: TRepeatRate,
  repeat_rate_custom: {
    repeat_every_week_row: number,
    week_days: REPEAT_RATE_DAYS[]
  },
  repeat_limits: {
    start_date: string,
    is_infinitely: boolean,
    end_date: string,
    finish_after_repeats: number,
  }
};