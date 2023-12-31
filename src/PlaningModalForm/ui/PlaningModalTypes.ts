import { REPEAT_RATE_DAYS, WEEKDAYS_SHORT } from "../../shared/lib/constants";
import { PlaningModalConfig } from "../config/PlaningModalConfig";
import { PlaningModalController } from "../controller/PlaningModalController";
import { REPEAT_EVERY } from "../lib/constants";

export type TPlaningModalFormProps = {
  controller: PlaningModalController
  config?: PlaningModalConfig
};

export type TWeekDaysInputProps = {
  day_name: REPEAT_RATE_DAYS,
  label: `${WEEKDAYS_SHORT}`
};

export type TRepeatVariantRadioProps = {
   variant: keyof typeof REPEAT_EVERY
}