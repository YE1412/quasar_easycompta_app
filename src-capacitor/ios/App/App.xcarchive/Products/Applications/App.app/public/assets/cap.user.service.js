import { h as http } from "./capacitor_http.js";
import "./index.js";
let base_url = "";
{
  const fullOrigin = "http://localhost:9000/dist";
  base_url = fullOrigin;
}
class UserCapService {
  getAll() {
    return http.get(`${base_url}/api/users`);
  }
  getAllDevises() {
    return http.get(`${base_url}/api/users/devises`);
  }
  getAllPrices() {
    return http.get(`${base_url}/api/users/prices`);
  }
  get(login, password) {
    return http.get(
      `${base_url}/api/users/login`,
      null,
      {
        login,
        password
      }
    );
  }
  retrieve(id) {
    return http.get(`${base_url}/api/users/retrieve/${id}`);
  }
  getTypes() {
    return http.get(`${base_url}/api/users/types`);
  }
  checkEmail(email) {
    return http.get(
      `${base_url}/api/users/email`,
      null,
      {
        login: email
      }
    );
  }
  checkLogin(login) {
    return http.get(`${base_url}/api/users/email`, null, {
      login
    });
  }
  create(data) {
    return http.post(`${base_url}/api/users`, null, null, data);
  }
  update(id, data) {
    return http.put(`${base_url}/api/users/${id}`, null, null, data);
  }
  delete(id) {
    return http.deleteRequest(`${base_url}/api/users/${id}`);
  }
  deleteAll() {
    return http.deleteRequest(`${base_url}/api/users`);
  }
  findByType(type) {
    return http.get(`${base_url}/api/users/type/${type}`);
  }
}
var cap_user_service = new UserCapService();
export { cap_user_service as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwLnVzZXIuc2VydmljZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NhcGFjaXRvci9zZXJ2aWNlL2luZGV4LnRzIiwiLi4vLi4vLi4vc3JjL2NhcGFjaXRvci9zZXJ2aWNlL2NhcC51c2VyLnNlcnZpY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgaHR0cCBmcm9tICdhcHAvc3JjL2Jvb3QvY2FwYWNpdG9yX2h0dHAnO1xuXG4vLyBjb25zb2xlLmxvZyhwcm9jZXNzLmVudik7XG4vLyBjb25zb2xlLmxvZyhpbXBvcnQubWV0YS5lbnYpO1xuXG5sZXQgYmFzZV91cmwgPSAnJztcbmlmICghaW1wb3J0Lm1ldGEuZW52LlNTUil7XG5cdGNvbnN0IGZ1bGxPcmlnaW4gPSBpbXBvcnQubWV0YS5lbnYuUFVCX0FQUF9VUkw7XG5cdC8vIGNvbnN0IG9yaWdpbiA9IGZ1bGxPcmlnaW4uc2xpY2UoMCwgZnVsbE9yaWdpbi5sYXN0SW5kZXhPZignOicpICsgMSk7XG5cdC8vIGJhc2VfdXJsID0gb3JpZ2luICsgcHJvY2Vzcy5lbnYuUE9SVF9TU1IgKyBwcm9jZXNzLmVudi5QVUJMSUNfUEFUSDtcblx0YmFzZV91cmwgPSBmdWxsT3JpZ2luO1xufVxuXG4vLyBjb25zb2xlLmxvZyhiYXNlX3VybCk7XG5cbmV4cG9ydCBkZWZhdWx0IGh0dHA7XG5leHBvcnQgeyBiYXNlX3VybCB9OyIsIi8qZXNsaW50IEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnk6ICdvZmYnKi9cbmltcG9ydCBodHRwLCB7IGJhc2VfdXJsIH0gZnJvbSAnYXBwL3NyYy9jYXBhY2l0b3Ivc2VydmljZS9pbmRleCc7XG5cbmNsYXNzIFVzZXJDYXBTZXJ2aWNlIHtcblx0Z2V0QWxsKCkge1xuXHRcdHJldHVybiBodHRwLmdldChgJHtiYXNlX3VybH0vYXBpL3VzZXJzYCk7XG5cdH1cblxuXHRnZXRBbGxEZXZpc2VzKCkge1xuICAgIFx0cmV0dXJuIGh0dHAuZ2V0KGAke2Jhc2VfdXJsfS9hcGkvdXNlcnMvZGV2aXNlc2ApO1xuIFx0fVxuXG5cdGdldEFsbFByaWNlcygpIHtcblx0XHRyZXR1cm4gaHR0cC5nZXQoYCR7YmFzZV91cmx9L2FwaS91c2Vycy9wcmljZXNgKTtcblx0fVxuXG5cdGdldChsb2dpbjogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XG5cdFx0cmV0dXJuIGh0dHAuZ2V0KGAke2Jhc2VfdXJsfS9hcGkvdXNlcnMvbG9naW5gLCBudWxsLFxuXHRcdCAge1xuXHRcdCAgICBsb2dpbjogbG9naW4sXG5cdFx0ICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcblx0XHR9KTtcblx0fVxuXG5cdHJldHJpZXZlKGlkOiBudW1iZXIpIHtcblx0XHRyZXR1cm4gaHR0cC5nZXQoYCR7YmFzZV91cmx9L2FwaS91c2Vycy9yZXRyaWV2ZS8ke2lkfWApO1xuXHR9XG5cblx0Z2V0VHlwZXMoKSB7XG5cdFx0cmV0dXJuIGh0dHAuZ2V0KGAke2Jhc2VfdXJsfS9hcGkvdXNlcnMvdHlwZXNgKTtcblx0fVxuXG5cdGNoZWNrRW1haWwoZW1haWw6IHN0cmluZykge1xuXHRcdHJldHVybiBodHRwLmdldChgJHtiYXNlX3VybH0vYXBpL3VzZXJzL2VtYWlsYCwgbnVsbCxcblx0XHQgIHtcblx0XHQgICAgbG9naW46IGVtYWlsLFxuXHRcdH0pO1xuXHR9XG5cblx0Y2hlY2tMb2dpbihsb2dpbjogc3RyaW5nKSB7XG5cdFx0cmV0dXJuIGh0dHAuZ2V0KGAke2Jhc2VfdXJsfS9hcGkvdXNlcnMvZW1haWxgLCBudWxsLCB7XG5cdCAgICBcdGxvZ2luOiBsb2dpbixcblx0ICBcdH0pO1xuXHR9XG5cblx0Y3JlYXRlKGRhdGE6IGFueSkge1xuXHRcdHJldHVybiBodHRwLnBvc3QoYCR7YmFzZV91cmx9L2FwaS91c2Vyc2AsIG51bGwsIG51bGwsIGRhdGEpO1xuXHR9XG5cblx0dXBkYXRlKGlkOiBhbnksIGRhdGE6IGFueSkge1xuXHRcdHJldHVybiBodHRwLnB1dChgJHtiYXNlX3VybH0vYXBpL3VzZXJzLyR7aWR9YCwgbnVsbCwgbnVsbCwgZGF0YSk7XG5cdH1cblxuXHRkZWxldGUoaWQ6IGFueSkge1xuXHRcdHJldHVybiBodHRwLmRlbGV0ZVJlcXVlc3QoYCR7YmFzZV91cmx9L2FwaS91c2Vycy8ke2lkfWApO1xuXHR9XG5cblx0ZGVsZXRlQWxsKCkge1xuXHRcdHJldHVybiBodHRwLmRlbGV0ZVJlcXVlc3QoYCR7YmFzZV91cmx9L2FwaS91c2Vyc2ApO1xuXHR9XG5cblx0ZmluZEJ5VHlwZSh0eXBlOiBhbnkpIHtcblx0XHRyZXR1cm4gaHR0cC5nZXQoYCR7YmFzZV91cmx9L2FwaS91c2Vycy90eXBlLyR7dHlwZX1gKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgVXNlckNhcFNlcnZpY2UoKTsiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSxJQUFJLFdBQVc7QUFDVTtBQUNsQixRQUFBLGFBQWE7QUFHUixhQUFBO0FBQ1o7QUNSQSxNQUFNLGVBQWU7QUFBQSxFQUNwQixTQUFTO0FBQ0QsV0FBQSxLQUFLLElBQUksR0FBRyxvQkFBb0I7QUFBQSxFQUN4QztBQUFBLEVBRUEsZ0JBQWdCO0FBQ0wsV0FBQSxLQUFLLElBQUksR0FBRyw0QkFBNEI7QUFBQSxFQUNsRDtBQUFBLEVBRUQsZUFBZTtBQUNQLFdBQUEsS0FBSyxJQUFJLEdBQUcsMkJBQTJCO0FBQUEsRUFDL0M7QUFBQSxFQUVBLElBQUksT0FBZSxVQUFrQjtBQUNwQyxXQUFPLEtBQUs7QUFBQSxNQUFJLEdBQUc7QUFBQSxNQUE0QjtBQUFBLE1BQzdDO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxNQUNKO0FBQUEsSUFBQTtBQUFBLEVBQ0Q7QUFBQSxFQUVBLFNBQVMsSUFBWTtBQUNwQixXQUFPLEtBQUssSUFBSSxHQUFHLCtCQUErQixJQUFJO0FBQUEsRUFDdkQ7QUFBQSxFQUVBLFdBQVc7QUFDSCxXQUFBLEtBQUssSUFBSSxHQUFHLDBCQUEwQjtBQUFBLEVBQzlDO0FBQUEsRUFFQSxXQUFXLE9BQWU7QUFDekIsV0FBTyxLQUFLO0FBQUEsTUFBSSxHQUFHO0FBQUEsTUFBNEI7QUFBQSxNQUM3QztBQUFBLFFBQ0UsT0FBTztBQUFBLE1BQ1g7QUFBQSxJQUFBO0FBQUEsRUFDRDtBQUFBLEVBRUEsV0FBVyxPQUFlO0FBQ3pCLFdBQU8sS0FBSyxJQUFJLEdBQUcsNEJBQTRCLE1BQU07QUFBQSxNQUNqRDtBQUFBLElBQUEsQ0FDRDtBQUFBLEVBQ0o7QUFBQSxFQUVBLE9BQU8sTUFBVztBQUNqQixXQUFPLEtBQUssS0FBSyxHQUFHLHNCQUFzQixNQUFNLE1BQU0sSUFBSTtBQUFBLEVBQzNEO0FBQUEsRUFFQSxPQUFPLElBQVMsTUFBVztBQUMxQixXQUFPLEtBQUssSUFBSSxHQUFHLHNCQUFzQixNQUFNLE1BQU0sTUFBTSxJQUFJO0FBQUEsRUFDaEU7QUFBQSxFQUVBLE9BQU8sSUFBUztBQUNmLFdBQU8sS0FBSyxjQUFjLEdBQUcsc0JBQXNCLElBQUk7QUFBQSxFQUN4RDtBQUFBLEVBRUEsWUFBWTtBQUNKLFdBQUEsS0FBSyxjQUFjLEdBQUcsb0JBQW9CO0FBQUEsRUFDbEQ7QUFBQSxFQUVBLFdBQVcsTUFBVztBQUNyQixXQUFPLEtBQUssSUFBSSxHQUFHLDJCQUEyQixNQUFNO0FBQUEsRUFDckQ7QUFDRDtBQUVBLElBQWUsbUJBQUEsSUFBSSxlQUFlOzsifQ==
