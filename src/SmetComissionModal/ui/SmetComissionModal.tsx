import { For, Show, batch, createSignal } from "solid-js";
import { PlaningModalController, PlaningModalForm } from "../../PlaningModalForm";
import { CANCEL, SAVE } from "../../shared/lib/constants";
import { SmetComissionModalProvider } from "../data_provider/SmetComissionModalProvider";
import { useCalendarContext } from "../../Calendar/context/CalendarContext";
import { ERRORS_LIST_HEADER } from "../lib/constants";
import { TErrorsListProps, TSmetComissionModalProps, TSuccessModalProps } from "./SmetComissionModalTypes";
import { PlaningModalConfig } from "../../PlaningModalForm/config";
import { format_date_to_reversed_string } from "../../shared/lib/helpers";
import { CalendarActions } from "../../Calendar";

import styles from "./SmetComissionModal.module.css";

export const [showSmetComissionModal, setShowSmetComissionModal] = createSignal(false);

export const SmetComissionModal = (props: TSmetComissionModalProps) => {
  const [success_modal_show, set_success_modal_show] = createSignal(false);
  const [success_modal_text, set_success_modal_text] = createSignal('');

  const [_, context] = useCalendarContext();
  const controller = context.get_controller();

  const provider = new SmetComissionModalProvider();
  const form_controller = new PlaningModalController();
  const form_config = new PlaningModalConfig({
    start_date: format_date_to_reversed_string(context.get_selected_date()),
    end_date: format_date_to_reversed_string(context.get_selected_date())
  });

  props.subscribe(CalendarActions.SELECTED_DATE, ({ data }) => {
    form_controller.set_context_value('start_date', data);
    form_controller.set_context_value('end_date', data);

    console.log('!!!!');
    
  });

  const close_modal = () => setShowSmetComissionModal(false);
  const close_success_modal_handler = () => {
    set_success_modal_show(false);
    close_modal();
  }

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
            <PlaningModalForm controller={form_controller} config={form_config}/>
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

const ErrorsList = (props: TErrorsListProps) => {
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

const SuccessModal = (props: TSuccessModalProps) => {
  return (
    <div class={styles.success_modal}>
      <p>Событие {props.text} успешно запланировано</p>
      <button
        class={styles.success_modal_button}
        onClick={props.close_handler}
      >Закрыть
      </button>
    </div>
  );
};