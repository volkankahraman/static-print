import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './auth/register/register.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@NgModule({
	declarations: [ AppComponent, AuthComponent, LoginComponent, DashboardComponent, RegisterComponent ],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firbase),
		FormsModule,
		RouterModule
	],
	providers: [ AuthService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
