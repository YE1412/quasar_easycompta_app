declare class OrderDataService {
  getAll(): Promise<import("axios").AxiosResponse<any, any>>;
  get(id: number): Promise<import("axios").AxiosResponse<any, any>>;
  create(data: any): Promise<import("axios").AxiosResponse<any, any>>;
  update(
    id: number,
    data: any
  ): Promise<import("axios").AxiosResponse<any, any>>;
  delete(id: any): Promise<import("axios").AxiosResponse<any, any>>;
  deleteAll(): Promise<import("axios").AxiosResponse<any, any>>;
}
declare const _default: OrderDataService;
export default _default;
