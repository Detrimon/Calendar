import { splitProps } from "solid-js";
import { CustomButtonProps, CustomButtonVariants } from "./CustomButtonTypes";

import styles from "./CustomButton.module.css";

export const CustomButton = (props: CustomButtonProps) => {
  const [local, others] = splitProps(props, ["classList", "children", "variant"]);

  return (
    <button
      classList={{
        [styles.variant_colored]: local.variant === CustomButtonVariants.COLORED,
        [styles.variant_transparent]: local.variant === CustomButtonVariants.TRANSPARENT,
        ...local.classList
      }}
      {...others}
    >
      {local.children}
    </button>
  )
}