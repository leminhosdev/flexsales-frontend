import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { InitialComponent } from './views/initial/initial.component';
import { AuthguardGuard } from './security/authguard.guard';
import { ProductComponent } from './views/product/product.component';
const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent 
    },
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'initial',
      component: InitialComponent,
      canActivate: [AuthguardGuard]
    },{
      path: 'initial/product',
      component: ProductComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
