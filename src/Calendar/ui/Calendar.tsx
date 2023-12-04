import { For, Match, Show, Switch, batch, createSignal, mergeProps, onCleanup, onMount } from "solid-js";

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
  TSelectMouseOver,
  TTableMouseEvent,
} from "./CalendarTypes";
import { CalendarController } from "../controller/CalendarController";
import { CalendarDataProvider } from "../data_provider/CalendarDataProvider";
import { CalendarView } from "./CalendarView/CalendarView";
import { CalendarConfig } from "../config/CalendarConfig";
import { CalendarViewMode } from "./CalendarView/CalendarViewTypes";
import { TCalendarStateMethods } from "../context/CalendarContextTypes";
import { AppModel } from "../../mock/mock_events_data";

import styles from "./Calendar.module.css";
import { ICalendarDayEvent } from "../data_provider/CalendarDataProviderTypes";

function get_default_props(
  initial_props: Partial<TCalendarProps>
): TCalendarProps {
  return {
    controller: initial_props.controller ? null : new CalendarController(),
    data_provider: initial_props.data_provider
      ? null
      : new CalendarDataProvider(new AppModel()),
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

  return (
    <Show
      when={context.get_calendar_mode() === CalendarViewMode.YEAR}
      fallback={<Months />}
    >
      <Year />
    </Show>
  );
};

const Year = () => (
  <>
    <CalendarYearHeader />
    <CalendarBody />
  </>
);

const Months = () => {
  const [_, context] = useCalendarContext();
 
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

  const slide_right = () => {
    let new_month_number = context.get_month() + 1;

    if (new_month_number > 11) {
      batch(() => {
        context.set_year(context.get_year() + 1);
        context.set_month(0);
      });
    } else {
      context.set_month(new_month_number);
    };
  };

  const slide_left = () => {
    let new_month_number = context.get_month() - 1;

    if (new_month_number < 0) {
      batch(() => {
        context.set_year(context.get_year() - 1);
        context.set_month(11);
      });
    } else {
      context.set_month(new_month_number);
    };
  };

  return (
    <>
      <CalendarMonthsHeader />
      <div class={styles.calendar_months_wrapper}>
        <button onClick={slide_left} class={styles.calendar_header_button}>
          &#60;
        </button>
        <Switch>
          <Match when={context.get_calendar_mode() === CalendarViewMode.MONTHS}>
            <MonthItem {...get_left_month_item_props()} />
            <MonthItem {...get_middle_month_item_props()} />
            <MonthItem {...get_right_month_item_props()} />
          </Match>
          <Match when={context.get_calendar_mode() === CalendarViewMode.MONTH}>
            <MonthItem {...get_middle_month_item_props()} />
          </Match>
        </Switch>

        <button onClick={slide_right} class={styles.calendar_header_button}>
          &#62;
        </button>
      </div>
    </>
  );
};

const CalendarYearHeader = () => {
  const [show_modal, set_show_modal] = createSignal(false);

  return (
    <div class={styles.calendar_header_container}>
      <CalendarHeaderButtons />
      <p>Выберите год</p>
      <Show
        when={show_modal()}
        fallback={<ChooseYearSelect set_show_modal={set_show_modal} />}
      >
        <ChooseYearModal set_show_modal={set_show_modal} />
      </Show>
    </div>
  );
};

const CalendarMonthsHeader = () => {
  const [show_modal, set_show_modal] = createSignal(false);

  return (
    <div class={styles.calendar_header_container}>
      <CalendarHeaderButtons />
      <p>Выберите год</p>
      <Show
        when={show_modal()}
        fallback={<ChooseYearSelect set_show_modal={set_show_modal} />}
      >
        <ChooseYearModal set_show_modal={set_show_modal} />
      </Show>
      <p>Выберите месяц</p>
      <ChooseMonthSelect />
    </div>
  );
};

const ChooseYearModal = (props: TChooseYearProps) => {
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
    <div
      onMouseLeave={() => props.set_show_modal(false)}
      class={styles.choose_year_wrapper}>
      <button onClick={minus_year} class={styles.calendar_header_button}>
        &#60;
      </button>
      <ul class={styles.choose_year_list} onClick={(e) => choose_year(e)}>
        <li>{current_year() - 1}</li>
        <li>{current_year()}</li>
        <li>{current_year() + 1}</li>
      </ul>
      <button onClick={plus_year} class={styles.calendar_header_button}>
        &#62;
      </button>
    </div>
  );
};

const ChooseYearSelect = (props: TChooseYearProps) => {
  const [_, context] = useCalendarContext();
  let timer_id: number;

  const years = [];
  for (let i = context.get_year() - 10; i <= context.get_year() + 10; i++) {
    years.push(i)
  };
  
  const clear_interval = () => clearInterval(timer_id);
  const handle_change_year = (value: string) => context.set_year(+value);
  const handle_mouse_over = (event: TSelectMouseOver) => {
    if (event.relatedTarget && event.relatedTarget.tagName === "LI") return;
    timer_id = setTimeout(() => props.set_show_modal(true), 800);
  };
  
  return (
    <select
      onMouseOver={handle_mouse_over}
      onMouseOut={clear_interval}
      onClick={clear_interval}
      onChange={(event) => handle_change_year(event.target.value)}
      class={styles.calendar_header_select}
      value={context.get_year()}
    >
      {years.map(year => <option value={year} >{year}</option>)}
    </select>
  );
};

const ChooseMonthSelect = () => {
  const [_, context] = useCalendarContext();
  const handle_change_year = (value: string) => {
    const new_month_number = MONTHS.findIndex(name => name === value);
    context.set_month(new_month_number)
  };
  
  return (
    <select
      onChange={(event) => handle_change_year(event.target.value)}
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
  const [tooltip, set_tooltip] = createSignal<ICalendarDayEvent[]>([]);

  const [_, context] = useCalendarContext();
  const select_day = (date: Date) => context.set_selected_date(date);
  const day_today = get_today().getTime();

  let timeout: number;
  let current_elem: Element | null = null;
  let tbody_ref;
  
  function handle_mouse_over(e: TTableMouseEvent) {
    e.stopPropagation();
    if (current_elem) return;
    let target = e.target.closest('td');
    if (!target) return;
    current_elem = target;

    timeout = setTimeout(async () => {
      const date = new Date(e.target.dataset.day);
      const events = await context.get_controller().get_date_events(date);
      if (events.length === 0) return;
      set_tooltip(events);

      target?.querySelector('[data-day-tooltip]')?.classList.add(styles.show_tooltip);
    }, 500);
  };

  function handle_mouse_out(e: TTableMouseEvent) {
    e.stopPropagation();
    clearTimeout(timeout);

    if (!current_elem) return;
    let relatedTarget = e.relatedTarget;

    while (relatedTarget) {
      if (relatedTarget == current_elem) return;

      relatedTarget = relatedTarget.parentNode;
    };

    current_elem = null;
    clearTimeout(timeout);
    e.target.querySelector('[data-day-tooltip]')?.classList.remove(styles.show_tooltip);
   };

  onCleanup(() => {
    tbody_ref.removeEventListener('onmouseover',handle_mouse_over);
    tbody_ref.removeEventListener('onmouseout',handle_mouse_out);
  });

  return (
    <tbody
      ref={tbody_ref}
      onMouseOver={handle_mouse_over}
      onMouseOut={handle_mouse_out}
    >
      <For each={props.month_dates}>
        {(week) => (
          <tr>
            <For each={week}>
              {(day) => (
                <Show when={day} fallback={<td></td>}>
                  <td
                    data-day={day}
                    onClick={() => select_day(day)}
                    class={styles.hide_tooltip}
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
                    <ul
                      data-day-tooltip
                      class={styles.td_tooltip}
                    >
                      <For each={tooltip()}>
                        {event => (
                          <li class={styles.tooltip_list_element}>
                            {event.event_text}
                          </li>
                        )}
                      </For>
                    </ul>
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
