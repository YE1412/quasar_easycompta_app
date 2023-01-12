import { http } from 'app/src/boot/axios_client';

class UploadFilesService {
  upload(file: any, onUploadProgress: any) {
    const formData = new FormData();

    formData.append('file', file);

    return http.post('users/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  }
}

export default new UploadFilesService();
