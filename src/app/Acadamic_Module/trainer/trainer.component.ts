import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CourseRepository } from 'src/app/model/Repository/course.repository';
import { RestDataSource } from 'src/app/model/restdatasource';
import { Trainer } from 'src/app/model/trainer';
import { TrainerFormComponent } from '../trainer-form/trainer-form.component';
import { Subjects } from 'src/app/model/subject';
import Swal from 'sweetalert2';
import { Trainee } from 'src/app/model/trainee';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css'],
})
export class TrainerComponent implements OnInit, AfterViewInit {
  trainers!: Trainer[];
  selectedSubject!: string;
  public subjects: Subjects[] = [];
  displayedColumns: string[] = [
    'trainer_id',
    'trainer_name',
    'trainer_age',
    'trainer_gender',
    'trainer_phonenumber',
    'triner_email',
    'address_id',
    'action',
  ];
  dataSource!: MatTableDataSource<Trainer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private courseRepository: CourseRepository,
    private dialog: MatDialog,
    private restData: RestDataSource
  ) {
    this.dataSource = new MatTableDataSource();
    this.restData.getTrainers().subscribe({
      next: (resp) => {
        console.log(resp);
        this.trainers = resp;
        this.dataSource.data = resp;
      },
    });
  }

  trainees?: Trainee[];
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getSubject();
    this.getTrainers();
    this.restData.trainerDataUpdated.subscribe(() => {
      this.refreshTrainers();
    });
    this.trainers = this.courseRepository.getTrainers();
    this.getTrainers();
  }
  refreshTrainers() {
    this.restData.getTrainers().subscribe((resp) => {
      this.trainers = resp;
      this.dataSource.data = resp;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTrainers() {
    return this.courseRepository.getTrainers();
  }

  addTrainer() {
    this.dialog.open(TrainerFormComponent);
    this.getTrainers();
  }

  // deleteTrainer(trainer: Trainer) {
  //   console.log('inside delete skill :' + trainer.trainer_id);
  //   this.courseRepository.deleteTrainerById(trainer.trainer_id as number);
  //   this.getTrainers();
  // }
  deleteTrainer(trainer: Trainer) {
    if (typeof trainer.trainer_id === 'number') {
      this.restData.deleteTrainerById(trainer.trainer_id).subscribe(
        (data) => {
          console.log(data);

          Swal.fire({
            icon: 'success',
            title: 'Deleted Successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            // Fetch and update the trainers again
            this.restData.getTrainers().subscribe((resp) => {
              this.trainers = resp;
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

  editTrainer(trainer: Trainer) {
    console.log(trainer);
    this.dialog.open(TrainerFormComponent, {
      data: trainer,
    });
    this.getTrainers();
  }

  // filterTrainersBySubject() {
  //   this.trainers = this.courseRepository
  //     .getSubjects()
  //     .filter((subject) =>
  //       subject.subject_name.includes(this.selectedSubject)
  //     )[0]?.trainer;
  //   console.log(this.trainers);
  //   console.log(this.courseRepository.getSubjects());

  //   let ids: any = this.trainers?.map((trainer) => trainer.trainer_id);
  //   console.log(ids);
  //   this.trainers = this.courseRepository
  //     .getTrainers()
  //     .filter((trainer1) => ids.indexOf(trainer1.trainer_id) != -1);
  //   console.log(this.trainers);
  //   this.dataSource = new MatTableDataSource(this.trainers);
  //   return this.trainers;
  // }
  // filterTrainersBySubject() {
  //   if (!this.selectedSubject) {
  //     // If no subject is selected, display all trainers
  //     this.dataSource.data = this.trainers;
  //   } else {
  //     // Filter trainers based on the selected subject
  //     const filteredTrainers = this.trainers.filter((trainer) =>
  //       trainer.subjects?.some(
  //         (subject) => subject.subject_name === this.selectedSubject
  //       )
  //     );
  //     this.dataSource.data = filteredTrainers;
  //   }
  // }
  // filterTraineeByBatch() {
  //   let trainerIds = this.courseRepository
  //     .getBatches()
  //     .filter((batch) =>
  //       batch.batch_name.includes(this.selectedBatch)
  //     )[0]?.trainees_ids;
  //   console.log(trainerIds);
  //   this.trainees = this.courseRepository.getTrainees().filter((trainee) => {
  //     return trainerIds.indexOf(trainee.trainee_id) != -1;
  //     console.log(trainee.trainee_id + ':' + trainerIds);
  //   });
  //   this.dataSource = new MatTableDataSource(this.trainees);
  //   console.log(this.trainees);
  // }
  filterTrainersBySubject() {
    this.trainers = this.courseRepository
      .getSubjects()
      .filter((subject) =>
        subject.subject_name.includes(this.selectedSubject)
      )[0]?.trainer;
    console.log(this.trainers);
    console.log(this.courseRepository.getSubjects());

    let ids: any = this.trainers?.map((trainer) => trainer.trainer_id) || []; // Add a nullish coalescing operator to handle undefined this.trainers
    console.log(ids);

    if (Array.isArray(this.trainers)) {
      // Check if this.trainers is an array before filtering
      this.trainers = this.courseRepository
        .getTrainers()
        .filter((trainer1) => ids.indexOf(trainer1.trainer_id) !== -1);
      console.log(this.trainers);
      this.dataSource = new MatTableDataSource(this.trainers);
    }

    return this.trainers;
  }

  getSubject() {
    this.restData.getSubjects().subscribe((data) => {
      this.subjects = data;
      console.log(this.subjects);
    });
  }
}
