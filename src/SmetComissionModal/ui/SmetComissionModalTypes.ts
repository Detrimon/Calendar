import { TErrorsData } from "../../PlaningModalForm/controller";

export type TSuccessModalProps = {
  text: string;
  close_handler(): void
}

export type TErrorsListProps = {
  errors: TErrorsData
}