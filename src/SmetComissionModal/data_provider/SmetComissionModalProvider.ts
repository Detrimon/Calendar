import { TPlaningModalState } from "../../PlaningModalForm/context";

const token = import.meta.env.VITE_BEARER_TOKEN;

export class SmetComissionModalProvider {

  async send_form_data(data: Partial<TPlaningModalState>) {
    try {
      const response = await fetch('https://rcgpnspn01.inlinegroup.ru/api/calendar-events', {
        method: 'POST',
        body: JSON.stringify({data}),
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: token
        },
      });

      if (response.ok) {
        return response.ok
      } else {
        console.error("Ошибка HTTP: " + response.status);
      };
    } catch (error) {
      console.error(error);
    };
  };
};
