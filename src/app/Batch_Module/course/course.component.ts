import { RestDataSource } from 'src/app/model/restdatasource';
import { CourseRepository } from './../../model/Repository/course.repository';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/course';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  public course: Course = new Course();
  courses?: Course[] = [];
  show: boolean = false;
  addShow: boolean = true;
  viewShow: boolean = false;

  constructor(
    private courseRepository: CourseRepository,
    private restDataSource: RestDataSource
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }
  saveCourse() {
    // location.reload()
    return this.courseRepository.saveCourse();
  }

  deleteCourse(course_id: any) {

    if (typeof course_id === 'number') {
      this.restDataSource.deleteCourse(course_id).subscribe(
        (data) => {
          console.log(data);

          Swal.fire({
            icon: 'success',
            title: 'Deleted Successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.getCourses(); // Fetch and filter the branches again
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
  
  getCourses() {
    this.restDataSource.getCourses().subscribe((data) => {
      this.courses = data;
      console.log(this.courses);
    });
  }

  //  public searchText: string = ''; // Add a property to hold the search text
  // getCourse(): Course[]{
  // this.restDataSource.getCourses().subscribe((data)=>{
  //   this.courses=data;
  // });
  //   return this.courses?.filter((course)=>
  // course.course_name?.toLowerCase().includes(this.searchText.toLowerCase())||
  // course.course_fee?.toString().includes(this.searchText)||
  // course.course_duration?.toLowerCase().includes(this.searchText.toLowerCase())
  // ) || [];
  //   }

  // searchText: string = '';
  // gettingBranchList(): Branch[] {
  //   this.branchService.getBranchList().subscribe((data) => {
  //     this.branchList = data;
  //     console.log(this.branchList);
  //   });
  //   return this.branchList?.filter((branch) =>
  //   branch.branch_id?.toString().includes(this.searchText)||
  //   branch.location?.city?.toLowerCase().includes(this.searchText.toLowerCase())||
  //     branch.branch_name?.toLowerCase().includes(this.searchText.toLowerCase())
  //   ) || [];
  // }

  hide() {
    this.show = !this.show;
    this.addShow = !this.addShow;
    this.viewShow = !this.viewShow;
  }
}
