import { ac as _export_sfc, $ as defineComponent, ao as useI18n, am as useRoute, o as onMounted, a6 as createElementBlock, ar as createBaseVNode, aa as toDisplayString, aq as unref, a4 as createVNode, j as QBtn, a3 as openBlock } from "./index.js";
const _hoisted_1 = { class: "fullscreen bg-blue text-white text-center q-pa-md flex flex-center" };
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { style: { "font-size": "30vh" } }, " 404 ", -1);
const _hoisted_3 = {
  class: "text-h2",
  style: { "opacity": ".4" }
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ErrorNotFound",
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    onMounted(() => {
      document.title = `Easy-Compta - ${t(route.meta.titleKey)}`;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", null, [
          _hoisted_2,
          createBaseVNode("div", _hoisted_3, toDisplayString(unref(t)("errorNotFoundComponent.text")), 1),
          createVNode(QBtn, {
            class: "q-mt-xl",
            color: "white",
            "text-color": "blue",
            unelevated: "",
            to: "/",
            label: unref(t)("errorNotFoundComponent.buttonText"),
            "no-caps": ""
          }, null, 8, ["label"])
        ])
      ]);
    };
  }
});
var ErrorNotFound = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "ErrorNotFound.vue"]]);
export { ErrorNotFound as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JOb3RGb3VuZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3BhZ2VzL0Vycm9yTm90Rm91bmQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGRpdiBjbGFzcz1cImZ1bGxzY3JlZW4gYmctYmx1ZSB0ZXh0LXdoaXRlIHRleHQtY2VudGVyIHEtcGEtbWQgZmxleCBmbGV4LWNlbnRlclwiPlxuICAgIDxkaXY+XG4gICAgICA8ZGl2IHN0eWxlPVwiZm9udC1zaXplOiAzMHZoXCI+XG4gICAgICAgIDQwNFxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWgyXCIgc3R5bGU9XCJvcGFjaXR5Oi40XCI+XG4gICAgICAgIHt7IHQoJ2Vycm9yTm90Rm91bmRDb21wb25lbnQudGV4dCcpIH19XG4gICAgICA8L2Rpdj5cblxuICAgICAgPHEtYnRuXG4gICAgICAgIGNsYXNzPVwicS1tdC14bFwiXG4gICAgICAgIGNvbG9yPVwid2hpdGVcIlxuICAgICAgICB0ZXh0LWNvbG9yPVwiYmx1ZVwiXG4gICAgICAgIHVuZWxldmF0ZWRcbiAgICAgICAgdG89XCIvXCJcbiAgICAgICAgOmxhYmVsPVwidCgnZXJyb3JOb3RGb3VuZENvbXBvbmVudC5idXR0b25UZXh0JylcIlxuICAgICAgICBuby1jYXBzXG4gICAgICAvPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBvbk1vdW50ZWQgfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgdXNlSTE4biB9IGZyb20gJ3Z1ZS1pMThuJztcbmltcG9ydCB7IHVzZVJvdXRlIH0gZnJvbSAndnVlLXJvdXRlcic7XG5cbi8vIFZBUklBQkxFU1xuY29uc3QgeyB0IH0gPSB1c2VJMThuKCk7XG5jb25zdCByb3V0ZSA9IHVzZVJvdXRlKCk7XG5cbi8vIExJRkVDWUNFIEVWRU5UU1xub25Nb3VudGVkKCgpID0+IHtcbiAgZG9jdW1lbnQudGl0bGUgPSBgRWFzeS1Db21wdGEgLSAke3Qocm91dGUubWV0YS50aXRsZUtleSl9YDtcbn0pO1xuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQThCTSxVQUFBLEVBQUUsTUFBTTtBQUNkLFVBQU0sUUFBUTtBQUdkLGNBQVUsTUFBTTtBQUNkLGVBQVMsUUFBUSxpQkFBaUIsRUFBRSxNQUFNLEtBQUssUUFBUTtBQUFBLElBQUEsQ0FDeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
