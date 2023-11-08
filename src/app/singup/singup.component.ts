import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatRadioChange} from "@angular/material/radio";
import {ManagementService} from "../../services/management.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent {
  signupForm: any;
  schoolSign: boolean = true;
  teacherSign: boolean = false;
   error: boolean = false;

  constructor(private formBuilder: FormBuilder, private ma: ManagementService, private router: Router) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      skills: [''],
      graduate: ['',],
      interest: [''],
      wishLevel: [''],
      email: ['', Validators.required],
      phone: [''],
      login: [''],
      website: [''],
      availability: [''],
      wishContractType: [''],
      otherDataAboutTeacher: [''],
      password: ['', Validators.required],
      references: ['']
    });
  }

  formIsValid(): boolean{
    return this.signupForm.valid;
  }

  submitSign() {
    if(!this.formIsValid()) {
      this.error = true;
    }else{
      const value = this.signupForm.value;

      if(this.schoolSign){
        this.ma.registerSchool(value);
      }

      if(this.teacherSign){
        this.ma.registerTeacher(value);
      }

      this.router.navigate(['/dashboard'])
    }
  }

  schoolSelected($event: MatRadioChange) {
    this.schoolSign = !this.schoolSign;
    this.teacherSign = false;
  }

  teacherSelected($event: MatRadioChange) {
    this.teacherSign = !this.teacherSign
    this.schoolSign = false;
  }
}
