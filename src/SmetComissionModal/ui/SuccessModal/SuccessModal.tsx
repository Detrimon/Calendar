import { CLOSE } from "../../lib/constants";
import { TSuccessModalProps } from "./SuccessModalTypes";

import styles from './SuccessModal.module.css';

export const SuccessModal = (props: TSuccessModalProps) => {
  return (
    <div class={styles.success_modal}>
      <p>Событие {props.text} успешно запланировано</p>
      <button
        class={styles.success_modal_button}
        onClick={props.close_handler}
      >{CLOSE}
      </button>
    </div>
  );
};