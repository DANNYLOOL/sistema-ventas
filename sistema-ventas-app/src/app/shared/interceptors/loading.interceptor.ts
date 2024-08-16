import { HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, Observable } from 'rxjs';

var countRequest = 0;

export function LoadingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  countRequest++;
  const spinner = inject(NgxSpinnerService);

  return next(req).pipe(finalize(() => {
    countRequest--;
    if(!countRequest) {
      spinner.hide();
    }
  }));

  spinner.show();

  return next(req);
}
// @Injectable({ providedIn: 'root' })
// export class LoadingInterceptor implements HttpInterceptor {
//   private countRequest = 0;

//   constructor(private spinner: NgxSpinnerService) {}

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     this.spinner.show();
//     console.log('Loading::Interceptor');

//     this.countRequest++;

//     return next.handle(req).pipe(
//       finalize(() => {
//         this.countRequest--;
//         if (!this.countRequest) {
//           this.spinner.hide();
//         }
//       })
//     );
//   }
// }