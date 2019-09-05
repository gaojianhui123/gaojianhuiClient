import { Injectable} from '@angular/core';
import {
  HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpRequest,
  HttpResponse
} from '@angular/common/http';

import {Observable} from 'rxjs/index';
import {UploadXHRArgs} from 'ng-zorro-antd/upload';
import { environment } from '@env/environment';


@Injectable()
export class FileUploadService {
  constructor(private  http: HttpClient) {}

  fileUpload(item: UploadXHRArgs) {
      // 构建一个 FormData 对象，用于存储文件或其他参数
      const formData = new FormData();
      // tslint:disable-next-line:no-any
      formData.append('file', item.file as any);
      formData.append('id', '1000');
      const req = new HttpRequest('POST', environment.FILEUPLOAD_URL, formData, {
      reportProgress : true,
      withCredentials: true
    });
      // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
      return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
        if (event.total > 0) {
        // tslint:disable-next-line:no-any
          (event as any).percent = event.loaded / event.total * 100;
          }
        // 处理上传进度条，必须指定 `percent` 属性来表示进度
        item.onProgress(event, item.file);
        } else if (event instanceof HttpResponse) {
          // 处理成功,延迟处理图片显示
          setTimeout(() => {
            item.onSuccess(event.body, item.file, event);
          }, 1000);
        }
        }, (err) => {
          // 处理失败
          console.log(err);
          item.onError(err, item.file);
        });
  }

}
