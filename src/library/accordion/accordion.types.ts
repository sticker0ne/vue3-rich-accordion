import type { Ref } from "vue";

export const PROVIDE_INJECT_KEY_ACCORDION_LIST = "PROVIDE_INJECT_KEY_ACCORDION_LIST";
export type IAccordionListState = Record<string, boolean>;

export interface IAccordionItemInitPayload {
  id?: string;
  defaultOpened?: boolean;
  isOnServerOpened?: boolean;
}

export interface IAccordionProvided {
  init(payload: IAccordionItemInitPayload): { id: string; isItemOpened: boolean };
  trigger(id: string): void;
  accordionListState: Ref<IAccordionListState>;
  setClosePropertyTime: number;
}
