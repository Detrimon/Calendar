import { createSignal, Show, For } from "solid-js";
import { TDateTask } from "../../../Calendar"; 

import styles from "./Task.module.css";

export const Task = (props: { task: TDateTask }) => {
  const [show, set_show] = createSignal(false);

  const handle_title_click = () => set_show(prev => !prev);

  return (
    <div>
      <h4
        class={styles.task_title}
        onClick={handle_title_click}
      >{props.task.title}</h4>
      <Show
        when={show()}
      >
        <ul class={styles.task_list}>
          <For each={props.task.tasks}>
            {(task_elem) =>
              <li class={styles.task_elem}>
                <p class={styles.task_elem_time}>{task_elem.attributes.start_time}</p>
                <p class={styles.task_elem_text}>{task_elem.attributes.title}</p>
                <a href="/">{task_elem.attributes.plan_item_number}</a>
              </li>
            }
          </For>
        </ul>
      </Show>
    </div>
  );
};