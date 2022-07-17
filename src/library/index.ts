import AccordionList from "./accordion/AccordionList.vue";
import AccordionItem from "./accordion/AccordionItem.vue";

const useAccordion = {
  install: function (app: { component: (a: string, b: unknown) => void }) {
    app.component("AccordionList", AccordionList);
    app.component("AccordionItem", AccordionItem);
  },
};

export { AccordionList, AccordionItem, useAccordion };
