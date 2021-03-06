import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { AuthGuard } from './auth.guard';
import { RegistrationComponent } from './registration/registration.component';
import { CreateUserComponent } from './create-user/create-user.component';


const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent
  },
  { 
    path: 'home',
    component: HomeComponent
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'table',
    component: TableComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'registration',
    component: RegistrationComponent
  },
  { 
    path: 'create',
    component: CreateUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
