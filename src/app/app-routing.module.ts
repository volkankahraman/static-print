import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {
	AngularFireAuthGuard,
	hasCustomClaim,
	redirectUnauthorizedTo,
	redirectLoggedInTo
} from '@angular/fire/auth-guard';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([ 'login' ]);

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [ AngularFireAuthGuard ],
		data: { authGuardPipe: redirectUnauthorizedToLogin }
	},
	{ path: '', component: LoginComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
