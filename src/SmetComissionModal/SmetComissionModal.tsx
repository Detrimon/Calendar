import { Show, batch, createSignal } from "solid-js";
import { PlaningModalController, PlaningModalForm } from "../PlaningModalForm";
import { CANCEL, SAVE } from "../shared/lib/constants";
import { SmetComissionModalProvider } from "./data_provider/SmetComissionModalProvider";
import { useCalendarContext } from "../Calendar/context/CalendarContext";
import { SuccessModal } from "./ui/SuccessModal";
import { ErrorsList } from "./ui/ErrorsList";

import styles from "./SmetComissionModal.module.css";

export const [showSmetComissionModal, setShowSmetComissionModal] = createSignal(false);

export const SmetComissionModal = () => {
  const [success_modal_show, set_success_modal_show] = createSignal(false);
  const [success_modal_text, set_success_modal_text] = createSignal('');

  const [_, context] = useCalendarContext();
  const controller = context.get_controller();

  const provider = new SmetComissionModalProvider();
  const form_controller = new PlaningModalController();

  const close_modal = () => setShowSmetComissionModal(false);
  const close_success_modal_handler = () => {
    set_success_modal_show(false);
    close_modal();
  };

  const save_click_handler = async () => {
    const is_send_ok = await provider.send_form_data(form_controller.get_form_data());
    if (is_send_ok) {
      controller.load_and_set_events(context.get_year());
      
      batch(() => {
        set_success_modal_text(form_controller.get_form_data().title || '')
        set_success_modal_show(true);
      });
    };
  };

  const container_handler = (e) => {
    e.stopImmediatePropagation();

    if (e.currentTarget === e.target) close_modal();
  };
  
  return (
    <Show when={showSmetComissionModal()}>
      <section class={styles.container} onClick={container_handler}>
        <Show
          when={!success_modal_show()}
          fallback={
            <SuccessModal
              close_handler={close_success_modal_handler}
              text={success_modal_text()}
            />}
        >
          <div class={styles.modal}>
            <PlaningModalForm controller={form_controller} />
            <ErrorsList errors={form_controller.check()} />

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
                onClick={close_modal}
              >
                {CANCEL}
              </button>
            </div>

          </div>
        </Show>
      </section>
    </Show>
  );
};