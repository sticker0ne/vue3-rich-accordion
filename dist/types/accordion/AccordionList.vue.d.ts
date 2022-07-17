import type { IAccordionListState } from "./accordion.types";
declare const _default: import("vue").DefineComponent<__VLS_TypePropsToRuntimeProps<{
    openMultipleItems?: boolean | undefined;
    state?: IAccordionListState | undefined;
    setClosePropertyTime?: number | undefined;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:state": (newState: IAccordionListState) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_TypePropsToRuntimeProps<{
    openMultipleItems?: boolean | undefined;
    state?: IAccordionListState | undefined;
    setClosePropertyTime?: number | undefined;
}>>> & {
    "onUpdate:state"?: ((newState: IAccordionListState) => any) | undefined;
}, {}>;
export default _default;
declare type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
declare type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
