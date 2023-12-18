import { createStore } from "solid-js/store";
import { Show } from "solid-js";
import { TPlaningModalProps } from "./PlaningModalTypes";
import { ALLDAY_MEETING } from "./lib/constants";
import { CustomButton, CustomButtonVariants } from "../shared/ui/CustomButton";

import styles from "./PlaningModal.module.css";

export const PlaningModal = (props: TPlaningModalProps) => {
  const [form, setForm] = createStore({
    is_allday_meeting: false
  });

  const submit_handler = (e) => {
    e.preventDefault()
  }

  const click_handler = () => {

    setForm('is_allday_meeting', prev => !prev);
  }

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

          <form onSubmit={submit_handler}>
            <div class={styles.row_wrapper}>
              <span>{ALLDAY_MEETING}</span>
              <p>
                <CustomButton variant={
                  form.is_allday_meeting ? CustomButtonVariants.COLORED : CustomButtonVariants.TRANSPARENT
                }>Да</CustomButton>
                <CustomButton variant={
                  form.is_allday_meeting ? CustomButtonVariants.TRANSPARENT : CustomButtonVariants.COLORED
                }>Нет</CustomButton>
              </p>
              <button onClick={click_handler}>click</button>
            </div>
          </form>
        </div>
      </div>
    </Show>
  );
};