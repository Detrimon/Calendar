export function format_date_to_string(date: Date) {
  return date.toLocaleString().substring(0, 10)
};

export function format_date_to_string_with_words(date: Date) {
  const date_options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  }
  const date_string = new Intl.DateTimeFormat('ru', date_options).format(date);
  
  return date_string[0].toUpperCase() + date_string.slice(1);
};

export function is_leap_year(year: number) {
  return !(year % 4 || (!(year % 100) && year % 400));
}

export function get_day_of_week(date: Date) {
  const day_of_week = date.getDay();

  if (day_of_week === 0) return 6;

  return day_of_week - 1;
};

export function get_start_of_day(input_date: Date) {
  let date = new Date(input_date);
  date.setHours(0, 0, 0, 0);

  return date;
};

export function get_today() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export function get_current_year() {
  let now = new Date();
  return now.getFullYear();
};

export function get_current_month() {
  let now = new Date();
  return now.getMonth();
};