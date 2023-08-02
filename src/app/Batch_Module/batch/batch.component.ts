import { Router } from '@angular/router';
import { BatchRepository } from './../../model/Repository/batch.repository';
import { Component, OnInit } from '@angular/core';
import { Batch } from 'src/app/model/batch';
import { Branch } from 'src/app/model/branch';
import { Course } from 'src/app/model/course';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestDataSource } from 'src/app/model/restdatasource';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css'],
})
export class BatchComponent implements OnInit {
  public batch: Batch = new Batch();
  batches: Batch[] = [];
  courses: Course[] = [];
  branches: Branch[] = [];

  show: boolean = false;
  addShow: boolean = true;

  constructor(
    private batchRepository: BatchRepository,
    private router: Router,
    private restdata: RestDataSource
  ) {}
  form = new FormGroup({
    batch_name: new FormControl('', Validators.required),
    course: new FormControl('', Validators.required),
    branch: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.getCourses();
    this.getBranches();
    this.getBatches();
  }

  getCourses() {
    this.restdata.getCourses().subscribe((data) => {
      this.courses = data;
      console.log(this.courses);
    });
  }

  getBranches() {
    //return  this.batchRepository.getBranches();

    this.restdata.getBranches().subscribe((data) => {
      this.branches = data;
      console.log(this.branches);
    });
  }
  getBatches() {
    this.restdata.getBatches().subscribe((data) => {
      this.batches = data;
      console.log(this.batches);
    });
  }

  addBatches() {
    console.log('add batch');

    if (this.form.valid) {
      const data = this.form.value;
      console.log(data);
      this.restdata.addBatch(data).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Batch Added Successfully',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.router.navigate(['/batchhome/batch']);
          location.reload();
        });
      });
    }
  }
  goBack() {
    this.router.navigate(['/batchhome/addbatch']);
  }

  deleteBatch(batch_id: any) {
    if (typeof batch_id === 'number') {
      this.restdata.deleteBatch(batch_id).subscribe(
        (data) => {
          console.log(data);

          Swal.fire({
            icon: 'success',
            title: 'Deleted Successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.getBatches(); // Fetch and filter the branches again
          });
        },
        (error) => {
          console.error('Error occurred while deleting the branch:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while deleting the branch.',
          });
        }
      );
    }
  }
  hide() {
    this.show = !this.show;
    this.addShow = !this.addShow;
  }
}
