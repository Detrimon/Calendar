import { For, Show } from "solid-js";
import { TErrorsListProps } from "./ErrorsListTypes";
import { ERRORS_LIST_HEADER } from "../../lib/constants";

import styles from './ErrorsList.module.css';

export const ErrorsList = (props: TErrorsListProps) => {
  return (
    <Show when={!props.errors.total.status}>
      <ul class={styles.error_list}>
        <h5 class={styles.error_header}>
          {ERRORS_LIST_HEADER}
        </h5>
        <For each={Object.values(props.errors)}>
          {(error) => !error.status && <li class={styles.error_list_item}>{error.title}</li>}
        </For>
      </ul>
    </Show>
  )
};