import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TalentsService } from 'src/app/services/talents.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;
	constructor(
		private talentService: TalentsService,
		private fb: FormBuilder,
		private route: Router
	) {}

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	login() {
		this.talentService
			.login(this.loginForm.value)
			.then((res: any) => {
				this.talentService.saveAuthData(res.token);
				this.route.navigate(['/admin/talents']);
			})
			.catch((err) => console.log(err));
	}
}
