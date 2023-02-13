import { b as useDarkProps, c as useDark } from "./QNoSsr.js";
import { c as createComponent, d as computed, h, g as getCurrentInstance, e as hSlot } from "./index.js";
const insetMap = {
  true: "inset",
  item: "item-inset",
  "item-thumbnail": "item-thumbnail-inset"
};
const margins = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24
};
var QSeparator = createComponent({
  name: "QSeparator",
  props: {
    ...useDarkProps,
    spaced: [Boolean, String],
    inset: [Boolean, String],
    vertical: Boolean,
    color: String,
    size: String
  },
  setup(props) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const orientation = computed(() => props.vertical === true ? "vertical" : "horizontal");
    const orientClass = computed(() => ` q-separator--${orientation.value}`);
    const insetClass = computed(() => props.inset !== false ? `${orientClass.value}-${insetMap[props.inset]}` : "");
    const classes = computed(
      () => `q-separator${orientClass.value}${insetClass.value}` + (props.color !== void 0 ? ` bg-${props.color}` : "") + (isDark.value === true ? " q-separator--dark" : "")
    );
    const style = computed(() => {
      const acc = {};
      if (props.size !== void 0) {
        acc[props.vertical === true ? "width" : "height"] = props.size;
      }
      if (props.spaced !== false) {
        const size = props.spaced === true ? `${margins.md}px` : props.spaced in margins ? `${margins[props.spaced]}px` : props.spaced;
        const dir = props.vertical === true ? ["Left", "Right"] : ["Top", "Bottom"];
        acc[`margin${dir[0]}`] = acc[`margin${dir[1]}`] = size;
      }
      return acc;
    });
    return () => h("hr", {
      class: classes.value,
      style: style.value,
      "aria-orientation": orientation.value
    });
  }
});
var QList = createComponent({
  name: "QList",
  props: {
    ...useDarkProps,
    bordered: Boolean,
    dense: Boolean,
    separator: Boolean,
    padding: Boolean,
    tag: {
      type: String,
      default: "div"
    }
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const classes = computed(
      () => "q-list" + (props.bordered === true ? " q-list--bordered" : "") + (props.dense === true ? " q-list--dense" : "") + (props.separator === true ? " q-list--separator" : "") + (isDark.value === true ? " q-list--dark" : "") + (props.padding === true ? " q-list--padding" : "")
    );
    return () => h(props.tag, { class: classes.value }, hSlot(slots.default));
  }
});
export { QList as Q, QSeparator as a };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUxpc3QuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc2VwYXJhdG9yL1FTZXBhcmF0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2l0ZW0vUUxpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5cbmNvbnN0IGluc2V0TWFwID0ge1xuICB0cnVlOiAnaW5zZXQnLFxuICBpdGVtOiAnaXRlbS1pbnNldCcsXG4gICdpdGVtLXRodW1ibmFpbCc6ICdpdGVtLXRodW1ibmFpbC1pbnNldCdcbn1cblxuZXhwb3J0IGNvbnN0IG1hcmdpbnMgPSB7XG4gIHhzOiAyLFxuICBzbTogNCxcbiAgbWQ6IDgsXG4gIGxnOiAxNixcbiAgeGw6IDI0XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2VwYXJhdG9yJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIHNwYWNlZDogWyBCb29sZWFuLCBTdHJpbmcgXSxcbiAgICBpbnNldDogWyBCb29sZWFuLCBTdHJpbmcgXSxcbiAgICB2ZXJ0aWNhbDogQm9vbGVhbixcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHNpemU6IFN0cmluZ1xuICB9LFxuXG4gIHNldHVwIChwcm9wcykge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgPyAndmVydGljYWwnXG4gICAgICAgIDogJ2hvcml6b250YWwnXG4gICAgKSlcblxuICAgIGNvbnN0IG9yaWVudENsYXNzID0gY29tcHV0ZWQoKCkgPT4gYCBxLXNlcGFyYXRvci0tJHsgb3JpZW50YXRpb24udmFsdWUgfWApXG5cbiAgICBjb25zdCBpbnNldENsYXNzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuaW5zZXQgIT09IGZhbHNlXG4gICAgICAgID8gYCR7IG9yaWVudENsYXNzLnZhbHVlIH0tJHsgaW5zZXRNYXBbIHByb3BzLmluc2V0IF0gfWBcbiAgICAgICAgOiAnJ1xuICAgICkpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLXNlcGFyYXRvciR7IG9yaWVudENsYXNzLnZhbHVlIH0keyBpbnNldENsYXNzLnZhbHVlIH1gXG4gICAgICArIChwcm9wcy5jb2xvciAhPT0gdm9pZCAwID8gYCBiZy0keyBwcm9wcy5jb2xvciB9YCA6ICcnKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXNlcGFyYXRvci0tZGFyaycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGFjYyA9IHt9XG5cbiAgICAgIGlmIChwcm9wcy5zaXplICE9PSB2b2lkIDApIHtcbiAgICAgICAgYWNjWyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd3aWR0aCcgOiAnaGVpZ2h0JyBdID0gcHJvcHMuc2l6ZVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuc3BhY2VkICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBzaXplID0gcHJvcHMuc3BhY2VkID09PSB0cnVlXG4gICAgICAgICAgPyBgJHsgbWFyZ2lucy5tZCB9cHhgXG4gICAgICAgICAgOiBwcm9wcy5zcGFjZWQgaW4gbWFyZ2lucyA/IGAkeyBtYXJnaW5zWyBwcm9wcy5zcGFjZWQgXSB9cHhgIDogcHJvcHMuc3BhY2VkXG5cbiAgICAgICAgY29uc3QgZGlyID0gcHJvcHMudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgICA/IFsgJ0xlZnQnLCAnUmlnaHQnIF1cbiAgICAgICAgICA6IFsgJ1RvcCcsICdCb3R0b20nIF1cblxuICAgICAgICBhY2NbIGBtYXJnaW4keyBkaXJbIDAgXSB9YCBdID0gYWNjWyBgbWFyZ2luJHsgZGlyWyAxIF0gfWAgXSA9IHNpemVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnaHInLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICdhcmlhLW9yaWVudGF0aW9uJzogb3JpZW50YXRpb24udmFsdWVcbiAgICB9KVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FMaXN0JyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIGJvcmRlcmVkOiBCb29sZWFuLFxuICAgIGRlbnNlOiBCb29sZWFuLFxuICAgIHNlcGFyYXRvcjogQm9vbGVhbixcbiAgICBwYWRkaW5nOiBCb29sZWFuLFxuXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnZGl2J1xuICAgIH1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtbGlzdCdcbiAgICAgICsgKHByb3BzLmJvcmRlcmVkID09PSB0cnVlID8gJyBxLWxpc3QtLWJvcmRlcmVkJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtbGlzdC0tZGVuc2UnIDogJycpXG4gICAgICArIChwcm9wcy5zZXBhcmF0b3IgPT09IHRydWUgPyAnIHEtbGlzdC0tc2VwYXJhdG9yJyA6ICcnKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWxpc3QtLWRhcmsnIDogJycpXG4gICAgICArIChwcm9wcy5wYWRkaW5nID09PSB0cnVlID8gJyBxLWxpc3QtLXBhZGRpbmcnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgocHJvcHMudGFnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBTUEsTUFBTSxXQUFXO0FBQUEsRUFDZixNQUFNO0FBQUEsRUFDTixNQUFNO0FBQUEsRUFDTixrQkFBa0I7QUFDcEI7QUFFTyxNQUFNLFVBQVU7QUFBQSxFQUNyQixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQUEsRUFDSixJQUFJO0FBQ047QUFFQSxJQUFBLGFBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtB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
