import {
  For,
  JSX,
  Match,
  Show,
  Switch,
  createSignal,
  mergeProps,
  onCleanup
} from "solid-js";
import { render } from "solid-js/web";

import {
  CHOOSE_MONTH,
  CHOOSE_YEAR,
  DATE_POPUP_SHOW_DELAY_MS,
  EVENTS_POPUP_TEXT,
  MODE_BUTTONS_TEXT,
  YEAR_MODIFIER
} from "../lib/constants";
import {
  DAYS_IN_WEEK,
  MONTHS,
  WEEKDAYS_SHORT_LIST
} from "../../shared/lib/constants";
import { get_month_data} from "../helpers/calendar_helpers";
import { get_current_month, get_current_year, get_today } from "../../shared/lib/helpers";
import { format_date_to_string } from "../../shared/lib/helpers";
import {
  CalendarProvider,
  useCalendarContext,
} from "../context/CalendarContext";
import type {
  MonthItemBodyProps,
  TMonthItemHeaderProps,
  MonthItemProps,
  TCalendarProps,
} from "./CalendarTypes";
import { CalendarController } from "../controller/CalendarController";
import { CalendarDataProvider } from "../data_provider/CalendarDataProvider";
import { CalendarView } from "./CalendarView/CalendarView";
import { CalendarConfig } from "../config/CalendarConfig";
import { CalendarViewMode } from "./CalendarView/CalendarViewTypes";
import type { TCalendarStateMethods } from "../context/CalendarContextTypes";
import { CalendarDataAdapter } from "../data_adapter/CalendarDataAdapter";
import { SmetComissionModal } from "../../SmetComissionModal/SmetComissionModal";

import styles from "./Calendar.module.css";

function get_default_props(
  initial_props: Partial<TCalendarProps>
): TCalendarProps {
  return {
    controller: initial_props.controller ? null : new CalendarController(),
    data_provider: initial_props.data_provider
      ? null
      : new CalendarDataProvider(new CalendarDataAdapter()),
    view: initial_props.view ? null : new CalendarView({mode: CalendarViewMode.YEAR}),
    config: initial_props.config ? null : new CalendarConfig({}),
  } as TCalendarProps;
};

function initialize_settings(
  props: Required<TCalendarProps>, context: TCalendarStateMethods
): void {
  context.initialize(props);
  props.controller.initialize(context);
  props.controller.load_and_set_events(context.get_year());
  props.controller.load_and_set_year_holidays(context.get_year());
};

export const Calendar = (initial_props: Partial<TCalendarProps>) => {
  return (
    <CalendarProvider>
      <CalendarMain {...initial_props} />
    </CalendarProvider>
  );
};

const CalendarMain = (initial_props: Partial<TCalendarProps>) => {
  const [showModal, setShowModal] = createSignal(true);
  const [_, context] = useCalendarContext();
  const default_props = get_default_props(initial_props);
  const props = mergeProps(default_props, initial_props) as Required<TCalendarProps>;

  initialize_settings(props, context);

  return (
    <>
      <SmetComissionModal onModalHide={() => {
          setShowModal(!showModal());
        }}/>
      <Show
        when={context.get_calendar_mode() === CalendarViewMode.YEAR}
        fallback={<Months />}
      >
        <Year />
      </Show>
    </>
  );
};

const Year = () => (
  <div class={styles.calendar_container}>
    <CalendarYearHeader />
    <CalendarBody />
  </div>
);

const Months = () => {
  const [_, context] = useCalendarContext();
  const controller = context.get_controller();
 
  const get_middle_month_item_props = () => ({
    month: MONTHS[context.get_month()],
    year: context.get_year(),
    month_dates: get_month_data(context.get_year(), context.get_month())
  });

  const get_left_month_item_props = () => {
    const month_number = context.get_month() - 1 < 0 ? 11 : context.get_month() - 1;
    const year = context.get_month() - 1 < 0 ? context.get_year() - 1 : context.get_year();
    const month_dates = get_month_data(year, month_number);

    return {
      month: MONTHS[month_number],
      year,
      month_dates
    };
  };

  const get_right_month_item_props = () => {
    const month_number = context.get_month() + 1 > 11 ? 0 : context.get_month() + 1;
    const year = context.get_month() + 1 > 11? context.get_year() + 1 : context.get_year();
    const month_dates = get_month_data(year, month_number);

    return {
      month: MONTHS[month_number],
      year,
      month_dates
    };
  };

  const slide_right = () => controller.slide_right_handler();
  const slide_left = () => controller.slide_left_handler();

  return (
    <div class={styles.calendar_container}>
      <CalendarMonthsHeader />
      <div class={styles.calendar_months_wrapper}>
        <button onClick={slide_left} class={styles.calendar_header_button}>
          &#60;
        </button>

        <Switch>
          <Match when={context.get_calendar_mode() === CalendarViewMode.MONTHS}>
            <div class={styles.calendar_months_row}>
              <MonthItem {...get_left_month_item_props()} />
              <MonthItem {...get_middle_month_item_props()} />
              <MonthItem {...get_right_month_item_props()} />
            </div>
          </Match>
          <Match when={context.get_calendar_mode() === CalendarViewMode.MONTH}>
            <MonthItem {...get_middle_month_item_props()} />
          </Match>
        </Switch>

        <button onClick={slide_right} class={styles.calendar_header_button}>
          &#62;
        </button>
      </div>
    </div>
  );
};

const CalendarYearHeader = () => (
  <div class={styles.calendar_header_container}>
    <CalendarHeaderButtons />
    <p>{CHOOSE_YEAR}</p>
    <ChooseYearSelect />
  </div>
);

const CalendarMonthsHeader = () => (
  <div class={styles.calendar_header_container}>
    <CalendarHeaderButtons />
    <p>{CHOOSE_YEAR}</p>
    <ChooseYearSelect />
    <p>{CHOOSE_MONTH}</p>
    <ChooseMonthSelect />
  </div>
);

const ChooseYearSelect = () => {
  const [_, context] = useCalendarContext();
  const controller = context.get_controller();

  let timer_id: number;

  const years = [];
  for (let i = context.get_year() - YEAR_MODIFIER; i <= context.get_year() + YEAR_MODIFIER; i++) {
    years.push(i)
  };
  
  const clear_interval = () => clearInterval(timer_id);
  const change_year_handler = (value: string) => controller.set_context_year(+value);

  return (
    <select
      onMouseOut={clear_interval}
      onClick={clear_interval}
      onChange={(event) => change_year_handler(event.target.value)}
      class={styles.calendar_header_select}
      value={context.get_year()}
    >
      {years.map(year => <option value={year} >{year}</option>)}
    </select>
  );
};

const ChooseMonthSelect = () => {
  const [_, context] = useCalendarContext();
  const controller = context.get_controller();

  const change_month_handler = (value: string) => controller.change_month_handler(value);
  
  return (
    <select
      onChange={(event) => change_month_handler(event.target.value)}
      class={styles.calendar_header_select}
      value={MONTHS[context.get_month()]}
    >
      {MONTHS.map(month_name => <option value={month_name} >{month_name}</option>)}
    </select>
  );
};

const CalendarHeaderButtons = () => {
  const [_, context] = useCalendarContext();
  const controller = context.get_controller();

  const set_year_mode = () => controller.set_calendar_mode(CalendarViewMode.YEAR);
  const set_months_mode = () => controller.set_calendar_mode(CalendarViewMode.MONTHS);
  const set_month_mode = () => controller.set_calendar_mode(CalendarViewMode.MONTH);

  return (
    <div class={styles.calendar_button_container}>
      <button onClick={set_year_mode}>{MODE_BUTTONS_TEXT.YEAR}</button>
      <button onClick={set_months_mode}>{MODE_BUTTONS_TEXT.MONTHS}</button>
      <button onClick={set_month_mode}>{MODE_BUTTONS_TEXT.MONTH}</button>
    </div>
  );
};

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

const MonthItem = (props: MonthItemProps) => {
  const [_, context] = useCalendarContext();

  const is_current = () =>
    MONTHS[get_current_month()] === props.month && get_current_year() === (props.year || context.get_year());

  return (
    <div
      class={styles.month_item_container}
      classList={{
        [styles.month_item_selected_container]: is_current()
      }}
    >
      <table>
        <MonthItemHeader is_current={is_current} month_name={props.month} year={props.year} />
        <MonthItemBody month_dates={props.month_dates} />
      </table>
    </div>
  );
};

const MonthItemHeader = (props: TMonthItemHeaderProps) => (
  <thead class={styles.month_item_header_container}>
    <tr>
      <th
        colspan={DAYS_IN_WEEK}
        class={styles.month_title}
        classList={{
          [styles.selected_month_title]: props.is_current()
        }}
      >
        {props.month_name} {props.year}
      </th>
    </tr>
    <tr>
      <For each={WEEKDAYS_SHORT_LIST}>
        {(week_day, i) => <th
          class={styles.week_day}
          classList={{
            [styles.day_holiday]: i() >= 5,
          }}
        >{week_day}</th>}
      </For>
    </tr>
  </thead>
);

const MonthItemBody = (props: MonthItemBodyProps) => {
  const [_, context] = useCalendarContext();
  const controller = context.get_controller();

  let timeout: number;
  let current_td: HTMLTableCellElement | null;
  let tbody_ref: HTMLTableSectionElement;
  
  const handle_mouse_over: JSX.EventHandler<HTMLTableSectionElement, MouseEvent > = (e) => {
    if (current_td) return;
    const target = e.target.closest('td');
    if (!target) return;

    const date_string = format_date_to_string(new Date(target.dataset.day as string));
    if (!context.get_events()[date_string]) {
      return;
    };
    current_td = target;
  
    timeout = setTimeout(async () => {
      const td = current_td;
      const date = new Date(e.target.dataset.day);
      const date_tasks = await controller.get_date_tasks(date);

      if (current_td !== td) return;
      const events_count = date_tasks.reduce((acc, curr) => {
       
        acc += curr.tasks.length
        return acc
      }, 0)
     
      render(() => <EventsPopup events_count={events_count} />, current_td as HTMLTableCellElement);
    }, DATE_POPUP_SHOW_DELAY_MS);
  };

  const handle_mouse_out = () => {
    clearTimeout(timeout);
    if (!current_td) return;
    current_td.querySelector('[data-day-tooltip]')?.remove();
    current_td = null;
  };

  onCleanup(() => {
    tbody_ref.removeEventListener('onmouseover', handle_mouse_over);
    tbody_ref.removeEventListener('onmouseout', handle_mouse_out);
  });

  return (
    <tbody
      ref={tbody_ref!}
      onmouseover={handle_mouse_over}
      onmouseout={handle_mouse_out}
    >
      <For each={props.month_dates}>
        {(week) => (
          <tr>
            <For each={week}>
              {(day) => (
                <Show when={day} fallback={<td></td>}>
                  <DayItem day={day}/>
                </Show>
              )}
            </For>
          </tr>
        )}
      </For>
    </tbody>
  );
};

const DayItem = (props : {day: Date}) => {
  const [_, context] = useCalendarContext();
  const controller = context.get_controller();

  const get_today_date_string = () => format_date_to_string(props.day);

  const is_day_today = () => get_today().getTime() === props.day.getTime();
  const is_event = () => !!context.get_events()[get_today_date_string()];
  const is_become_working = () => context.get_holidays()?.become_working.includes(get_today_date_string());
  const is_holiday = () =>
    props.day.getDay() === 6 || props.day.getDay() === 0 || context.get_holidays()?.holidays.includes(get_today_date_string());
  const is_selected = () => context.get_selected_date().getTime() === props.day.getTime() && !is_day_today();

  const select_day_handler = (date: Date) => controller.select_day_handler(date);

  return (
    <td
      data-day={props.day}
      onClick={() => select_day_handler(props.day)}
      class={styles.hide_tooltip}
      classList={{
        [styles.day_holiday]: is_holiday() && !is_become_working(),
        [styles.day_selected]: is_selected(),
        [styles.day_today]: is_day_today(),
        [styles.include_event]: !is_holiday() && is_event() && !is_day_today(), 
      }}
    >
      {props.day.getDate()}
    </td>
  );
};

const EventsPopup = (props: { events_count: number }) => (
  <p
    class={styles.td_tooltip}
    data-day-tooltip
  >
    {EVENTS_POPUP_TEXT} {props.events_count}
  </p>
);