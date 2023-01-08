declare class SessionDataService {
  validate(id: any): Promise<import("axios").AxiosResponse<any, any>>;
  get(): Promise<import("axios").AxiosResponse<any, any>>;
  delete(): Promise<import("axios").AxiosResponse<any, any>>;
}
declare const _default: SessionDataService;
export default _default;
