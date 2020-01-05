import { Component, OnInit } from '@angular/core';

import { Policy } from '../policy/policy';
import { PoliciesService } from './policies.service';

import * as GenderType from '../policy/Gender';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {

  policies: Policy[] = [];
  gender = GenderType.Gender;
  isLoading = true;
  displayedColumns: string[] = ['policyNumber', 'name', 'age', 'gender', 'actions'];
  constructor(private policiesService: PoliciesService) { }

  ngOnInit() {
    /*
    this.policies.push({
      'policyNumber': 1234,
      'policyHolder': {'name':'Kamlesh Patel', 'age':30, 'gender': 'Male'}
    });
    */
    this.getPolicies();
  }

  getPolicies(): void {
    this.policiesService.getPolicies()
    .subscribe(policies => {
        this.policies = policies;
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  delete(index: number, policyNumber: number){
    if(confirm("Are you sure?")){
      this.policiesService.delete(policyNumber)
        .subscribe(x => {
          console.log(x);
          // Refresh the data from server, to pickup upates done by aother users using the application
          this.getPolicies();
        });

    }

  }
}
