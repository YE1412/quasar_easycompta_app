declare class ServiceDataService {
  getAll(): Promise<import("axios").AxiosResponse<any, any>>;
  get(id: number): Promise<import("axios").AxiosResponse<any, any>>;
  create(data: any): Promise<import("axios").AxiosResponse<any, any>>;
  update(
    id: number,
    data: any
  ): Promise<import("axios").AxiosResponse<any, any>>;
  delete(id: any): Promise<import("axios").AxiosResponse<any, any>>;
  deleteAll(): Promise<import("axios").AxiosResponse<any, any>>;
  findByAmountAndType(
    montantHt: any,
    type: any
  ): Promise<import("axios").AxiosResponse<any, any>>;
}
declare const _default: ServiceDataService;
export default _default;
