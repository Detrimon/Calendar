import { CalendarActions, GUID } from "../../Calendar";
import { TErrorsData } from "../../PlaningModalForm/controller";

export type TSmetComissionModalProps = {
  subscribe(event: CalendarActions, fn: (data: any) => void): GUID
}

export type TSuccessModalProps = {
  text: string;
  close_handler(): void
}

export type TErrorsListProps = {
  errors: TErrorsData
}