<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, provide, ref } from "vue";
  import type { IAccordionItemInitPayload, IAccordionListState, IAccordionProvided } from "./accordion.types";
  import { PROVIDE_INJECT_KEY_ACCORDION_LIST } from "./accordion.types";

  const props = defineProps<{
    openMultipleItems?: boolean;
    state?: IAccordionListState;
    setClosePropertyTime?: number;
  }>();
  const emit = defineEmits<{ (e: "update:state", newState: IAccordionListState): void }>();
  const localState = ref<IAccordionListState>({});

  const state = computed<IAccordionListState>({
    set(newState: IAccordionListState) {
      const usePropsState = !!props.state;

      if (usePropsState) emit("update:state", newState);
      else localState.value = newState;
    },
    get() {
      return props.state ? props.state : localState.value;
    },
  });

  const hasOpenedItem = computed(() => {
    return Object.values(state.value).some(status => status);
  });

  let counter = 0;
  let resizeObserver: ResizeObserver | null = null;

  const rootElementRef = ref<HTMLDivElement>();
  function observeElements() {
    resizeObserver?.disconnect();

    resizeObserver = new ResizeObserver(entries => {
      entries.forEach(({ target, contentRect }) => {
        if (target.classList.contains("accordion-item__content"))
          target.parentElement?.style?.setProperty("--content-height", `${contentRect.height}px`);

        if (target.tagName.toLowerCase() === "summary")
          target.parentElement?.style?.setProperty("--summary-height", `${contentRect.height}px`);
      });
    });

    const elements = rootElementRef.value?.querySelectorAll(".accordion-item__content, summary") || [];
    elements.forEach(element => resizeObserver?.observe(element));
  }

  function onItemInit(payload: IAccordionItemInitPayload) {
    const isObserverCreated = !!resizeObserver;
    // itemInit called when observer is already created, need to reinit observer in order to observe new items
    if (isObserverCreated) observeElements();

    const canAddOpenedItem = !hasOpenedItem.value || !!props.openMultipleItems;

    const id = payload.id || (counter++).toString();
    const shouldBeOpenedByDefault = !!payload.defaultOpened && canAddOpenedItem;
    const isItemOpened = shouldBeOpenedByDefault || !!payload.isOnServerOpened || state.value[id];

    state.value[id] = isItemOpened;
    return { id, isItemOpened };
  }

  function onItemTrigger(id: string) {
    const newState = { ...state.value };
    const newItemValue = !newState[id];

    if (!props.openMultipleItems) Object.keys(newState).forEach(key => (newState[key] = false));
    newState[id] = newItemValue;

    state.value = newState;
  }

  onMounted(observeElements);
  onBeforeUnmount(() => {
    if (!resizeObserver) return;
    resizeObserver.disconnect();
    resizeObserver = null;
  });

  provide<IAccordionProvided>(PROVIDE_INJECT_KEY_ACCORDION_LIST, {
    init: onItemInit,
    trigger: onItemTrigger,
    setClosePropertyTime: props.setClosePropertyTime || 100,
    accordionListState: state,
  });
</script>

<template>
  <div ref="rootElementRef" class="accordion-list"><slot /></div>
</template>
