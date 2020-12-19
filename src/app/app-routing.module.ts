import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { EmployeesComponent } from './dashboard/employees/employees.component';
import { DocumentsComponent } from './dashboard/documents/documents.component';
import { CompaniesComponent } from './dashboard/companies/companies.component';
import { ContentComponent } from './dashboard/content/content.component';
import { PrinterAccountComponent } from './dashboard/printer-account/printer-account.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth/login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);

const routes: Routes = [
	{
		path: '',
		redirectTo: 'auth/login',
		pathMatch: 'full'
	},
	{
		path: 'auth',
		component: AuthComponent,
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectLoggedInToDashboard },
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
			},
			{
				path: 'forgot-password',
				component: ForgotPasswordComponent
				// canActivate: [ AngularFireAuthGuard ]
				// data: { authGuardPipe: redirectLoggedInToDashboard }
			},
			{
				path: 'register/:companyId/:companyName/:fullName/:email',
				component: RegisterComponent
				// canActivate: [ AngularFireAuthGuard ]
				// data: { authGuardPipe: redirectLoggedInToDashboard }
			}
		]
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AngularFireAuthGuard],
		data: { authGuardPipe: redirectUnauthorizedToLogin },
		children: [
			{
				path: '',
				component: ContentComponent
				// canActivate: [ AngularFireAuthGuard ]
				// data: { authGuardPipe: redirectLoggedInToDashboard }
			},
			{
				path: 'employees',
				component: EmployeesComponent
				// canActivate: [ AngularFireAuthGuard ]
				// data: { authGuardPipe: redirectLoggedInToDashboard }
			},
			{
				path: 'documents',
				component: DocumentsComponent
				// canActivate: [ AngularFireAuthGuard ]
				// data: { authGuardPipe: redirectLoggedInToDashboard }
			},
			{
				path: 'companies',
				component: CompaniesComponent
				// canActivate: [ AngularFireAuthGuard ]
				// data: { authGuardPipe: redirectLoggedInToDashboard }
			},
			{
				path: 'printer-account',
				component: PrinterAccountComponent
				// canActivate: [ AngularFireAuthGuard ]
				// data: { authGuardPipe: redirectLoggedInToDashboard }
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }