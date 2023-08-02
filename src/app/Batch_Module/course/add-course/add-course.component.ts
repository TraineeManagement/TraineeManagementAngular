import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseRepository } from 'src/app/model/Repository/course.repository';
import { Course } from 'src/app/model/course';
import { RestDataSource } from 'src/app/model/restdatasource';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  public course: Course = new Course();
  courses: Course[] = [];

  //  show: boolean = false;
  //  addShow: boolean = true;
  //  viewShow: boolean = false;
  searchQuery: string = '';
  filter: any;
  tableData: any;
  row: any;

  // courses:any;
  cour: any;
  form = new FormGroup({
    course_name: new FormControl('', Validators.required),
    course_fee: new FormControl('', Validators.required),
    course_duration: new FormControl('', Validators.required),
  });

  constructor(
    private courseRepository: CourseRepository,
    private restDataSource: RestDataSource,
    private router: Router
  ) {}

  ngOnInit() {
    this.saveCourse();
  }
  saveCourse() {
    // location.reload()
    //  this.router.navigate(['/batchhome/course']);
    //    return this.courseRepository.saveCourse();
    if (this.form.valid) {
      const data = this.form.value;
      console.log(data);

      this.restDataSource.saveCourse(this.form.value).subscribe((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Course Added Successfully',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.courses.push(data);
          this.router.navigate(['/batchhome/course']);

          //location.reload();
        });
      });
    }
  }
  goBack() {
    this.router.navigate(['/batchhome/course']);
  }

  // hide(){
  //   this.show = !this.show;
  //   this.addShow=!this.addShow;
  //   this.viewShow=!this.viewShow;
  // }
}
