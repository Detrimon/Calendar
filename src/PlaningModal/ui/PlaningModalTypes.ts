import { REPEAT_RATE_DAYS, WEEKDAYS_SHORT } from "../../shared/lib/constants";
import { PlaningModalConfig } from "../config/PlaningModalConfig";
import { PlaningModalController } from "../controller/PlaningModalController";
import { REPEAT_EVERY } from "../lib/constants";

export type TPlaningModalProps = {
  controller: PlaningModalController
  config?: PlaningModalConfig
  show: boolean;
  onModalHide: () => void;
};

export type TWeekDaysInputProps = {
  day_name: REPEAT_RATE_DAYS,
  label: `${WEEKDAYS_SHORT}`
};

export type TRepeatVariantRadioProps = {
   variant: keyof typeof REPEAT_EVERY
}