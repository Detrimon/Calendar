export const get_time_period_options = ({
  start = '09:00',
  end = '18:00',
  step = 30
} = {}): string[] => {
  const result: string[] = [start];

  const end_hours = +end.slice(0, 2);
  let start_hours = +start.slice(0, 2);
    
  while (start_hours < end_hours) {
    let [hours, mins] = start.split(':');

    let new_hours = +hours;
    let new_mins = +mins + step;

    if (new_mins >= 60) {
      new_hours += 1;
      new_mins = new_hours >= end_hours ? 0 : new_mins - 60;
    };

    const new_mins_string = new_mins < 10 ? '0' + new_mins : '' + new_mins;
    const new_hours_string = new_hours < 10 ? '0' + new_hours : '' + new_hours;

    start = new_hours_string + ':' + new_mins_string;
    result.push(start);

    start_hours = new_hours;
  }

  return result;
};