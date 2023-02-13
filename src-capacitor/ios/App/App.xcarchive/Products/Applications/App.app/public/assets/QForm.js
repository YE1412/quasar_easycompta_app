import { c as createComponent, f as ref, D as provide, E as onDeactivated, F as onActivated, o as onMounted, h, e as hSlot, g as getCurrentInstance, aB as vmIsDestroyed, q as stopAndPrevent, B as nextTick, aP as formKey } from "./index.js";
import { e as addFocusFn } from "./QNoSsr.js";
var QForm = createComponent({
  name: "QForm",
  props: {
    autofocus: Boolean,
    noErrorFocus: Boolean,
    noResetFocus: Boolean,
    greedy: Boolean,
    onSubmit: Function
  },
  emits: ["reset", "validationSuccess", "validationError"],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const rootRef = ref(null);
    let validateIndex = 0;
    const registeredComponents = [];
    function validate(shouldFocus) {
      const focus2 = typeof shouldFocus === "boolean" ? shouldFocus : props.noErrorFocus !== true;
      const index = ++validateIndex;
      const emitEvent = (res, ref2) => {
        emit("validation" + (res === true ? "Success" : "Error"), ref2);
      };
      const validateComponent = (comp) => {
        const valid = comp.validate();
        return typeof valid.then === "function" ? valid.then(
          (valid2) => ({ valid: valid2, comp }),
          (err) => ({ valid: false, comp, err })
        ) : Promise.resolve({ valid, comp });
      };
      const errorsPromise = props.greedy === true ? Promise.all(registeredComponents.map(validateComponent)).then((res) => res.filter((r) => r.valid !== true)) : registeredComponents.reduce(
        (acc, comp) => acc.then(() => {
          return validateComponent(comp).then((r) => {
            if (r.valid === false) {
              return Promise.reject(r);
            }
          });
        }),
        Promise.resolve()
      ).catch((error) => [error]);
      return errorsPromise.then((errors) => {
        if (errors === void 0 || errors.length === 0) {
          index === validateIndex && emitEvent(true);
          return true;
        }
        if (index === validateIndex) {
          const { comp, err } = errors[0];
          err !== void 0 && console.error(err);
          emitEvent(false, comp);
          if (focus2 === true) {
            const activeError = errors.find(({ comp: comp2 }) => typeof comp2.focus === "function" && vmIsDestroyed(comp2.$) === false);
            if (activeError !== void 0) {
              activeError.comp.focus();
            }
          }
        }
        return false;
      });
    }
    function resetValidation() {
      validateIndex++;
      registeredComponents.forEach((comp) => {
        typeof comp.resetValidation === "function" && comp.resetValidation();
      });
    }
    function submit(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      const index = validateIndex + 1;
      validate().then((val) => {
        if (index === validateIndex && val === true) {
          if (props.onSubmit !== void 0) {
            emit("submit", evt);
          } else if (evt !== void 0 && evt.target !== void 0 && typeof evt.target.submit === "function") {
            evt.target.submit();
          }
        }
      });
    }
    function reset(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      emit("reset");
      nextTick(() => {
        resetValidation();
        if (props.autofocus === true && props.noResetFocus !== true) {
          focus();
        }
      });
    }
    function focus() {
      addFocusFn(() => {
        if (rootRef.value === null) {
          return;
        }
        const target = rootRef.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || rootRef.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || rootRef.value.querySelector("[autofocus], [data-autofocus]") || Array.prototype.find.call(rootRef.value.querySelectorAll("[tabindex]"), (el) => el.tabIndex > -1);
        target !== null && target !== void 0 && target.focus({ preventScroll: true });
      });
    }
    provide(formKey, {
      bindComponent(vmProxy) {
        registeredComponents.push(vmProxy);
      },
      unbindComponent(vmProxy) {
        const index = registeredComponents.indexOf(vmProxy);
        if (index > -1) {
          registeredComponents.splice(index, 1);
        }
      }
    });
    let shouldActivate = false;
    onDeactivated(() => {
      shouldActivate = true;
    });
    onActivated(() => {
      shouldActivate === true && props.autofocus === true && focus();
    });
    onMounted(() => {
      props.autofocus === true && focus();
    });
    Object.assign(vm.proxy, {
      validate,
      resetValidation,
      submit,
      reset,
      focus,
      getValidationComponents: () => registeredComponents
    });
    return () => h("form", {
      class: "q-form",
      ref: rootRef,
      onSubmit: submit,
      onReset: reset
    }, hSlot(slots.default));
  }
});
export { QForm as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUZvcm0uanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvZm9ybS9RRm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCByZWYsIG9uQWN0aXZhdGVkLCBvbkRlYWN0aXZhdGVkLCBvbk1vdW50ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSwgbmV4dFRpY2ssIHByb3ZpZGUgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGFkZEZvY3VzRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2ZvY3VzLW1hbmFnZXIuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgZm9ybUtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcbmltcG9ydCB7IHZtSXNEZXN0cm95ZWQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3ZtLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUZvcm0nLFxuXG4gIHByb3BzOiB7XG4gICAgYXV0b2ZvY3VzOiBCb29sZWFuLFxuICAgIG5vRXJyb3JGb2N1czogQm9vbGVhbixcbiAgICBub1Jlc2V0Rm9jdXM6IEJvb2xlYW4sXG4gICAgZ3JlZWR5OiBCb29sZWFuLFxuXG4gICAgb25TdWJtaXQ6IEZ1bmN0aW9uXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3Jlc2V0JywgJ3ZhbGlkYXRpb25TdWNjZXNzJywgJ3ZhbGlkYXRpb25FcnJvcicgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG5cbiAgICBsZXQgdmFsaWRhdGVJbmRleCA9IDBcbiAgICBjb25zdCByZWdpc3RlcmVkQ29tcG9uZW50cyA9IFtdXG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZSAoc2hvdWxkRm9jdXMpIHtcbiAgICAgIGNvbnN0IGZvY3VzID0gdHlwZW9mIHNob3VsZEZvY3VzID09PSAnYm9vbGVhbidcbiAgICAgICAgPyBzaG91bGRGb2N1c1xuICAgICAgICA6IHByb3BzLm5vRXJyb3JGb2N1cyAhPT0gdHJ1ZVxuXG4gICAgICBjb25zdCBpbmRleCA9ICsrdmFsaWRhdGVJbmRleFxuXG4gICAgICBjb25zdCBlbWl0RXZlbnQgPSAocmVzLCByZWYpID0+IHtcbiAgICAgICAgZW1pdCgndmFsaWRhdGlvbicgKyAocmVzID09PSB0cnVlID8gJ1N1Y2Nlc3MnIDogJ0Vycm9yJyksIHJlZilcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsaWRhdGVDb21wb25lbnQgPSBjb21wID0+IHtcbiAgICAgICAgY29uc3QgdmFsaWQgPSBjb21wLnZhbGlkYXRlKClcblxuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbGlkLnRoZW4gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICA/IHZhbGlkLnRoZW4oXG4gICAgICAgICAgICB2YWxpZCA9PiAoeyB2YWxpZCwgY29tcCB9KSxcbiAgICAgICAgICAgIGVyciA9PiAoeyB2YWxpZDogZmFsc2UsIGNvbXAsIGVyciB9KVxuICAgICAgICAgIClcbiAgICAgICAgICA6IFByb21pc2UucmVzb2x2ZSh7IHZhbGlkLCBjb21wIH0pXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVycm9yc1Byb21pc2UgPSBwcm9wcy5ncmVlZHkgPT09IHRydWVcbiAgICAgICAgPyBQcm9taXNlXG4gICAgICAgICAgLmFsbChyZWdpc3RlcmVkQ29tcG9uZW50cy5tYXAodmFsaWRhdGVDb21wb25lbnQpKVxuICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZmlsdGVyKHIgPT4gci52YWxpZCAhPT0gdHJ1ZSkpXG4gICAgICAgIDogcmVnaXN0ZXJlZENvbXBvbmVudHNcbiAgICAgICAgICAucmVkdWNlKFxuICAgICAgICAgICAgKGFjYywgY29tcCkgPT4gYWNjLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdmFsaWRhdGVDb21wb25lbnQoY29tcCkudGhlbihyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoci52YWxpZCA9PT0gZmFsc2UpIHsgcmV0dXJuIFByb21pc2UucmVqZWN0KHIpIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICApXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IFsgZXJyb3IgXSlcblxuICAgICAgcmV0dXJuIGVycm9yc1Byb21pc2UudGhlbihlcnJvcnMgPT4ge1xuICAgICAgICBpZiAoZXJyb3JzID09PSB2b2lkIDAgfHwgZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGluZGV4ID09PSB2YWxpZGF0ZUluZGV4ICYmIGVtaXRFdmVudCh0cnVlKVxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBub3Qgb3V0ZGF0ZWQgYWxyZWFkeVxuICAgICAgICBpZiAoaW5kZXggPT09IHZhbGlkYXRlSW5kZXgpIHtcbiAgICAgICAgICBjb25zdCB7IGNvbXAsIGVyciB9ID0gZXJyb3JzWyAwIF1cblxuICAgICAgICAgIGVyciAhPT0gdm9pZCAwICYmIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICAgIGVtaXRFdmVudChmYWxzZSwgY29tcClcblxuICAgICAgICAgIGlmIChmb2N1cyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgLy8gVHJ5IHRvIGZvY3VzIGZpcnN0IG1vdW50ZWQgYW5kIGFjdGl2ZSBjb21wb25lbnRcbiAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUVycm9yID0gZXJyb3JzLmZpbmQoKHsgY29tcCB9KSA9PiAoXG4gICAgICAgICAgICAgIHR5cGVvZiBjb21wLmZvY3VzID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICYmIHZtSXNEZXN0cm95ZWQoY29tcC4kKSA9PT0gZmFsc2VcbiAgICAgICAgICAgICkpXG5cbiAgICAgICAgICAgIGlmIChhY3RpdmVFcnJvciAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIGFjdGl2ZUVycm9yLmNvbXAuZm9jdXMoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldFZhbGlkYXRpb24gKCkge1xuICAgICAgdmFsaWRhdGVJbmRleCsrXG5cbiAgICAgIHJlZ2lzdGVyZWRDb21wb25lbnRzLmZvckVhY2goY29tcCA9PiB7XG4gICAgICAgIHR5cGVvZiBjb21wLnJlc2V0VmFsaWRhdGlvbiA9PT0gJ2Z1bmN0aW9uJyAmJiBjb21wLnJlc2V0VmFsaWRhdGlvbigpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN1Ym1pdCAoZXZ0KSB7XG4gICAgICBldnQgIT09IHZvaWQgMCAmJiBzdG9wQW5kUHJldmVudChldnQpXG5cbiAgICAgIGNvbnN0IGluZGV4ID0gdmFsaWRhdGVJbmRleCArIDFcblxuICAgICAgdmFsaWRhdGUoKS50aGVuKHZhbCA9PiB7XG4gICAgICAgIC8vIGlmIG5vdCBvdXRkYXRlZCAmJiB2YWxpZGF0aW9uIHN1Y2NlZWRlZFxuICAgICAgICBpZiAoaW5kZXggPT09IHZhbGlkYXRlSW5kZXggJiYgdmFsID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHByb3BzLm9uU3VibWl0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGVtaXQoJ3N1Ym1pdCcsIGV2dClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoZXZ0ICE9PSB2b2lkIDAgJiYgZXZ0LnRhcmdldCAhPT0gdm9pZCAwICYmIHR5cGVvZiBldnQudGFyZ2V0LnN1Ym1pdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXZ0LnRhcmdldC5zdWJtaXQoKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldCAoZXZ0KSB7XG4gICAgICBldnQgIT09IHZvaWQgMCAmJiBzdG9wQW5kUHJldmVudChldnQpXG5cbiAgICAgIGVtaXQoJ3Jlc2V0JylcblxuICAgICAgbmV4dFRpY2soKCkgPT4geyAvLyBhbGxvdyB1c2VybGFuZCB0byByZXNldCB2YWx1ZXMgYmVmb3JlXG4gICAgICAgIHJlc2V0VmFsaWRhdGlvbigpXG4gICAgICAgIGlmIChwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgJiYgcHJvcHMubm9SZXNldEZvY3VzICE9PSB0cnVlKSB7XG4gICAgICAgICAgZm9jdXMoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZvY3VzICgpIHtcbiAgICAgIGFkZEZvY3VzRm4oKCkgPT4ge1xuICAgICAgICBpZiAocm9vdFJlZi52YWx1ZSA9PT0gbnVsbCkgeyByZXR1cm4gfVxuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHJvb3RSZWYudmFsdWUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c11bdGFiaW5kZXhdLCBbZGF0YS1hdXRvZm9jdXNdW3RhYmluZGV4XScpXG4gICAgICAgICAgfHwgcm9vdFJlZi52YWx1ZS5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXSBbdGFiaW5kZXhdLCBbZGF0YS1hdXRvZm9jdXNdIFt0YWJpbmRleF0nKVxuICAgICAgICAgIHx8IHJvb3RSZWYudmFsdWUucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10sIFtkYXRhLWF1dG9mb2N1c10nKVxuICAgICAgICAgIHx8IEFycmF5LnByb3RvdHlwZS5maW5kLmNhbGwocm9vdFJlZi52YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdbdGFiaW5kZXhdJyksIGVsID0+IGVsLnRhYkluZGV4ID4gLTEpXG5cbiAgICAgICAgdGFyZ2V0ICE9PSBudWxsICYmIHRhcmdldCAhPT0gdm9pZCAwICYmIHRhcmdldC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJvdmlkZShmb3JtS2V5LCB7XG4gICAgICBiaW5kQ29tcG9uZW50ICh2bVByb3h5KSB7XG4gICAgICAgIHJlZ2lzdGVyZWRDb21wb25lbnRzLnB1c2godm1Qcm94eSlcbiAgICAgIH0sXG5cbiAgICAgIHVuYmluZENvbXBvbmVudCAodm1Qcm94eSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHJlZ2lzdGVyZWRDb21wb25lbnRzLmluZGV4T2Yodm1Qcm94eSlcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICByZWdpc3RlcmVkQ29tcG9uZW50cy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbGV0IHNob3VsZEFjdGl2YXRlID0gZmFsc2VcblxuICAgIG9uRGVhY3RpdmF0ZWQoKCkgPT4ge1xuICAgICAgc2hvdWxkQWN0aXZhdGUgPSB0cnVlXG4gICAgfSlcblxuICAgIG9uQWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIHNob3VsZEFjdGl2YXRlID09PSB0cnVlICYmIHByb3BzLmF1dG9mb2N1cyA9PT0gdHJ1ZSAmJiBmb2N1cygpXG4gICAgfSlcblxuICAgIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgICBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgJiYgZm9jdXMoKVxuICAgIH0pXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHZtLnByb3h5LCB7XG4gICAgICB2YWxpZGF0ZSxcbiAgICAgIHJlc2V0VmFsaWRhdGlvbixcbiAgICAgIHN1Ym1pdCxcbiAgICAgIHJlc2V0LFxuICAgICAgZm9jdXMsXG4gICAgICBnZXRWYWxpZGF0aW9uQ29tcG9uZW50czogKCkgPT4gcmVnaXN0ZXJlZENvbXBvbmVudHNcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2Zvcm0nLCB7XG4gICAgICBjbGFzczogJ3EtZm9ybScsXG4gICAgICByZWY6IHJvb3RSZWYsXG4gICAgICBvblN1Ym1pdDogc3VibWl0LFxuICAgICAgb25SZXNldDogcmVzZXRcbiAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiJdLCJuYW1lcyI6WyJmb2N1cyIsInJlZiIsInZhbGlkIiwiY29tcCJdLCJtYXBwaW5ncyI6Ijs7QUFTQSxJQUFBLFFBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsV0FBVztBQUFBLElBQ1gsY0FBYztBQUFBLElBQ2QsY0FBYztBQUFBLElBQ2QsUUFBUTtBQUFBLElBRVIsVUFBVTtBQUFBLEVBQ1g7QUFBQSxFQUVELE9BQU8sQ0FBRSxTQUFTLHFCQUFxQixpQkFBbUI7QUFBQSxFQUUxRCxNQUFPLE9BQU8sRUFBRSxPQUFPLEtBQUksR0FBSTtBQUM3QixVQUFNLEtBQUssbUJBQW9CO0FBQy9CLFVBQU0sVUFBVSxJQUFJLElBQUk7QUFFeEIsUUFBSSxnQkFBZ0I7QUFDcEIsVUFBTSx1QkFBdUIsQ0FBRTtBQUUvQixhQUFTLFNBQVUsYUFBYTtBQUM5QixZQUFNQSxTQUFRLE9BQU8sZ0JBQWdCLFlBQ2pDLGNBQ0EsTUFBTSxpQkFBaUI7QUFFM0IsWUFBTSxRQUFRLEVBQUU7QUFFaEIsWUFBTSxZQUFZLENBQUMsS0FBS0MsU0FBUTtBQUM5QixhQUFLLGdCQUFnQixRQUFRLE9BQU8sWUFBWSxVQUFVQSxJQUFHO0FBQUEsTUFDOUQ7QUFFRCxZQUFNLG9CQUFvQixVQUFRO0FBQ2hDLGNBQU0sUUFBUSxLQUFLLFNBQVU7QUFFN0IsZUFBTyxPQUFPLE1BQU0sU0FBUyxhQUN6QixNQUFNO0FBQUEsVUFDTixDQUFBQyxZQUFVLEVBQUUsT0FBQUEsUUFBTztVQUNuQixVQUFRLEVBQUUsT0FBTyxPQUFPLE1BQU0sSUFBRztBQUFBLFFBQ2xDLElBQ0MsUUFBUSxRQUFRLEVBQUUsT0FBTyxLQUFJLENBQUU7QUFBQSxNQUNwQztBQUVELFlBQU0sZ0JBQWdCLE1BQU0sV0FBVyxPQUNuQyxRQUNDLElBQUkscUJBQXFCLElBQUksaUJBQWlCLENBQUMsRUFDL0MsS0FBSyxTQUFPLElBQUksT0FBTyxPQUFLLEVBQUUsVUFBVSxJQUFJLENBQUMsSUFDOUMscUJBQ0M7QUFBQSxRQUNDLENBQUMsS0FBSyxTQUFTLElBQUksS0FBSyxNQUFNO0FBQzVCLGlCQUFPLGtCQUFrQixJQUFJLEVBQUUsS0FBSyxPQUFLO0FBQ3ZDLGdCQUFJLEVBQUUsVUFBVSxPQUFPO0FBQUUscUJBQU8sUUFBUSxPQUFPLENBQUM7QUFBQSxZQUFHO0FBQUEsVUFDbkUsQ0FBZTtBQUFBLFFBQ2YsQ0FBYTtBQUFBLFFBQ0QsUUFBUSxRQUFTO0FBQUEsTUFDbEIsRUFDQSxNQUFNLFdBQVMsQ0FBRSxNQUFPO0FBRTdCLGFBQU8sY0FBYyxLQUFLLFlBQVU7QUFDbEMsWUFBSSxXQUFXLFVBQVUsT0FBTyxXQUFXLEdBQUc7QUFDNUMsb0JBQVUsaUJBQWlCLFVBQVUsSUFBSTtBQUN6QyxpQkFBTztBQUFBLFFBQ1I7QUFHRCxZQUFJLFVBQVUsZUFBZTtBQUMzQixnQkFBTSxFQUFFLE1BQU0sUUFBUSxPQUFRO0FBRTlCLGtCQUFRLFVBQVUsUUFBUSxNQUFNLEdBQUc7QUFDbkMsb0JBQVUsT0FBTyxJQUFJO0FBRXJCLGNBQUlGLFdBQVUsTUFBTTtBQUVsQixrQkFBTSxjQUFjLE9BQU8sS0FBSyxDQUFDLEVBQUUsTUFBQUcsTUFBTSxNQUN2QyxPQUFPQSxNQUFLLFVBQVUsY0FDbkIsY0FBY0EsTUFBSyxDQUFDLE1BQU0sS0FDOUI7QUFFRCxnQkFBSSxnQkFBZ0IsUUFBUTtBQUMxQiwwQkFBWSxLQUFLLE1BQU87QUFBQSxZQUN6QjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBRUQsZUFBTztBQUFBLE1BQ2YsQ0FBTztBQUFBLElBQ0Y7QUFFRCxhQUFTLGtCQUFtQjtBQUMxQjtBQUVBLDJCQUFxQixRQUFRLFVBQVE7QUFDbkMsZUFBTyxLQUFLLG9CQUFvQixjQUFjLEtBQUssZ0JBQWlCO0FBQUEsTUFDNUUsQ0FBTztBQUFBLElBQ0Y7QUFFRCxhQUFTLE9BQVEsS0FBSztBQUNwQixjQUFRLFVBQVUsZUFBZSxHQUFHO0FBRXBDLFlBQU0sUUFBUSxnQkFBZ0I7QUFFOUIsZUFBVSxFQUFDLEtBQUssU0FBTztBQUVyQixZQUFJLFVBQVUsaUJBQWlCLFFBQVEsTUFBTTtBQUMzQyxjQUFJLE1BQU0sYUFBYSxRQUFRO0FBQzdCLGlCQUFLLFVBQVUsR0FBRztBQUFBLFVBQ25CLFdBQ1EsUUFBUSxVQUFVLElBQUksV0FBVyxVQUFVLE9BQU8sSUFBSSxPQUFPLFdBQVcsWUFBWTtBQUMzRixnQkFBSSxPQUFPLE9BQVE7QUFBQSxVQUNwQjtBQUFBLFFBQ0Y7QUFBQSxNQUNULENBQU87QUFBQSxJQUNGO0FBRUQsYUFBUyxNQUFPLEtBQUs7QUFDbkIsY0FBUSxVQUFVLGVBQWUsR0FBRztBQUVwQyxXQUFLLE9BQU87QUFFWixlQUFTLE1BQU07QUFDYix3QkFBaUI7QUFDakIsWUFBSSxNQUFNLGNBQWMsUUFBUSxNQUFNLGlCQUFpQixNQUFNO0FBQzNELGdCQUFPO0FBQUEsUUFDUjtBQUFBLE1BQ1QsQ0FBTztBQUFBLElBQ0Y7QUFFRCxhQUFTLFFBQVM7QUFDaEIsaUJBQVcsTUFBTTtBQUNmLFlBQUksUUFBUSxVQUFVLE1BQU07QUFBRTtBQUFBLFFBQVE7QUFFdEMsY0FBTSxTQUFTLFFBQVEsTUFBTSxjQUFjLG1EQUFtRCxLQUN6RixRQUFRLE1BQU0sY0FBYyxxREFBcUQsS0FDakYsUUFBUSxNQUFNLGNBQWMsK0JBQStCLEtBQzNELE1BQU0sVUFBVSxLQUFLLEtBQUssUUFBUSxNQUFNLGlCQUFpQixZQUFZLEdBQUcsUUFBTSxHQUFHLFdBQVcsRUFBRTtBQUVuRyxtQkFBVyxRQUFRLFdBQVcsVUFBVSxPQUFPLE1BQU0sRUFBRSxlQUFlLE1BQU07QUFBQSxNQUNwRixDQUFPO0FBQUEsSUFDRjtBQUVELFlBQVEsU0FBUztBQUFBLE1BQ2YsY0FBZSxTQUFTO0FBQ3RCLDZCQUFxQixLQUFLLE9BQU87QUFBQSxNQUNsQztBQUFBLE1BRUQsZ0JBQWlCLFNBQVM7QUFDeEIsY0FBTSxRQUFRLHFCQUFxQixRQUFRLE9BQU87QUFDbEQsWUFBSSxRQUFRLElBQUk7QUFDZCwrQkFBcUIsT0FBTyxPQUFPLENBQUM7QUFBQSxRQUNyQztBQUFBLE1BQ0Y7QUFBQSxJQUNQLENBQUs7QUFFRCxRQUFJLGlCQUFpQjtBQUVyQixrQkFBYyxNQUFNO0FBQ2xCLHVCQUFpQjtBQUFBLElBQ3ZCLENBQUs7QUFFRCxnQkFBWSxNQUFNO0FBQ2hCLHlCQUFtQixRQUFRLE1BQU0sY0FBYyxRQUFRLE1BQU87QUFBQSxJQUNwRSxDQUFLO0FBRUQsY0FBVSxNQUFNO0FBQ2QsWUFBTSxjQUFjLFFBQVEsTUFBTztBQUFBLElBQ3pDLENBQUs7QUFHRCxXQUFPLE9BQU8sR0FBRyxPQUFPO0FBQUEsTUFDdEI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSx5QkFBeUIsTUFBTTtBQUFBLElBQ3JDLENBQUs7QUFFRCxXQUFPLE1BQU0sRUFBRSxRQUFRO0FBQUEsTUFDckIsT0FBTztBQUFBLE1BQ1AsS0FBSztBQUFBLE1BQ0wsVUFBVTtBQUFBLE1BQ1YsU0FBUztBQUFBLElBQ2YsR0FBTyxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsRUFDeEI7QUFDSCxDQUFDOzsifQ==
