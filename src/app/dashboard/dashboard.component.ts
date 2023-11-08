import {Component} from '@angular/core';
import {ManagementService} from "../../services/management.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  seeOffer: any;
  publishOffer: any;
  seePublishOffer: any;
  seeOfferDetails: any;

  constructor(public ma: ManagementService, private formBuilder: FormBuilder) {
    this.publishOffer = this.formBuilder.group({
      skills: ['', Validators.required],
      constraint: ['', Validators.required],
      period: ['', Validators.required],
      notes: ['', Validators.required],
    })
  }

  formIsValid(){
    return this.publishOffer.valid;
  }

  displayOffer(){
    this.seeOffer = true;
    this.seePublishOffer = false;
  }

  displayOfferPublish(){
    this.seeOffer = false;
    this.seePublishOffer = true;
  }

  submitOffer() {
    const value = this.publishOffer.value;
    this.ma.publishOffer(value)
    this.seePublishOffer = false
  }

  displayOffeerDetails(skills: string) {
    this.seeOfferDetails = true
    this.ma.setCurrentOffer(skills)
    console.log(this.ma.currentOfferDetails)
  }
}
