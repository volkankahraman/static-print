import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './shared/services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { ContentComponent } from './dashboard/content/content.component';
import { ModalComponent } from './dashboard/modal/modal.component';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { CompaniesComponent } from './dashboard/companies/companies.component';
import { DocumentsComponent } from './dashboard/documents/documents.component';
import { EmployeesComponent } from './dashboard/employees/employees.component';
import { PrinterAccountComponent } from './dashboard/printer-account/printer-account.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { EmployeeFilterPipe } from './dashboard/employees/employee-filter.pipe';
import { DocumentFilterPipe } from './dashboard/documents/document-filter.pipe';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { PasswordStrengthMeterComponent } from './password-strength-meter/password-strength-meter.component';

@NgModule({
	declarations: [
		AppComponent,
		AuthComponent,
		LoginComponent,
		RegisterComponent,
		DashboardComponent,
		HeaderComponent,
		SidebarComponent,
		ContentComponent,
		ModalComponent,
		CompaniesComponent,
		DocumentsComponent,
		EmployeesComponent,
		PrinterAccountComponent,
		EmployeeFilterPipe,
		DocumentFilterPipe,
		ForgotPasswordComponent,
		PasswordStrengthMeterComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firbase),
		AngularFireFunctionsModule,
		AngularFireStorageModule,
		FormsModule,
		ReactiveFormsModule,
		NgxDropzoneModule,
		PasswordStrengthMeterModule
	],
	providers: [ AuthService ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
