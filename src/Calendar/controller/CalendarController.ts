import { v4 as uuidv4 } from "uuid";
import { CalendarDataProvider } from "../data_provider/CalendarDataProvider";
import { CalendarView } from "../ui/CalendarView/CalendarView";
import { CalendarActions } from "../ui/CalendarTypes";
import type { CalendarEventsInterface } from "../data_provider/CalendarDataProviderTypes";
import type { GUID, Observers } from "./CalendarControllerTypes";
import { TCalendarStateMethods } from "../context/CalendarContextTypes";

export class CalendarController {
  data_provider: CalendarDataProvider | null;
  view: CalendarView | null;
  context: TCalendarStateMethods | null;

  // Мне кажется тут static использовать нельзя. Если у нас так случиться, что в системе будет использоваться
  // две инстанции Календаря, то у них observers будут общие, так как они принадлежат классу, а не экземпляру класса.
  static observers: Observers = {};
  static subscribe(event: CalendarActions, fn: (data: any) => void) {
    if (CalendarController.observers[event] === undefined) {
      CalendarController.observers[event] = {};
    }
    const guid = uuidv4() as GUID;
    CalendarController.observers[event][guid] = fn;
    return guid;
    // CalendarController.observers[event]?.push(fn);
  }

  static notify(event: CalendarActions, data: any) {
    let observers_by_event = CalendarController.observers[event];
    if (!observers_by_event) return;

    Object.values(observers_by_event).forEach((fn) => {
      fn({ event, data });
    });
  }

  constructor() {
    this.data_provider = null;
    this.view = null;
    this.context = null;
  }

  initialize(context: TCalendarStateMethods) {
    this.data_provider = context.get_data_provider();
    this.view = context.get_view();
    this.context = context;
  }

  get_context() {
    if (!this.context)
      throw Error('CalendarController instance has not "context" property');
    return this.context;
  }

  get_data_provider() {
    if (!this.data_provider)
      throw Error(
        'CalendarController instance has not "data_provider" property'
      );
    return this.data_provider;
  }

  async plus_year() {
    const context = this.get_context();
    const data_provider = this.get_data_provider();

    const next_year = context.get_year() + 1;
    context.set_year(next_year);

    const events = (await data_provider.get_events(
      next_year
    )) as CalendarEventsInterface[];
    context.set_events(events);
  }

  async minus_year() {
    const context = this.get_context();
    const data_provider = this.get_data_provider();

    const prev_year = context.get_year() - 1;
    context.set_year(prev_year);

    const events = (await data_provider.get_events(
      prev_year
    )) as CalendarEventsInterface[];
    context.set_events(events);
  }
}
