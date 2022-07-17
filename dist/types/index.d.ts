import AccordionList from "./accordion/AccordionList.vue";
import AccordionItem from "./accordion/AccordionItem.vue";
declare const useAccordion: {
    install: (app: {
        component: (a: string, b: unknown) => void;
    }) => void;
};
export { AccordionList, AccordionItem, useAccordion };
