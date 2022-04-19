import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/internal/Subject';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class TalentsService {
	// apiUrl: any = 'http://localhost:2000';
	apiUrl: any = 'https://yayanoob.herokuapp.com/';
	constructor(
		private route: Router,
		private httpClient: HttpClient,
		private cookieService: CookieService
	) {}

	private tokenTimer!: any;
	isAuth: Boolean = false;
	isAuthlistener: Subject<boolean> = new Subject();
	login(body: any) {
		return this.httpClient.post(this.apiUrl + '/login', body).toPromise();
	}

	getTalents() {
		return this.httpClient.get(this.apiUrl + '').toPromise();
	}

	createTalent(body: any) {
		return this.httpClient.post(this.apiUrl + '/talent', body).toPromise();
	}

	deleteTalent(id: any) {
		return this.httpClient.delete(this.apiUrl + '/talent/' + id).toPromise();
	}

	vote(id: any, body: any) {
		return this.httpClient
			.post(this.apiUrl + '/vote/' + id, body)
			.toPromise();
	}

	logOut() {
		this.isAuth = false;
		this.cookieService.deleteAll();
		this.isAuthlistener.next(false);
		clearTimeout(this.tokenTimer);
		this.route.navigate(['/admin/login']);
	}

	setAuthTimer(duration: any) {
		setTimeout(() => {
			this.logOut();
		}, duration * 1000);
	}

	getisAuthStatus() {
		return this.isAuth;
	}
	getisAuthStatusListener() {
		return this.isAuthlistener.asObservable();
	}

	getToken() {
		return this.cookieService.get('token');
	}

	saveAuthData(token: string) {
		const now = new Date();
		const expirationDate = new Date(now.getTime() + 9 * 3600 * 1000);
		this.cookieService.set('token', token, {
			expires: expirationDate,
			secure: true,
		});
		this.cookieService.set('expirationDate', expirationDate.toISOString());
	}

	private getAuthData() {
		const token = this.cookieService.get('token');
		const expirationDate = this.cookieService.get('expirationDate');

		if (!token && !expirationDate) {
			return;
		}
		return {
			token,
			expirationDate: new Date(expirationDate),
		};
	}
	autoAuthUser() {
		const authInformation: any = this.getAuthData();
		if (Object.keys(authInformation).length === 0) {
			return;
		}
		this.isAuth = true;
		const now = new Date();
		const expiresIN =
			authInformation.expirationDate.getTime() - now.getTime();
		if (expiresIN > 0) {
			this.isAuth = true;
			this.setAuthTimer(expiresIN / 1000);
			this.isAuthlistener.next(true);
		}
	}
}
