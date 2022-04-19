import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TalentsComponent } from './pages/talents/talents.component';
import { TalentGuard } from './shared/interceptors/talent.guard';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{
		path: 'admin',
    component:AdminComponent,
		children: [
			{ path: 'login', component: LoginComponent },
			{ path: 'talents', component: TalentsComponent,canActivate:[TalentGuard] },
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
