declare class UserDataService {
  getAll(): Promise<import('axios').AxiosResponse<any, any>>;
  getAllDevises(): Promise<import('axios').AxiosResponse<any, any>>;
  getAllPrices(): Promise<import('axios').AxiosResponse<any, any>>;
  get(
    login: string,
    password: string
  ): Promise<import('axios').AxiosResponse<any, any>>;
  checkEmail(email: string): Promise<import('axios').AxiosResponse<any, any>>;
  checkLogin(login: string): Promise<import('axios').AxiosResponse<any, any>>;
  create(data: any): Promise<import('axios').AxiosResponse<any, any>>;
  update(id: any, data: any): Promise<import('axios').AxiosResponse<any, any>>;
  delete(id: any): Promise<import('axios').AxiosResponse<any, any>>;
  deleteAll(): Promise<import('axios').AxiosResponse<any, any>>;
  findByType(type: any): Promise<import('axios').AxiosResponse<any, any>>;
}
declare const _default: UserDataService;
export default _default;
