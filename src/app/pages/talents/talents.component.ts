import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TalentsService } from 'src/app/services/talents.service';

@Component({
	selector: 'app-talents',
	templateUrl: './talents.component.html',
	styleUrls: ['./talents.component.css'],
})
export class TalentsComponent implements OnInit {
	talentForm!: FormGroup;
	talents!: any[];
	constructor(
		private fb: FormBuilder,
		private talentsService: TalentsService
	) {}

	ngOnInit(): void {
		this.talentsService.getTalents().then((res: any) => {
			this.talents = res.sentObject;
		});
		this.talentForm = this.fb.group({
			name: [''],
			talent: [''],
			number: [''],
		});
	}

	addTalent() {
		this.talentsService
			.createTalent(this.talentForm.value)
			.then((res: any) => {
				this.talents.push(res.sentObject);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	delete(id: any, i: any) {
		this.talentsService
			.deleteTalent(id)
			.then((res) => {
				this.talents = this.talents.filter((t) => t._id !== id);
			})
			.catch((err) => console.log(err));
	}
}
