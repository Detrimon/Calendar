export const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const DAYS_IN_WEEK = 7;
export const WEEKDAYS_SHORT_LIST = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
export enum WEEKDAYS_SHORT{
  MONDAY = "пн",
  TUESDAY = "вт",
  WEDNESDAY = "ср",
  THURSDAY = "чт",
  FRIDAY = "пт",
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

export const YES = 'Да';
export const NO = 'Нет';
export const SAVE = 'Сохранить';
export const CANCEL = 'Отменить';

export type REPEAT_RATE_DAYS = keyof typeof WEEKDAYS_SHORT;