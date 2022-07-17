import { defineComponent, ref, computed, onMounted, onBeforeUnmount, provide, openBlock, createElementBlock, renderSlot, inject, onServerPrefetch, watch, normalizeClass, unref, createElementVNode, withModifiers } from "vue";
const PROVIDE_INJECT_KEY_ACCORDION_LIST = "PROVIDE_INJECT_KEY_ACCORDION_LIST";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AccordionList",
  props: {
    openMultipleItems: { type: Boolean },
    state: null,
    setClosePropertyTime: null
  },
  emits: ["update:state"],
  setup(__props, { emit }) {
    const props = __props;
    const localState = ref({});
    const state = computed({
      set(newState) {
        const usePropsState = !!props.state;
        if (usePropsState)
          emit("update:state", newState);
        else
          localState.value = newState;
      },
      get() {
        return props.state ? props.state : localState.value;
      }
    });
    const hasOpenedItem = computed(() => {
      return Object.values(state.value).some((status) => status);
    });
    let counter = 0;
    let resizeObserver = null;
    const rootElementRef = ref();
    function observeElements() {
      var _a;
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
      resizeObserver = new ResizeObserver((entries) => {
        entries.forEach(({ target, contentRect }) => {
          var _a2, _b, _c, _d;
          if (target.classList.contains("accordion-item__content"))
            (_b = (_a2 = target.parentElement) == null ? void 0 : _a2.style) == null ? void 0 : _b.setProperty("--content-height", `${contentRect.height}px`);
          if (target.tagName.toLowerCase() === "summary")
            (_d = (_c = target.parentElement) == null ? void 0 : _c.style) == null ? void 0 : _d.setProperty("--summary-height", `${contentRect.height}px`);
        });
      });
      const elements = ((_a = rootElementRef.value) == null ? void 0 : _a.querySelectorAll(".accordion-item__content, summary")) || [];
      elements.forEach((element) => resizeObserver == null ? void 0 : resizeObserver.observe(element));
    }
    function onItemInit(payload) {
      const isObserverCreated = !!resizeObserver;
      if (isObserverCreated)
        observeElements();
      const canAddOpenedItem = !hasOpenedItem.value || !!props.openMultipleItems;
      const id = payload.id || (counter++).toString();
      const shouldBeOpenedByDefault = !!payload.defaultOpened && canAddOpenedItem;
      const isItemOpened = shouldBeOpenedByDefault || !!payload.isOnServerOpened || state.value[id];
      state.value[id] = isItemOpened;
      return { id, isItemOpened };
    }
    function onItemTrigger(id) {
      const newState = { ...state.value };
      const newItemValue = !newState[id];
      if (!props.openMultipleItems)
        Object.keys(newState).forEach((key) => newState[key] = false);
      newState[id] = newItemValue;
      state.value = newState;
    }
    onMounted(observeElements);
    onBeforeUnmount(() => {
      if (!resizeObserver)
        return;
      resizeObserver.disconnect();
      resizeObserver = null;
    });
    provide(PROVIDE_INJECT_KEY_ACCORDION_LIST, {
      init: onItemInit,
      trigger: onItemTrigger,
      setClosePropertyTime: props.setClosePropertyTime || 100,
      accordionListState: state
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "rootElementRef",
        ref: rootElementRef,
        class: "accordion-list"
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 512);
    };
  }
});
const _hoisted_1 = ["open", "data-id", "data-is-on-server-opened"];
const _hoisted_2 = ["onClick"];
const _hoisted_3 = { class: "accordion-item__summary-title" };
const _hoisted_4 = {
  key: 0,
  class: "accordion-item__summary-icon"
};
const _hoisted_5 = {
  key: 1,
  class: "accordion-item__summary-icon accordion-item__summary-icon--default"
};
const _hoisted_6 = { class: "accordion-item__content" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccordionItem",
  props: {
    id: null,
    defaultOpened: { type: Boolean },
    disabled: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { trigger, init, accordionListState, setClosePropertyTime } = inject(PROVIDE_INJECT_KEY_ACCORDION_LIST) || {};
    const currentItemState = computed(() => (accordionListState == null ? void 0 : accordionListState.value[id.value]) || false);
    const detailsRef = ref();
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
      const { id: id2, isItemOpened } = init({ ...props });
      isOnServerOpened.value = isItemOpened;
      onServerId.value = id2;
    });
    onMounted(() => {
      var _a, _b, _c;
      if (!init) {
        console.error("no initItem function provided, please use AccordionItem only inside AccordionList");
        return;
      }
      if ((_a = detailsRef.value) == null ? void 0 : _a.dataset.id)
        id.value = detailsRef.value.dataset.id;
      const isOnServerOpened2 = ((_c = (_b = detailsRef.value) == null ? void 0 : _b.dataset) == null ? void 0 : _c.isOnServerOpened) == "true";
      const { id: onServerId2 } = init({ ...props, isOnServerOpened: isOnServerOpened2 });
      id.value = onServerId2;
    });
    function onSummaryClick() {
      if (!trigger || props.disabled)
        return;
      trigger(id.value);
    }
    const detailsClasses = computed(() => {
      return {
        "accordion-item--open": currentItemState.value || isOnServerOpened.value,
        "accordion-item--disabled": props.disabled
      };
    });
    function onTransitionRun() {
      isTransitionPending.value = true;
    }
    function onTransitionEnd() {
      isTransitionPending.value = false;
      detailsElementState.value = currentItemState.value;
    }
    watch(currentItemState, (newValue) => {
      if (newValue) {
        detailsElementState.value = true;
        return;
      }
      setTimeout(() => {
        if (!isTransitionPending.value)
          detailsElementState.value = false;
      }, setClosePropertyTime);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("details", {
        ref_key: "detailsRef",
        ref: detailsRef,
        class: normalizeClass(["accordion-item", unref(detailsClasses)]),
        open: detailsElementState.value || isOnServerOpened.value,
        "data-id": onServerId.value,
        "data-is-on-server-opened": isOnServerOpened.value,
        onTransitionrun: onTransitionRun,
        onTransitionend: onTransitionEnd
      }, [
        createElementVNode("summary", {
          class: "accordion-item__summary",
          onClick: withModifiers(onSummaryClick, ["prevent"])
        }, [
          createElementVNode("span", _hoisted_3, [
            renderSlot(_ctx.$slots, "summary")
          ]),
          _ctx.$slots.icon ? (openBlock(), createElementBlock("span", _hoisted_4, [
            renderSlot(_ctx.$slots, "icon")
          ])) : (openBlock(), createElementBlock("span", _hoisted_5))
        ], 8, _hoisted_2),
        createElementVNode("div", _hoisted_6, [
          renderSlot(_ctx.$slots, "default")
        ])
      ], 42, _hoisted_1);
    };
  }
});
const useAccordion = {
  install: function(app) {
    app.component("AccordionList", _sfc_main$1);
    app.component("AccordionItem", _sfc_main);
  }
};
export { _sfc_main as AccordionItem, _sfc_main$1 as AccordionList, useAccordion };
