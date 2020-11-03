import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([ 'login' ]);
const redirectLoggedInToDashboard = () => redirectLoggedInTo([ 'dashboard' ]);

const routes: Routes = [
	{
		path: '',
		component: AuthComponent,
		canActivate: [ AngularFireAuthGuard ],
		data: { authGuardPipe: redirectLoggedInToDashboard }
	},
	{
		path: 'auth',
		component: AuthComponent,
		children: [
			{
				path: 'login',
				component: LoginComponent
				// canActivate: [ AngularFireAuthGuard ]
				// data: { authGuardPipe: redirectLoggedInToDashboard }
			},
			{
				path: 'register',
				component: RegisterComponent
				// canActivate: [ AngularFireAuthGuard ]
				// data: { authGuardPipe: redirectLoggedInToDashboard }
			}
		]
	},

	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [ AngularFireAuthGuard ],
		data: { authGuardPipe: redirectUnauthorizedToLogin }
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
