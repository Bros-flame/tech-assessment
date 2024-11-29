import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from '../service/helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  action:string ='login'

  switchAction(){
    if(this.action ==='login')
      this.action='register';
    else
      this.action = 'login';
  }

  constructor(
    private fb: FormBuilder, private loginService:LoginService,private spinner:NgxSpinnerService,
    private router: Router,private helper:HelperService
  ) {}

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],  
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

 showBadCred:boolean = false;
 showAlreadyInUse:boolean = false;
  onSubmit() {
    this.spinner.show();
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      if(this.action === 'login'){
        this.loginService.login({username:credentials.username,password:credentials.password}).subscribe({
          next:(res:any) => {
            this.spinner.hide()
            this.helper.storeToken(res);
            this.router.navigateByUrl('/manage-task')
          },error:(error:any)=>{
            this.spinner.hide()
            this.showBadCred=true
            console.log(error)
          }
        }) 
      }else{
        this.loginService.register({username:credentials.username,password:credentials.password}).subscribe({
          next:(res:any) => {
            alert(res)
            this.spinner.hide()
            location.reload()
          },error:(error:any)=>{
            this.showAlreadyInUse=true
            this.spinner.hide()
            console.log(error)
          }
        }) 
      } 
    } else { 
      console.log('Form is invalid');
    }
  }
}
