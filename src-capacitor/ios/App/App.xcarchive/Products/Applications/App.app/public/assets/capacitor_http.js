import { r as registerPlugin, _ as __vitePreload, b as boot } from "./index.js";
const Http = registerPlugin("Http", {
  web: () => __vitePreload(() => import("./web2.js"), true ? ["assets/web2.js","assets/index.js","assets/index.css"] : void 0).then((m) => new m.HttpWeb()),
  electron: () => __vitePreload(() => import("./web2.js"), true ? ["assets/web2.js","assets/index.js","assets/index.css"] : void 0).then((m) => new m.HttpWeb())
});
const get = async (url, headers = [], params = void 0, data = void 0) => {
  let ret = null;
  const options = {
    url,
    params,
    data,
    headers
  };
  ret = await Http.get(options);
  return ret;
};
const post = async (url, headers = [], params = void 0, data = void 0) => {
  let ret = null;
  const options = {
    url,
    params,
    data,
    headers
  };
  ret = await Http.post(options);
  return ret;
};
const put = async (url, headers = [], params = void 0, data = void 0) => {
  let ret = null;
  const options = {
    url,
    params,
    data,
    headers
  };
  ret = await Http.put(options);
  return ret;
};
const deleteRequest = async (url, headers = [], params = void 0) => {
  let ret = null;
  const options = {
    url,
    params,
    headers
  };
  ret = await Http.delete(options);
  return ret;
};
var capacitor_http = boot(async ({ app }) => {
  app.config.globalProperties.$get = get;
  app.config.globalProperties.$post = post;
  app.config.globalProperties.$put = put;
  app.config.globalProperties.$deleteRequest = deleteRequest;
});
var http = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": capacitor_http,
  get,
  post,
  put,
  deleteRequest
}, Symbol.toStringTag, { value: "Module" }));
export { http as h };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IjtBQUNBLE1BQU0sT0FBTyxlQUFlLFFBQVE7QUFBQSxFQUNoQyxLQUFLLDBCQUFNLE9BQU8sdUZBQVMsS0FBSyxPQUFLLElBQUksRUFBRSxRQUFPLENBQUU7QUFBQSxFQUNwRCxVQUFVLE1BQU0sMkJBQU8sY0FBTyx5RUFBRSxLQUFLLE9BQUssSUFBSSxFQUFFLFFBQU8sQ0FBRTtBQUM3RCxDQUFDO0FDQUQsTUFBTSxNQUFNLE9BQU8sS0FBYSxVQUF3QixDQUFJLFlBQXNCLFFBQVcsT0FBYSxXQUE0QjtBQUNwSSxNQUFJLE1BQW9CO0FBQ3hCLFFBQU0sVUFBdUI7QUFBQSxJQUMzQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBO0FBR0ksY0FBTSxLQUFLLElBQUksT0FBTztBQUNyQjtBQUNUO0FBRUEsTUFBTSxPQUFPLE9BQU8sS0FBYSxVQUF3QixDQUFJLFlBQXNCLFFBQVcsT0FBYSxXQUE0QjtBQUNySSxNQUFJLE1BQW9CO0FBQ3hCLFFBQU0sVUFBdUI7QUFBQSxJQUMzQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBO0FBRUksY0FBTSxLQUFLLEtBQUssT0FBTztBQUN0QjtBQUNUO0FBRUEsTUFBTSxNQUFNLE9BQU8sS0FBYSxVQUF3QixDQUFJLFlBQXNCLFFBQVcsT0FBYSxXQUE0QjtBQUNwSSxNQUFJLE1BQW9CO0FBQ3hCLFFBQU0sVUFBdUI7QUFBQSxJQUMzQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBO0FBRUksY0FBTSxLQUFLLElBQUksT0FBTztBQUNyQjtBQUNUO0FBRUEsTUFBTSxnQkFBZ0IsT0FBTyxLQUFhLFVBQXdCLElBQUksU0FBZSxXQUE0QjtBQUMvRyxNQUFJLE1BQW9CO0FBQ3hCLFFBQU0sVUFBdUI7QUFBQSxJQUMzQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUE7QUFFSSxjQUFNLEtBQUssT0FBTyxPQUFPO0FBQ3hCO0FBQ1Q7QUFHQSxxQkFBZSxLQUFLLE9BQVEsRUFBRSxVQUFVO0FBRWxDLGFBQU8saUJBQWlCLE9BQU87QUFDL0IsYUFBTyxpQkFBaUIsUUFBUTtBQUNoQyxhQUFPLGlCQUFpQixPQUFPO0FBQy9CLGFBQU8saUJBQWlCLGlCQUFpQjtBQUMvQyxDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9AY2FwYWNpdG9yLWNvbW11bml0eS9odHRwL2Rpc3QvZXNtL2luZGV4LmpzIiwiLi4vLi4vLi4vc3JjL2Jvb3QvY2FwYWNpdG9yX2h0dHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVnaXN0ZXJQbHVnaW4gfSBmcm9tICdAY2FwYWNpdG9yL2NvcmUnO1xuY29uc3QgSHR0cCA9IHJlZ2lzdGVyUGx1Z2luKCdIdHRwJywge1xuICAgIHdlYjogKCkgPT4gaW1wb3J0KCcuL3dlYicpLnRoZW4obSA9PiBuZXcgbS5IdHRwV2ViKCkpLFxuICAgIGVsZWN0cm9uOiAoKSA9PiBpbXBvcnQoJy4vd2ViJykudGhlbihtID0+IG5ldyBtLkh0dHBXZWIoKSksXG59KTtcbmV4cG9ydCAqIGZyb20gJy4vZGVmaW5pdGlvbnMnO1xuZXhwb3J0IHsgSHR0cCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLyplc2xpbnQgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueTogJ29mZicqL1xuaW1wb3J0IHsgYm9vdCB9IGZyb20gJ3F1YXNhci93cmFwcGVycyc7XG5pbXBvcnQgeyBIdHRwIH0gZnJvbSAnQGNhcGFjaXRvci1jb21tdW5pdHkvaHR0cCc7XG5cbmNvbnN0IGdldCA9IGFzeW5jICh1cmw6IHN0cmluZywgaGVhZGVycz86IEh0dHBIZWFkZXJzID0gW10sIHBhcmFtcz86IEh0dHBQYXJhbXMgPSB1bmRlZmluZWQsIGRhdGE/OiBhbnkgPSB1bmRlZmluZWQpOiBIdHRwUmVzcG9uc2UgPT4ge1xuICBsZXQgcmV0OiBIdHRwUmVzcG9uc2UgPSBudWxsO1xuICBjb25zdCBvcHRpb25zOiBIdHRwT3B0aW9ucyA9IHtcbiAgICB1cmw6IHVybCxcbiAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICBkYXRhOiBkYXRhLFxuICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gIH07XG4gIC8vIGNvbnNvbGUubG9nKG9wdGlvbnMpO1xuICByZXQgPSBhd2FpdCBIdHRwLmdldChvcHRpb25zKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbmNvbnN0IHBvc3QgPSBhc3luYyAodXJsOiBzdHJpbmcsIGhlYWRlcnM/OiBIdHRwSGVhZGVycyA9IFtdLCBwYXJhbXM/OiBIdHRwUGFyYW1zID0gdW5kZWZpbmVkLCBkYXRhPzogYW55ID0gdW5kZWZpbmVkKTogSHR0cFJlc3BvbnNlID0+IHtcbiAgbGV0IHJldDogSHR0cFJlc3BvbnNlID0gbnVsbDtcbiAgY29uc3Qgb3B0aW9uczogSHR0cE9wdGlvbnMgPSB7XG4gICAgdXJsOiB1cmwsXG4gICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgZGF0YTogZGF0YSxcbiAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICB9O1xuICByZXQgPSBhd2FpdCBIdHRwLnBvc3Qob3B0aW9ucyk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5jb25zdCBwdXQgPSBhc3luYyAodXJsOiBzdHJpbmcsIGhlYWRlcnM/OiBIdHRwSGVhZGVycyA9IFtdLCBwYXJhbXM/OiBIdHRwUGFyYW1zID0gdW5kZWZpbmVkLCBkYXRhPzogYW55ID0gdW5kZWZpbmVkKTogSHR0cFJlc3BvbnNlID0+IHtcbiAgbGV0IHJldDogSHR0cFJlc3BvbnNlID0gbnVsbDtcbiAgY29uc3Qgb3B0aW9uczogSHR0cE9wdGlvbnMgPSB7XG4gICAgdXJsOiB1cmwsXG4gICAgcGFyYW1zOiBwYXJhbXMsXG4gICAgZGF0YTogZGF0YSxcbiAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICB9O1xuICByZXQgPSBhd2FpdCBIdHRwLnB1dChvcHRpb25zKTtcbiAgcmV0dXJuIHJldDtcbn07XG5cbmNvbnN0IGRlbGV0ZVJlcXVlc3QgPSBhc3luYyAodXJsOiBzdHJpbmcsIGhlYWRlcnM/OiBIdHRwSGVhZGVycyA9IFtdLCBwYXJhbXM/OiBhbnkgPSB1bmRlZmluZWQpOiBIdHRwUmVzcG9uc2UgPT4ge1xuICBsZXQgcmV0OiBIdHRwUmVzcG9uc2UgPSBudWxsO1xuICBjb25zdCBvcHRpb25zOiBIdHRwT3B0aW9ucyA9IHtcbiAgICB1cmw6IHVybCxcbiAgICBwYXJhbXM6IHBhcmFtcyxcbiAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICB9O1xuICByZXQgPSBhd2FpdCBIdHRwLmRlbGV0ZShvcHRpb25zKTtcbiAgcmV0dXJuIHJldDtcbn07XG4vLyBcImFzeW5jXCIgaXMgb3B0aW9uYWw7XG4vLyBtb3JlIGluZm8gb24gcGFyYW1zOiBodHRwczovL3YyLnF1YXNhci5kZXYvcXVhc2FyLWNsaS9ib290LWZpbGVzXG5leHBvcnQgZGVmYXVsdCBib290KGFzeW5jICggeyBhcHAgfSkgPT4ge1xuICAvLyBzb21ldGhpbmcgdG8gZG9cbiAgYXBwLmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzLiRnZXQgPSBnZXQ7XG4gIGFwcC5jb25maWcuZ2xvYmFsUHJvcGVydGllcy4kcG9zdCA9IHBvc3Q7XG4gIGFwcC5jb25maWcuZ2xvYmFsUHJvcGVydGllcy4kcHV0ID0gcHV0O1xuICBhcHAuY29uZmlnLmdsb2JhbFByb3BlcnRpZXMuJGRlbGV0ZVJlcXVlc3QgPSBkZWxldGVSZXF1ZXN0O1xufSk7XG5cbmV4cG9ydCB7IGdldCwgcG9zdCwgcHV0LCBkZWxldGVSZXF1ZXN0IH07XG4iXSwiZmlsZSI6ImFzc2V0cy9jYXBhY2l0b3JfaHR0cC5qcyJ9
