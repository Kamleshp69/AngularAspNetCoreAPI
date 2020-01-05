import { Component, OnInit } from '@angular/core';

import { Policy } from './policy';
import { PoliciesService } from '../policies/policies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  public policyForm: FormGroup;
 
  //policy: Policy = new Policy();
  action: string = '';
  
  policy = {
    policyNumber: null,
    policyHolder: {
      name: null,
      age: null,
      gender: 0
    }
  };
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private policiesService: PoliciesService
  ) {
    
      route.params.subscribe(p => {
        this.policy.policyNumber = +p['id'];
      }, err => {

      if(err.status == 404)
        this.router.navigate(['/policies']);
    });
   }

  ngOnInit() {
    this.policyForm = new FormGroup({
      policyNumber: new FormControl('', [Validators.required]),
      holderName: new FormControl('', [Validators.required]),
      holderAge: new FormControl('', [Validators.required]),
      holderGender: new FormControl('', [Validators.required])
    });    
    this.action = this.route.snapshot.data['action'];
    if(this.action == 'add') {
      this.policy = {
        policyNumber: 0,
        policyHolder: {
          name: '',
          age: null,
          gender: null
        }
      };
    }
    else {
      this.policiesService.getPolicy(this.policy.policyNumber)
      .subscribe((b: any) => {
          console.log(b);
          this.policy = b;
        //Populate reactive form controls with model object properties.
        this.policyForm.setValue({
          policyNumber: this.policy.policyNumber,
          holderName: this.policy.policyHolder.name,
          holderAge: this.policy.policyHolder.age,
          holderGender: this.policy.policyHolder.gender
        });       
      });
    }
  }

  // This function is used with mat-select control to set the display value when data is loaded
  compGender = (val1: string, val2: string) => val1 == val2;

  public hasError = (controlName: string, errorName: string) =>{
    //console.log("controlName: " + controlName);
    return this.policyForm.controls[controlName].hasError(errorName);
  }
 
  public submit = (policyFormValue) => {
    if (this.policyForm.valid) {
      this.savePolicy(policyFormValue);
    }
  }

  public savePolicy = (policyFormValue) => {
    //debugger;
    //this.policy.policyNumber = 0;
    //if(this.policy.policyNumber != 0)
    let policy: Policy = {
      policyNumber: policyFormValue.policyNumber,
      policyHolder: {
        name: policyFormValue.holderName,
        age: policyFormValue.holderAge,
        gender: policyFormValue.holderGender
      }
    };
    if(this.action == 'update')
    {
      this.policiesService.update(policy)
        .subscribe( x => 
          {
            console.log(x),
            this.router.navigate(['/policies'])
          });
    }
    else{
      this.policiesService.create(policy)
        .subscribe( x => 
          {
            console.log(x),
            this.router.navigate(['/policies'])
          });
    }
  }  

  delete(){
    if(confirm("Are you sure?")){
      this.policiesService.delete(this.policy.policyNumber)
        .subscribe(x => {
          console.log(x),
          this.router.navigate(['/policies'])
        });
    }
  }

  cancel() {
    this.router.navigate(['/policies']);
  }

}
