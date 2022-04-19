import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TalentsService } from 'src/app/services/talents.service';
// import '../../assets/js/smtp.js';
// declare let Email: any;
@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
	@Input() isShown: boolean = false;
	@Output() close: EventEmitter<any> = new EventEmitter();
	modalFormGroup!: FormGroup;
	constructor(
		private fb: FormBuilder,
		private talentService: TalentsService
	) {}

	ngOnInit(): void {
		this.modalFormGroup = this.fb.group({
			email: ['', Validators.email],
		});
	}

	closeModal() {
		this.close.emit({ value: false, type: 'close' });
	}

	sendEmail() {
		localStorage.setItem('email', this.modalFormGroup.get('email')?.value);
		this.close.emit({ value: false, type: 'send' });
	}
}
