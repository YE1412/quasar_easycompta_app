declare class InvoiceDataService {
  getAll(): Promise<import("axios").AxiosResponse<any, any>>;
  getAllSellers(): Promise<import("axios").AxiosResponse<any, any>>;
  getAllBuyers(): Promise<import("axios").AxiosResponse<any, any>>;
  getAllDevises(): Promise<import("axios").AxiosResponse<any, any>>;
  getAllOrders(): Promise<import("axios").AxiosResponse<any, any>>;
  getAllLanguages(): Promise<import("axios").AxiosResponse<any, any>>;
  getAllPayments(): Promise<import("axios").AxiosResponse<any, any>>;
  get(id: number): Promise<import("axios").AxiosResponse<any, any>>;
  getMore(ids: number[]): Promise<import("axios").AxiosResponse<any, any>>;
  create(data: any): Promise<import("axios").AxiosResponse<any, any>>;
  update(
    id: number,
    data: any
  ): Promise<import("axios").AxiosResponse<any, any>>;
  delete(id: any): Promise<import("axios").AxiosResponse<any, any>>;
  deleteAll(): Promise<import("axios").AxiosResponse<any, any>>;
}
declare const _default: InvoiceDataService;
export default _default;
