import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ManageTaskComponent } from './manage-task/manage-task.component';
import { AuthGuard } from './config/authguard';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',component:ManageTaskComponent,canActivate:[AuthGuard]},
  {path:'manage-task',component:ManageTaskComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
