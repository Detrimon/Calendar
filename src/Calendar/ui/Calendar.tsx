import { For, JSX, Show, batch, createSignal, mergeProps } from "solid-js";

import { DAYS_IN_WEEK, MONTHS, WEEKDAYS } from "../lib/constants";
import { get_month_data, get_today } from "../helpers/calendar_helpers";
import {
  CalendarProvider,
  useCalendarContext,
} from "../context/CalendarContext";
import type {
  MonthItemBodyProps,
  MonthItemHeader,
  MonthItemProps,
  TCalendarProps,
  TChooseYearEvent,
  TChooseYearProps,
} from "./CalendarTypes";
import { CalendarController } from "../controller/CalendarController";
import { CalendarDataProvider } from "../data_provider/CalendarDataProvider";
import { CalendarView } from "./CalendarView/CalendarView";
import { CalendarConfig } from "../config/CalendarConfig";
import { Dynamic } from "solid-js/web";
import { CalendarViewMode } from "./CalendarView/CalendarViewTypes";
import { TCalendarStateMethods } from "../context/CalendarContextTypes";

import styles from "./Calendar.module.css";
import { createStore } from "solid-js/store";

function get_default_props(
  initial_props: Partial<TCalendarProps>
): TCalendarProps {
  return {
    controller: initial_props.controller ? null : new CalendarController(),
    data_provider: initial_props.data_provider
      ? null
      : new CalendarDataProvider(),
    view: initial_props.view ? null : new CalendarView(),
    config: initial_props.config ? null : new CalendarConfig({}),
  } as TCalendarProps;
};

function initialize_settings(
  props: Required<TCalendarProps>, context: TCalendarStateMethods
): void {
  context.initialize(props);
  props.controller.initialize(context);
  props.controller.load_and_set_new_events(context.get_year());
};

export const Calendar = (initial_props: Partial<TCalendarProps>) => {
  return (
    <CalendarProvider>
      <CalendarMain {...initial_props} />
    </CalendarProvider>
  );
};

const CalendarMain = (initial_props: Partial<TCalendarProps>) => {
  const [_, context] = useCalendarContext();
  const default_props = get_default_props(initial_props);
  const props = mergeProps(default_props, initial_props) as Required<TCalendarProps>;

  initialize_settings(props, context);

  const options: { [key: string]: () => JSX.Element } = {
    year: Year,
    months: Months,
    month: Month,
  };

  return <Dynamic component={options[context.get_calendar_mode()]} />
};

const Year = () => (
  <>
    <CalendarYearHeader />
    <CalendarBody />
  </>
);
  
const Month = () => {
  const [_, context] = useCalendarContext();

  const [month_data, set_month_data] = createStore({
    month_dates: get_month_data(context.get_year(), new Date().getMonth()),
    month: MONTHS[new Date().getMonth()],
    year: context.get_year()
  });

  const slide = (modifier: 'left' | 'right') => {
    const month_number = MONTHS.findIndex(month_name => month_name === month_data.month);
    let month: number;
    let year: number;

    if (modifier === "left") {
      if (month_number === 0) {
        month = 11;
        year = month_data.year - 1;
      } else {
        month = month_number - 1;
        year = month_data.year;
      };
    } else {
      if (month_number === 11) {
        month = 0;
        year = month_data.year + 1;
    } else {
        month = month_number + 1;
        year = month_data.year;
      };
    };

    const month_name = MONTHS[month];
    const month_dates = get_month_data(year, month);
    
    set_month_data({ month_dates, month: month_name, year })
  };

  return (
    <>
      <CalendarMonthsHeader />
      <div class={styles.calendar_month_wrapper}>
        <button onClick={() => slide("left")} class={styles.calendar_header_button}>
          &#60;
        </button>
        <MonthItem {...month_data} />
        <button onClick={() => slide("right")} class={styles.calendar_header_button}>
          &#62;
        </button>
      </div>
    </>
  );
};
  
const Months = () => {
  const [_, context] = useCalendarContext();
  const monthNumber = new Date().getMonth();

  const get_initial_month_item_data = (modifier: -1 | 0 | 1) => {
    let month: number;
    let year: number;

    switch (monthNumber + modifier) {
      case -1:
        month = 11;
        year = context.get_year() - 1;
        break;
      case 12:
        month = 0;
        year = context.get_year() + 1;
        break;
      default:
        month = monthNumber + modifier;
        year = context.get_year();
        break;
    };

    const month_dates = get_month_data(year, month);
    const month_name = MONTHS[month];

    return { month_dates, month: month_name, year };
  }

  const [month_items_data, set_month_items_data] = createStore({
    left: get_initial_month_item_data(-1),
    middle: get_initial_month_item_data(0),
    right: get_initial_month_item_data(1),
  });

  const slide_right = () => {
    const new_left = { ...month_items_data.middle };
    const new_middle = { ...month_items_data.right };
    let month: number;
    let year: number;

    const right_month_number = MONTHS.findIndex(month_name => month_name === month_items_data.right.month);
    if (right_month_number === 11) {
      month = 0;
      year = month_items_data.right.year + 1;
    } else {
      month = right_month_number + 1;
      year = month_items_data.right.year;
    }

    const month_name = MONTHS[month];
    const month_dates = get_month_data(year, month);

    batch(() => {
      set_month_items_data('left', new_left);
      set_month_items_data('middle', new_middle);
      set_month_items_data('right', { month_dates, month: month_name, year });
    });
  };
  
  const slide_left = () => {
    const new_right = { ...month_items_data.middle };
    const new_middle = { ...month_items_data.left };
    let month: number;
    let year: number;

    const left_month_number = MONTHS.findIndex(month_name => month_name === month_items_data.left.month);
    if (left_month_number === 0) {
      month = 11;
      year = month_items_data.right.year - 1;
    } else {
      month = left_month_number - 1;
      year = month_items_data.left.year;
    }

    const month_name = MONTHS[month];
    const month_dates = get_month_data(year, month);

    batch(() => {
      set_month_items_data('left', { month_dates, month: month_name, year });
      set_month_items_data('middle', new_middle);
      set_month_items_data('right', new_right);
    });
  };

  return (
    <>
      <CalendarMonthsHeader />
      <div class={styles.calendar_months_wrapper}>
        <button onClick={slide_left} class={styles.calendar_header_button}>
          &#60;
        </button>
        <MonthItem {...month_items_data.left} />
        <MonthItem {...month_items_data.middle}/>
        <MonthItem {...month_items_data.right}/>
        <button onClick={slide_right} class={styles.calendar_header_button}>
          &#62;
        </button>
      </div>
    </>
  );
};

const CalendarYearHeader = () => {
  const [_, context] = useCalendarContext();
  const [show_modal, set_show_modal] = createSignal(false);
  const showModal = () => set_show_modal(true);
  
  return (
    <div class={styles.calendar_header_container}>
      <CalendarHeaderButtons />
      <p onClick={showModal}>
        {context.get_year()}
      </p>
      <Show when={show_modal()}>
        <ChooseYear set_show_modal={set_show_modal} />
      </Show>
    </div>
  );
};

const CalendarMonthsHeader = () => (
  <div class={styles.calendar_header_container}>
    <CalendarHeaderButtons />
  </div>
);

const ChooseYear = (props: TChooseYearProps) => {
    const [_, context] = useCalendarContext();
    const year = context.get_year();
    const [current_year, set_current_year] = createSignal(year);

    const plus_year = () => set_current_year(prev => prev + 1);
    const minus_year = () => set_current_year(prev => prev - 1);

    const choose_year = (e: TChooseYearEvent) => {
      const target = e.target;
      if (target.tagName !== "LI") return;
      const value = target.textContent as string;

      batch(() => {
        context.set_year(+value);
        props.set_show_modal(false);
      });
    };

    return (
      <div class={styles.choose_year_wrapper}>
        <button onClick={minus_year} class={styles.calendar_header_button}>
          &#60;
        </button>
        <ul class={styles.choose_year_list} onClick={(e)=> choose_year(e)}>
          <li>{current_year() - 1}</li>
          <li>{current_year()}</li>
          <li>{current_year() + 1}</li>
        </ul>
        <button onClick={plus_year} class={styles.calendar_header_button}>
          &#62;
        </button>
      </div>
    )
  };

const CalendarHeaderButtons = () => {
  const [_, context] = useCalendarContext();
  const controller = context.get_controller();

  const set_year_mode = () => controller.set_calendar_mode(CalendarViewMode.YEAR);
  const set_months_mode = () => controller.set_calendar_mode(CalendarViewMode.MONTHS);
  const set_month_mode = () => controller.set_calendar_mode(CalendarViewMode.MONTH);

  return (
    <div class={styles.calendar_button_container}>
      <button onClick={set_year_mode}>Year</button>
      <button onClick={set_months_mode}>3 Months</button>
      <button onClick={set_month_mode}>Month</button>
    </div>
  )
}

const CalendarBody = () => {
  const [_, context] = useCalendarContext();

  return (
    <div class={styles.calendar_body_container}>
      <For each={MONTHS}>
        {(month, index) => {
          return (
            <MonthItem
              month={month}
              month_dates={get_month_data(context.get_year(), index())}
            />
          );
        }}
      </For>
    </div>
  );
};

const MonthItem = (props: MonthItemProps) => (
  <div class={styles.month_item_container}>
    <table>
      <MonthItemHeader month_name={props.month} year={props.year}/>
      <MonthItemBody month_dates={props.month_dates} />
    </table>
  </div>
);

const MonthItemHeader = (props: MonthItemHeader) => (
  <thead class={styles.month_item_header_container}>
    <tr>
      <th colspan={DAYS_IN_WEEK} class={styles.month_title}>
        {props.month_name} {props.year}
      </th>
    </tr>
    <tr>
      <For each={WEEKDAYS}>
        {(week_day) => <th class={styles.week_day}>{week_day}</th>}
      </For>
    </tr>
  </thead>
);

const MonthItemBody = (props: MonthItemBodyProps) => {
  const [_, context] = useCalendarContext();

  const select_day = (date: Date) => context.set_selected_date(date);
  const day_today = get_today().getTime();

  return (
    <tbody>
      <For each={props.month_dates}>
        {(week) => (
          <tr>
            <For each={week}>
              {(day) => (
                <Show when={day} fallback={<td></td>}>
                  <td
                    onClick={() => select_day(day)}
                    classList={{
                      [styles.day_weekend]:
                        day.getDay() === 6 || day.getDay() === 0,
                      [styles.day_selected]:
                        context.get_selected_date()?.getTime() ===
                        day.getTime(),
                      [styles.day_today]: day_today === day.getTime(),
                    }}
                  >
                    {day.getDate()}
                  </td>
                </Show>
              )}
            </For>
          </tr>
        )}
      </For>
    </tbody>
  );
};
