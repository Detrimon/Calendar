import { createSignal, Show, For } from "solid-js";
import { TTaskProps } from "../../AsideEventsTypes";
import { NO_SCHEDULED_SUBTASKS } from "../../lib/constants";

import styles from "./Task.module.css";

export const Task = (props: TTaskProps) => {
  const [show, set_show] = createSignal(props.order() === 0);

  const handle_title_click = () => set_show(prev => !prev);

  return (
    <div>
      <h4
        class={styles.task_title}
        onClick={handle_title_click}
      >{props.task.title}</h4>
      <Show when={show()}>
        <Show when={props.task.tasks.length !== 0} fallback={<p>{NO_SCHEDULED_SUBTASKS}</p>}>
          <ul class={styles.task_list}>
            <For each={props.task.tasks}>
              {(task_elem) =>
                <li class={styles.task_elem}>
                  <p class={styles.task_elem_time}>{task_elem.attributes.start_time.slice(0, 5)}</p>
                  <p class={styles.task_elem_text}>{task_elem.attributes.title}</p>
                  <a href="/">{task_elem.attributes.plan_item_number}</a>
                </li>
              }
            </For>
          </ul>
        </Show>
        
      </Show>
    </div>
  );
};