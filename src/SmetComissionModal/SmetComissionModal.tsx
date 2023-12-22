import { PlaningModalForm } from "../PlaningModalForm";
import { TSmetComissionModalProps } from "./SmetComissionModalTypes";
import { CANCEL, SAVE } from "../shared/lib/constants";

import styles from "./SmetComissionModal.module.css";

export const SmetComissionModal = (props: TSmetComissionModalProps) => {
  
  return (
    <section class={styles.container}>
      <div class={styles.modal}>
        <h5 class={styles.header}>
          SmetComission Заголовок
          <button type="button" class={styles.header_close_button}>
            &#10006;
          </button>
        </h5>

        <PlaningModalForm />

        <div class={styles.buttons_wrapper}>
          <button
            type="submit"
            class={styles.button}
            classList={{ [styles.button_submit]: true }}
          >
            {SAVE}
          </button>
          <button
            type="button"
            class={styles.button}
            classList={{ [styles.button_reset]: true }}
          >
            {CANCEL}
          </button>
        </div>
      </div>
    </section>
  )
};