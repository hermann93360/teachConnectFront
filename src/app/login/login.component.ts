import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ManagementService} from "../../services/management.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: any;

  error = false

  constructor(private formBuilder: FormBuilder, private ma: ManagementService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  submitLogin() {

    const value = this.loginForm.value
    if(this.ma.teacherLogin(
      value['login'],
      value['password']
    ).length == 0 &&
      this.ma.schoolLogin(
        value['login'],
        value['password']
      ).length == 0 ){
      this.error = true;
    }else{
      this.router.navigate(['/dashboard'])
    }

  }
}
