import { Component, Show } from "solid-js";

import styles from "./PlaningModal.module.css";

type TPlaningModalProps = {
  show: boolean;
  onModalHide: () => void;
}

export const PlaningModal: Component<TPlaningModalProps> = (props) => {
  
  return (
    <Show when={props.show}>
      <div class={styles.container}>
        <div class={styles.modal}>
          <h5 class={styles.header}>
            Заголовок
            <button class={styles.header_close_button}>
              &#10006;
            </button>
          </h5>
          <form action="/" method="post">
            424242
          </form>
        </div>
      </div>
    </Show>
  )
};