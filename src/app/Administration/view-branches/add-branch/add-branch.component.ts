import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { BranchService } from 'src/app/Services/branch.service';
import { LocationService } from 'src/app/Services/location.service';
import { Branch, addBranch } from 'src/app/model/branch';
import { location } from 'src/app/model/location';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css'],
})
export class AddBranchComponent implements OnInit {
  myForm!: FormGroup;
  locations: location[] = [];
  newBranch: Branch = new Branch();
  add: addBranch = new addBranch();
  private locationAddedSubscription: Subscription | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private locationService: LocationService,
    private branchService: BranchService,
    private router: Router
  ) {
    this.locationAddedSubscription = undefined;
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      branch_name: ['', Validators.required],
      selectedLocation: [null, Validators.required],
      description: ['', Validators.required],
    });
    this.getLocations();

    this.locationAddedSubscription =
      this.locationService.locationAdded$.subscribe(() => {
        this.getLocations();
      });
  }

  getLocations(): void {
    this.locationService.getLocation().subscribe((data) => {
      this.locations = data;
      console.log(this.locations);
    });
  }
  ngOnDestroy() {
    // Don't forget to unsubscribe to avoid memory leaks.
    if (this.locationAddedSubscription) {
      this.locationAddedSubscription.unsubscribe();
    }
  }

  onSubmit() {
    let id: number | undefined;
    let name: string;
    console.log(this.myForm.value);
    id = this.myForm.value.selectedLocation;
    name = this.myForm.value.branch_name;
    console.log(id);
    console.log(name);

    this.add.branch_name = name;
    this.add.location_id = id;
    this.add.status = 'Active'; // Replace 'default_status' with your desired default value
    this.add.created_by = 'ADMIN'; // Replace 'default_created_by' with your desired default value
    this.add.updated_by = 'ADMIN'; // Replace 'default_updated_by' with your desired default value

    this.branchService.insertBranch(this.add).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Success', 'Branch Added Successfully!', 'success');
        this.myForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onReset() {
    this.myForm.reset();
  }

  convertToUpperCase(event: any) {
    const inputValue = event.target.value;
    const uppercaseValue = inputValue.toUpperCase();
    this.myForm.patchValue({ branch_name: uppercaseValue });
  }

  goBack() {
    this.router.navigate(['/app-view-Branches']);
  }
}

// openAddBranchDialog(): void {
//   this.dialog.open(AddBranchComponent);
// }
// addBranch(ngForm:NgForm){

// }

// createBranch()
// {
//     this.branchService.insertBranch(this.newBranch).subscribe((data)=>{
//         console.log('Branch created: ',this.createBranch);
//         this.newBranch=data
//     });
// }

// onSubmit()
// {
//   if(this.myForm?.valid)
//   {
//     console.log('Form submitted successfully')
//   }

// }
