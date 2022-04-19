import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private cookieService: CookieService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const authToken = this.cookieService.get('token');
		const authRequest = req.clone({
			headers: req.headers.set('authorization', 'Bearer ' + authToken),
		});
		return next.handle(authRequest);
	}
}
