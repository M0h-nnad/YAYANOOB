import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';
import { HeroComponent } from './shared/ui/hero/hero.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './shared/ui/footer/footer.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { TalentsComponent } from './pages/talents/talents.component';
import { ModalComponent } from './shared/ui/modal/modal.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		HeroComponent,
		HomeComponent,
		FooterComponent,
		AdminComponent,
		LoginComponent,
		TalentsComponent,
		ModalComponent,
	],

	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
