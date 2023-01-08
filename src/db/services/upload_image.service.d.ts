declare class UploadFilesService {
  upload(
    file: any,
    onUploadProgress: any
  ): Promise<import("axios").AxiosResponse<any, any>>;
}
declare const _default: UploadFilesService;
export default _default;
