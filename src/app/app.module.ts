import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import {MatTableModule} from '@angular/material/table';
import { TableComponent } from './table/table.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TokenInterceptorService } from './token-interceptor.service'
import { AuthGuard } from './auth.guard';
import { RegistrationComponent } from './registration/registration.component';
import { CreateUserComponent, CreateUserDialog } from './create-user/create-user.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import { EditUserFormComponent, EditUserDialog } from './edit-user-form/edit-user-form.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    TableComponent,
    RegistrationComponent,
    CreateUserComponent,
    AddUserFormComponent,
    CreateUserDialog,
    EditUserFormComponent,
    EditUserDialog
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule
  ],
  entryComponents: [CreateUserDialog, EditUserDialog],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
