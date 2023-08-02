import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, tap } from 'rxjs';
import { CourseRepository } from 'src/app/model/Repository/course.repository';
import { RestDataSource } from 'src/app/model/restdatasource';
import { Subjects } from 'src/app/model/subject';
import { Trainer } from 'src/app/model/trainer';

@Component({
  selector: 'app-trainer-form',
  templateUrl: './trainer-form.component.html',
  styleUrls: ['./trainer-form.component.css'],
})
export class TrainerFormComponent implements OnInit {
  trainerForm!: FormGroup;
  public submitType: string = 'save';

  constructor(
    private dialogRef: MatDialogRef<TrainerFormComponent>,
    private formBuilder: FormBuilder,
    private restdatasource: RestDataSource,
    private courseRepo: CourseRepository,
    @Inject(MAT_DIALOG_DATA) private trainerData: any
  ) {}
  public subjects: Subjects[] = [];

  ngOnInit() {
    this.trainerForm = this.formBuilder.group({
      // trainer_id: ['', Validators.required],
      trainer_name: ['', Validators.required],
      trainer_age: ['', Validators.required],
      trainer_gender: ['', Validators.required],
      trainer_phonenumber: ['', Validators.required],
      triner_email: ['', [Validators.required, Validators.email]],
      address_id: this.formBuilder.group({
        // address_id: ['', Validators.required],
        door_no: ['', Validators.required],
        street: ['', Validators.required],
        locality: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pincode: ['', Validators.required],
      }),
      subjects: [[], Validators.required],
      created_by: ['sharath'], // Set default value for created_by
      updated_by: ['sharath'],
    });
    if (this.trainerData) {
      this.submitType = 'update';
      console.log(this.trainerData);

      {
        this.trainerForm.patchValue({
          // trainer_id: this.trainerData.trainer_id,
          trainer_name: this.trainerData.trainer_name,
          trainer_age: this.trainerData.trainer_age,
          trainer_gender: this.trainerData.trainer_gender,
          trainer_phonenumber: this.trainerData.trainer_phonenumber,
          triner_email: this.trainerData.triner_email,
          address_id: {
            // address_id: this.trainerData.address_id.address_id,
            door_no: this.trainerData.address_id.door_no,
            street: this.trainerData.address_id.street,
            city: this.trainerData.address_id.city,
            pincode: this.trainerData.address_id.pincode,
            locality: this.trainerData.address_id.locality,
            state: this.trainerData.address_id.state,
          },
          subjects: this.getSubjectId(),
        });
      }
    }
    this.getSubject();
  }
  getSubjectId() {
    return this.trainerData.subject.map((sub: any) => {
      return sub.subject_id;
    });
  }

  // submitTrainer(): void {
  //   // if (this.trainerForm.invalid) {
  //   //   return;
  //   // }
  //   if (this.trainerData) {
  //     this.courseRepo.updateTrainerById(
  //       this.trainerData.trainer_id,
  //       this.trainerForm.value
  //     );
  //     console.log(this.trainerForm.value);
  //   } else {
  //     console.log(this.trainerForm.value);
  //     this.courseRepo.saveTrainer(this.trainerForm.value);
  //   }

  //   // this.courseRepo.saveTrainer(this.trainerForm.value);
  //   this.dialogRef.close();
  //   this.trainerForm.reset();
  // }
  submitTrainer(): void {
    if (this.trainerForm.valid) {
      const formData = this.trainerForm.value;
      if (this.trainerData) {
        this.restdatasource
          .updateTrainer(this.trainerData.trainer_id, formData)
          .subscribe(() => {
            console.log(formData); // Log the updated trainer data
            this.dialogRef.close();
            this.resetForm();
            // Emit an event to notify the TrainerComponent that data has changed
            this.restdatasource.emitTrainerDataUpdated();
          });
      } else {
        this.restdatasource.saveTrainer(formData).subscribe(() => {
          console.log(formData); // Log the newly added trainer data
          this.dialogRef.close();
          this.resetForm();
          // Emit an event to notify the TrainerComponent that data has changed
          this.restdatasource.emitTrainerDataUpdated();
        });
      }
    }
  }

  resetForm() {
    this.trainerForm.reset(); // Reset the form
    this.trainerForm.patchValue({
      created_by: 'sharath', // Set default value for created_by after reset
      updated_by: 'sharath', // Set default value for updated_by after reset
    });
  }

  // getSubjects() {
  //   return this.courseRepo.getSubjects();
  // }
  getSubject() {
    this.restdatasource.getSubjects().subscribe((data) => {
      this.subjects = data;
      console.log(this.subjects);
    });
  }
}
