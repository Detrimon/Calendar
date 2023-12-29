import { For, Match, Switch, createSignal } from 'solid-js';

import { CalendarActions, TDateTask } from '../Calendar';
import { format_date_to_string_with_words } from '../shared/lib/helpers';
import { TAsideEvents } from './AsideEventsTypes';
import { NO_SCHEDULED_TASKS } from './lib/constants';
import { Task } from './ui/Task/Task'; 

import styles from './AsideEvents.module.css';

export const AsideEvents = (props: TAsideEvents) => {
  const [tasks, set_tasks] = createSignal<TDateTask[]>([]);
  const [date, set_date] = createSignal(new Date());

  props.subscribe(CalendarActions.GET_SELECTED_DATE_EVENTS, ({ data }) => {
    set_tasks(data)
  });
  props.subscribe(CalendarActions.SELECTED_DATE, ({ data }) => {
    set_date(data)
  });

  return (
    <div class={styles.container}>
      <h3 class={styles.header}>{format_date_to_string_with_words(date())}</h3>
      <ul class={styles.events_list}>
        <Switch fallback={<p class={styles.event_item}>Loading...</p>}>
          <Match when={tasks().length === 0} >
            <p class={styles.no_event_item}>{NO_SCHEDULED_TASKS}</p>
          </Match>
          <Match when={tasks().length !== 0}>
            <For each={tasks()}>{
              (task, i) => <Task task={task} order={i} />
            }</For>
          </Match>
        </Switch>
      </ul>
    </div>
  );
};