import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CourseRepository } from 'src/app/model/Repository/course.repository';
import { RestDataSource } from 'src/app/model/restdatasource';
import { Trainee } from 'src/app/model/trainee';

@Component({
  selector: 'app-trainee-form',
  templateUrl: './trainee-form.component.html',
  styleUrls: ['./trainee-form.component.css'],
})
export class TraineeFormComponent implements OnInit {
  traineeForm!: FormGroup;
  public submitType: string = 'save';

  constructor(
    private dialogRef: MatDialogRef<TraineeFormComponent>,
    private formBuilder: FormBuilder,
    private courseRepo: CourseRepository,
    private route: Router,
    private restdatasource: RestDataSource,
    @Inject(MAT_DIALOG_DATA) private traineeData: any
  ) {
    //  this.restdatasource.traineeDataUpdated.subscribe(() => {
    //    // This will be triggered whenever trainee data is updated
    //    this.refreshTrainees();
    //  });
  }

  ngOnInit() {
    this.getBatches();
    this.traineeForm = this.formBuilder.group({
      trainee_id: ['', Validators.required],
      trainee_name: ['', Validators.required],
      trainee_age: ['', Validators.required],
      trainee_gender: ['', Validators.required],
      trainee_phonenumber: ['', Validators.required],
      trainee_email: ['', [Validators.required, Validators.email]],
      address_id: this.formBuilder.group({
        address_id: ['', Validators.required],
        door_no: ['', Validators.required],
        street: ['', Validators.required],
        locality: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pincode: ['', Validators.required],
      }),
      batch_id: ['', Validators.required],
    });
    if (this.traineeData) {
      this.submitType = 'update';
      console.log(this.traineeData);

      {
        this.traineeForm.patchValue({
          trainee_id: this.traineeData.trainee_id,
          trainee_name: this.traineeData.trainee_name,
          trainee_age: this.traineeData.trainee_age,
          trainee_gender: this.traineeData.trainee_gender,
          trainee_phonenumber: this.traineeData.trainee_phonenumber,
          trainee_email: this.traineeData.trainee_email,
          address_id: {
            address_id: this.traineeData.address_id.address_id,
            door_no: this.traineeData.address_id.door_no,
            street: this.traineeData.address_id.street,
            city: this.traineeData.address_id.city,
            pincode: this.traineeData.address_id.pincode,
            locality: this.traineeData.address_id.locality,
            state: this.traineeData.address_id.state,
          },
          batch_id: this.traineeData.batches.batch_id,
        });
      }
    }
  }

  // submitTrainee(): void {
  //   // if (this.traineeForm.invalid) {
  //   //   return;
  //   // }
  //   if(this.traineeData){
  //     console.log(this.traineeData.batch_id)
  //     this.courseRepo.updateTraineeById(this.traineeData.trainee_id,this.traineeForm.value);
  //   }
  //   else{
  //     this.courseRepo.saveTrainee(this.traineeForm.value);
  //  }
  //   // this.courseRepo.saveTrainee(this.traineeForm.value);
  //   this.dialogRef.close();
  //   this.traineeForm.reset();
  //   this.route.navigateByUrl('/trainees')
  // }

  // submitTrainee(): void {
  //   if (this.traineeForm.valid) {
  //     const formData = this.traineeForm.value;
  //     if (this.traineeData) {
  //       this.restdatasource
  //         .updateTrainee(this.traineeData.trainee_id, formData)
  //         .subscribe(() => {
  //           console.log(formData); // Log the updated trainer data
  //           this.dialogRef.close();
  //           this.resetForm();
  //           // Emit an event to notify the TrainerComponent that data has changed
  //           this.restdatasource.emitTraineeDataUpdated();
  //         });
  //       console.log(this.traineeData);
  //     } else {
  //       this.restdatasource.saveTrainee(formData).subscribe(() => {
  //         console.log(formData); // Log the newly added trainer data
  //         this.dialogRef.close();
  //         this.resetForm();
  //         // Emit an event to notify the TrainerComponent that data has changed
  //         this.restdatasource.emitTraineeDataUpdated();
  //       });
  //     }
  //   }
  // }
  resetForm() {
    this.traineeForm.reset(); // Reset the form
  }

  getBatches() {
    return this.courseRepo.getBatches();
  }
  submitTrainee(): void {
    // if (this.traineeForm.invalid) {
    //   return;
    // }
    if (this.traineeData) {
      console.log(this.traineeData.batch_id);
      this.courseRepo.updateTraineeById(
        this.traineeData.trainee_id,
        this.traineeForm.value
      );
    } else {
      console.log(this.traineeForm.value)
      this.courseRepo.saveTrainee(this.traineeForm.value);
    }
    // this.courseRepo.saveTrainee(this.traineeForm.value);
    this.dialogRef.close();
    this.traineeForm.reset();
    this.route.navigateByUrl('/trainees');
  }
}
