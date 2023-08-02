import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CourseRepository } from 'src/app/model/Repository/course.repository';
import { RestDataSource } from 'src/app/model/restdatasource';
import { Trainee } from 'src/app/model/trainee';
import { TraineeFormComponent } from '../trainee-form/trainee-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trainee',
  templateUrl: './trainee.component.html',
  styleUrls: ['./trainee.component.css'],
})
export class TraineeComponent implements OnInit, AfterViewInit {
  trainees: Trainee[] = [];
  selectedBatch!: string;
  displayedColumns: string[] = [
    'trainee_id',
    'trainee_name',
    'trainee_age',
    'trainee_gender',
    'trainee_phonenumber',
    'trainee_email',
    'address_id',
    'action',
  ];
  dataSource!: MatTableDataSource<Trainee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private courseRepository: CourseRepository,
    private dialog: MatDialog,
    private restData: RestDataSource
  ) {
    this.dataSource = new MatTableDataSource();
    this.restData.getTrainees().subscribe({
      next: (resp) => {
        console.log(resp);
        this.trainees = resp;
        this.dataSource.data = resp;
      },
    });
    this.restData.trainerDataUpdated.subscribe(() => {
      // This will be triggered whenever trainer data is updated
      this.refreshTrainees();
    });
    this.getTrainees();
    this.restData.traineeDataUpdated.subscribe(() => {
      this.refreshTrainees();
    });
  }
  refreshTrainees() {
    this.restData.getTrainees().subscribe((resp) => {
      this.trainees = resp;
      this.dataSource.data = resp;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.trainees = this.courseRepository.getTrainees();
    this.getTrainees();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getTrainees() {
    return this.courseRepository.getTrainees();
  }
  // refreshTrainers() {
  //   this.restData.getTrainers().subscribe((resp) => {
  //     this.trainees = resp;
  //     this.restData.data = resp;
  //   });
  // }

  addTrainee() {
    this.dialog.open(TraineeFormComponent);
  }
  // deleteTrainee(trainee: Trainee) {
  //   console.log('inside delete skill :' + trainee.trainee_id);
  //   this.courseRepository.deleteTraineeById(trainee.trainee_id).subscribe(
  //     (success) => {
  //       if (success) {
  //         // Successfully deleted the trainee
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Deleted Successfully',
  //           showConfirmButton: false,
  //           timer: 1500,
  //         }).then(() => {
  //           // Fetch and update the trainees again
  //           this.restData.getTrainees().subscribe((resp) => {
  //             this.trainees = resp;
  //             this.dataSource.data = resp; // Update the MatTable dataSource
  //           });
  //         });
  //       } else {
  //         // Error occurred while deleting the trainee
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error',
  //           text: 'An error occurred while deleting the trainee.',
  //         });
  //       }
  //     },
  //     (error: any) => {
  //       console.error('Error occurred while deleting the trainee:', error);
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         text: 'An error occurred while deleting the trainee.',
  //       });
  //     }
  //   );
  // }

  deleteTrainee(trainee: Trainee) {
    if (typeof trainee.trainee_id === 'number') {
      this.restData.deleteTraineeById(trainee.trainee_id).subscribe(
        (data) => {
          console.log(data);

          Swal.fire({
            icon: 'success',
            title: 'Deleted Successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // Fetch and update the trainers again
            this.restData.getTrainees().subscribe((resp) => {
              this.trainees = resp;
              this.dataSource.data = resp; // Update the MatTable dataSource
            });
          });
        },
        (error) => {
          console.error('Error occurred while deleting the trainer:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while deleting the trainer.',
          });
        }
      );
    }
  }

  editTrainee(trainee: Trainee) {
    console.log(trainee);
    this.dialog.open(TraineeFormComponent, {
      data: trainee,
    });
  }

  filterTraineeByBatch() {
    let trainerIds = this.courseRepository
      .getBatches()
      .filter((batch) =>
        batch.batch_name.includes(this.selectedBatch)
      )[0]?.trainees_ids;
    console.log(trainerIds);
    this.trainees = this.courseRepository.getTrainees().filter((trainee) => {
      return trainerIds.indexOf(trainee.trainee_id) != -1;
      console.log(trainee.trainee_id + ':' + trainerIds);
    });
    this.dataSource = new MatTableDataSource(this.trainees);
    console.log(this.trainees);
  }

  getBatches() {
    return this.courseRepository.getBatches();
  }


}
