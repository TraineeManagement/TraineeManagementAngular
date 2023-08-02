import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BatchRepository } from 'src/app/model/Repository/batch.repository';

import { Batch } from 'src/app/model/batch';
import { Branch } from 'src/app/model/branch';
import { Course } from 'src/app/model/course';
import { RestDataSource } from 'src/app/model/restdatasource';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-update-batch',
  templateUrl: './update-batch.component.html',
  styleUrls: ['./update-batch.component.css']
})
export class UpdateBatchComponent implements OnInit {
  batch?: Batch;
  courses: Course[] = [];
  branches: Branch[] = [];

  constructor(
    private service: RestDataSource,
    private route: ActivatedRoute,
    private router: Router,

  ) {}

  ngOnInit(): void {
    let batch_id = this.route.snapshot.params['batch_id'];
    this.service.getBatchById(batch_id).subscribe(data => {
      this.batch = data;
      this.initializeForm();
      this.service.getBatches();
      this.getCourses();
      this.getBranches();
    });
   
  }

  form = new FormGroup({
    batch_name: new FormControl('', [Validators.required]),
    branch: new FormControl('', [Validators.required]),
    course: new FormControl('', [Validators.required])
  });

  initializeForm() {
    this.form.patchValue({
      batch_name: this.batch?.batch_name || '',
      branch: this.batch?.branch?.branch_id || '',

      course: this.batch?.courses?.course_id || ''
    });

  }

  getCourses() {
    this.service.getCourses().subscribe(
      (courses: Course[]) => {
        this.courses = courses;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getBranches() {
    this.service.getBranches().subscribe(
      (branches: Branch[]) => {
        this.branches = branches;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  submit() {
    if (this.form.valid && this.batch) {
      const batch_id = this.batch.batch_id as number;
      const data = this.form.value;
      console.log(data);
      this.service.updateBatch(batch_id, data).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Updated Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/batchhome/batch']);
      });
    }
  }

}
