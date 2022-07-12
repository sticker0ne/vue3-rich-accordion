<script setup lang="ts">
  import { computed, inject, onMounted, onServerPrefetch, ref, watch } from "vue";
  import { PROVIDE_INJECT_KEY_ACCORDION_LIST } from "./accordion.types";
  import type { IAccordionProvided } from "./accordion.types";

  const props = defineProps<{ id?: string; defaultOpened?: boolean; disabled?: boolean }>();

  const { trigger, init, accordionListState, setClosePropertyTime } =
    inject<IAccordionProvided>(PROVIDE_INJECT_KEY_ACCORDION_LIST) || {};

  const currentItemState = computed(() => accordionListState?.value[id.value] || false);

  const detailsRef = ref<HTMLDetailsElement>();

  const id = ref("");
  const isTransitionPending = ref(false);
  const detailsElementState = ref(currentItemState.value);

  const isOnServerOpened = ref(false);
  const onServerId = ref("");

  onServerPrefetch(async () => {
    if (!init) {
      console.error("no initItem function provided, please use AccordionItem only inside AccordionList");
      return;
    }

    const { id, isItemOpened } = init({ ...props });
    isOnServerOpened.value = isItemOpened;
    onServerId.value = id;
  });

  onMounted(() => {
    if (!init) {
      console.error("no initItem function provided, please use AccordionItem only inside AccordionList");
      return;
    }

    if (detailsRef.value?.dataset.id) id.value = detailsRef.value.dataset.id;

    const isOnServerOpened = detailsRef.value?.dataset?.isOnServerOpened == "true";

    const { id: onServerId } = init({ ...props, isOnServerOpened });
    id.value = onServerId;
  });

  function onSummaryClick() {
    if (!trigger || props.disabled) return;
    trigger(id.value);
  }

  const detailsClasses = computed(() => {
    return {
      "accordion-item--open": currentItemState.value || isOnServerOpened.value,
      "accordion-item--disabled": props.disabled,
    };
  });

  function onTransitionRun() {
    isTransitionPending.value = true;
  }

  function onTransitionEnd() {
    isTransitionPending.value = false;
    detailsElementState.value = currentItemState.value;
  }

  watch(currentItemState, (newValue: boolean) => {
    // If new value is opened we need to set openFlagRef immediately in order to set details state open
    if (newValue) {
      detailsElementState.value = true;
      return;
    }

    // If new value is closed we need to check if transition is pending end then close details
    setTimeout(() => {
      // In case when transition is disabled by css we need to set flag to false
      // In case when transition is enabled we need to wait "setClosePropertyTime" to wait when transition will start
      if (!isTransitionPending.value) detailsElementState.value = false;
    }, setClosePropertyTime);
  });
</script>

<template>
  <details
    ref="detailsRef"
    class="accordion-item"
    :class="detailsClasses"
    :open="detailsElementState || isOnServerOpened"
    :data-id="onServerId"
    :data-is-on-server-opened="isOnServerOpened"
    @transitionrun="onTransitionRun"
    @transitionend="onTransitionEnd"
  >
    <summary class="accordion-item__summary" @click.prevent="onSummaryClick">
      <span class="accordion-item__summary-title">
        <slot name="summary" />
      </span>
      <span v-if="$slots.icon" class="accordion-item__summary-icon">
        <slot name="icon" />
      </span>
      <span v-else class="accordion-item__summary-icon accordion-item__summary-icon--default" />
    </summary>
    <div class="accordion-item__content">
      <slot />
    </div>
  </details>
</template>
