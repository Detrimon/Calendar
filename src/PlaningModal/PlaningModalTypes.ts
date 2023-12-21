import { PlaningModalConfig } from "./config/PlaningModalConfig";
import { PlaningModalController } from "./controller/PlaningModalController";

export type TPlaningModalProps = {
  controller: PlaningModalController
  config?: PlaningModalConfig
  show: boolean;
  onModalHide: () => void;
};