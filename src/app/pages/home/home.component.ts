import { Component, OnInit } from '@angular/core';
import { TalentsService } from 'src/app/services/talents.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	isShown: boolean = false;
	id!: String;
	talents!: [any];
	type!: any;
  index!:any;
	constructor(private talentsService: TalentsService) {}

	ngOnInit(): void {
		this.talentsService
			.getTalents()
			.then((res: any) => {
				this.talents = res.sentObject;
			})
			.catch((err) => console.log(err));
	}

	vote(id: any, type: any,i:any) {
		this.id = id;
		this.type = type;
		const email = localStorage.getItem('email');
    this.index = i;
		if (email) {
			this.isShown = false;
			this.close({ value: this.isShown, type: 'send' });
		} else {
			this.isShown = true;
		}
	}

	async close(event: any) {
		this.isShown = event.value;
		if (event.type === 'close') {
			return;
		} else {
			const email = localStorage.getItem('email');
			try {
				const res:any = await this.talentsService.vote(this.id, {
					email,
					type: this.type,
				});
        this.talents[this.index].voteNumbers = res.number;
      } catch (err) {
				alert(err);
				console.log(err);
			}
		}
	}
}
