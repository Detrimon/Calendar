import { onMount } from "solid-js";

import { CalendarContextClass } from "../context/CalendarContextClass";
import { CalendarDataProvider } from "../data_provider/CalendarDataProvider";
import { CalendarView } from "../ui/CalendarView/CalendarView";
import { CalendarActions } from "../ui/CalendarTypes";
import type { CalendarEventsInterface } from "../data_provider/CalendarDataProviderTypes";
import type { Observers } from "./CalendarControllerTypes";

export class CalendarController {
  provider: CalendarDataProvider | null
  view: CalendarView | null
  context: CalendarContextClass | null

  static observers: Observers = {}
  static subscribe(event: `${CalendarActions}` , fn: (data: any) => void) {
    if (CalendarController.observers[event] === undefined) {
      CalendarController.observers[event] = [];
    };
    CalendarController.observers[event]?.push(fn);
  };
  
  constructor() {
    this.provider = null;
    this.view = null;
    this.context = null;
  };

  initialize(context: CalendarContextClass) {
    this.provider = context.store.data_provider;
    this.view = context.store.view;
    this.context = context

    onMount(async () => {
      const current_year = new Date().getFullYear();
      const events = await this.provider?.get_events(current_year) as CalendarEventsInterface[];

      context.set_events(events);
    })
  }

  async plus_year() {
    const next_year = this.context.get_year() + 1;
    this.context && this.context.set_year(next_year)

    const events = await this.provider?.get_events(next_year) as CalendarEventsInterface[];
    this.context?.set_events(events);
  };

  async minus_year() {
    const prev_year = this.context.get_year() - 1;
    this.context && this.context.set_year(prev_year)

    const events = await this.provider?.get_events(prev_year) as CalendarEventsInterface[];
    this.context?.set_events(events);
  };
};