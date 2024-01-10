import { Show, createSignal } from "solid-js";
import { PlaningModalController, PlaningModalForm } from "../../PlaningModalForm";
import { CANCEL, SAVE } from "../../shared/lib/constants";
import { SmetComissionModalProvider } from "../data_provider/SmetComissionModalProvider";
import { useCalendarContext } from "../../Calendar/context/CalendarContext";

import styles from "./SmetComissionModal.module.css";

export const [showSmetComissionModal, setShowSmetComissionModal] = createSignal(false);

export const SmetComissionModal = () => {
  const [_, context] = useCalendarContext();
  const controller = context.get_controller();
  const provider = new SmetComissionModalProvider();
  const form_controller = new PlaningModalController();

  const cancel_click_handler = () => setShowSmetComissionModal(false);

  const save_click_handler = async () => {
    setShowSmetComissionModal(false);

    const is_send_ok = await provider.send_form_data(form_controller.get_form_data());
    if (is_send_ok) controller.load_and_set_events(context.get_year());
  };

  const container_handler = (e) => {
    e.stopImmediatePropagation();

    if (e.currentTarget === e.target) setShowSmetComissionModal(false);
  };
  
  return (
    <Show when={showSmetComissionModal()}>
      <section class={styles.container} onClick={container_handler }>
        <div class={styles.modal}>
          <h5 class={styles.header}>
            SmetComission Заголовок
            <button type="button" class={styles.header_close_button}>
              &#10006;
            </button>
          </h5>

          <PlaningModalForm controller={form_controller}/>

          <div class={styles.buttons_wrapper}>
            <button
              type="submit"
              class={styles.button}
              classList={{ [styles.button_submit]: true }}
              onClick={save_click_handler}
              disabled={!form_controller.check()}
            >
              {SAVE}
            </button>
            <button
              type="button"
              class={styles.button}
              classList={{[styles.button_reset]: true}}
              onClick={cancel_click_handler}
            >
              {CANCEL}
            </button>
          </div>
        </div>
      </section>
    </Show>
    
  );
};