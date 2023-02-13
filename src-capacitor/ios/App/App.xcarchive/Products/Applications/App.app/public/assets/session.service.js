import { h as http } from "./index4.js";
class SessionDataService {
  validate(id) {
    return http.post("/session", {
      sessionID: id
    });
  }
  get() {
    return http.get("/session");
  }
  delete() {
    return http.post("/sessions/logout");
  }
  getLanguages() {
    return http.get("/sessions/languages");
  }
}
var sessionAxiosService = new SessionDataService();
export { sessionAxiosService as s };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGIvc2VydmljZXMvc2Vzc2lvbi5zZXJ2aWNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0dHAgfSBmcm9tICdhcHAvc3JjL2RiL3NlcnZpY2VzL2luZGV4JztcblxuY2xhc3MgU2Vzc2lvbkRhdGFTZXJ2aWNlIHtcbiAgdmFsaWRhdGUoaWQ6IHN0cmluZykge1xuICAgIHJldHVybiBodHRwLnBvc3QoJy9zZXNzaW9uJywge1xuICAgICAgc2Vzc2lvbklEOiBpZCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCgpIHtcbiAgICByZXR1cm4gaHR0cC5nZXQoJy9zZXNzaW9uJyk7XG4gIH1cblxuICBkZWxldGUoKSB7XG4gICAgcmV0dXJuIGh0dHAucG9zdCgnL3Nlc3Npb25zL2xvZ291dCcpO1xuICB9XG5cbiAgZ2V0TGFuZ3VhZ2VzKCkge1xuICAgIHJldHVybiBodHRwLmdldCgnL3Nlc3Npb25zL2xhbmd1YWdlcycpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBTZXNzaW9uRGF0YVNlcnZpY2UoKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxtQkFBbUI7QUFBQSxFQUN2QixTQUFTLElBQVk7QUFDWixXQUFBLEtBQUssS0FBSyxZQUFZO0FBQUEsTUFDM0IsV0FBVztBQUFBLElBQUEsQ0FDWjtBQUFBLEVBQ0g7QUFBQSxFQUVBLE1BQU07QUFDRyxXQUFBLEtBQUssSUFBSSxVQUFVO0FBQUEsRUFDNUI7QUFBQSxFQUVBLFNBQVM7QUFDQSxXQUFBLEtBQUssS0FBSyxrQkFBa0I7QUFBQSxFQUNyQztBQUFBLEVBRUEsZUFBZTtBQUNOLFdBQUEsS0FBSyxJQUFJLHFCQUFxQjtBQUFBLEVBQ3ZDO0FBQ0Y7QUFFQSxJQUFlLHNCQUFBLElBQUksbUJBQW1COzsifQ==
