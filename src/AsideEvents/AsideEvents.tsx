import { For, Match, Switch, createSignal } from 'solid-js';

import { CalendarActions } from '../Calendar/ui/CalendarTypes';
import { format_date_to_string } from '../Calendar/helpers/calendar_helpers';
import { ICalendarDayEvent } from '../Calendar/data_provider/CalendarDataProviderTypes';
import { TAsideEvents } from './AsideEventsTypes';

import styles from './AsideEvents.module.css';

export const AsideEvents = (props: TAsideEvents) => {
  const [events, set_events] = createSignal<ICalendarDayEvent[]>([]);
  const [date, set_date] = createSignal(new Date());

  props.subscribe(CalendarActions.GET_SELECTED_DATE_EVENTS, ({ data }) => {
    set_events(data)
  });
  props.subscribe(CalendarActions.SELECTED_DATE, ({ data }) => {
    set_date(data)
  });

  return (
    <div class={styles.container}>
      <h3 class={styles.header}>Задачи на {format_date_to_string(date())}</h3>
      <ul class={styles.events_list}>
        <Switch fallback={<p class={styles.event_item}>Loading...</p>}>
        <Match when={events().length === 0} >
          <li class={styles.event_item}>Задач нет</li>
        </Match>
        <Match when={events().length !== 0}>
          <For each={events()}>{
            (event) =>
              <li class={styles.event_item}>
                {event.event_text}
              </li>
          }</For>
        </Match>
      </Switch>
      </ul>
    </div>
  );
};