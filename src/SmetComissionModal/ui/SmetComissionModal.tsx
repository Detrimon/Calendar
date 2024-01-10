import { For, Show, createSignal } from "solid-js";
import { PlaningModalController, PlaningModalForm } from "../../PlaningModalForm";
import { CANCEL, SAVE } from "../../shared/lib/constants";
import { SmetComissionModalProvider } from "../data_provider/SmetComissionModalProvider";
import { useCalendarContext } from "../../Calendar/context/CalendarContext";
import { ERRORS_LIST_HEADER } from "../lib/constants";
import { TErrorsData } from "../../PlaningModalForm/controller";

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
      <section class={styles.container} onClick={container_handler}>
        <div class={styles.modal}>

          <h5 class={styles.header}>
            SmetComission Заголовок
            <button type="button" class={styles.header_close_button}>
              &#10006;
            </button>
          </h5>
          <PlaningModalForm controller={form_controller} />
          <ErrorsList errors={form_controller.check()}/>

          <div class={styles.buttons_wrapper}>
            <button
              type="submit"
              class={styles.button}
              classList={{ [styles.button_submit]: true }}
              onClick={save_click_handler}
              disabled={!form_controller.check().total.status}
            >
              {SAVE}
            </button>
            <button
              type="button"
              class={styles.button}
              classList={{ [styles.button_reset]: true }}
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

const ErrorsList = (props: { errors: TErrorsData }) => {
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