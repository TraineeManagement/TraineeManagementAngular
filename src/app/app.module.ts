import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { LoginComponent } from './Admin_Module/login/login.component';
import { BatchComponent } from './Batch_Module/batch/batch.component';
import { CourseComponent } from './Batch_Module/course/course.component';
import { SubjectComponent } from './Batch_Module/subject/subject.component';
import { TopicsComponent } from './Batch_Module/topics/topics.component';
import { BatchHomeComponent } from './Batch_Module/batch-home/batch-home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ModelModule } from './model/model.module';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';
import { AdministrationComponent } from './Administration/Administration.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewBranchesComponent } from './Administration/view-branches/view-branches.component';
import { AddBranchComponent } from './Administration/view-branches/add-branch/add-branch.component';
import { ProfileComponent } from './Administration/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TrainerRepository } from './model/Repository/trainer.repository';
import { TopicsRepository } from './model/Repository/topics.repository';
import { SubjectRepository } from './model/Repository/subject.repository';
import { RestDataSource } from './model/restdatasource';
import { CourseRepository } from './model/Repository/course.repository';
import { BranchViewComponent } from './Administration/view-branches/branch-view/branch-view.component';
import { TraineeComponent } from './Acadamic_Module/trainee/trainee.component';
import { TraineeFormComponent } from './Acadamic_Module/trainee-form/trainee-form.component';
import { TrainerComponent } from './Acadamic_Module/trainer/trainer.component';
import { TrainerFormComponent } from './Acadamic_Module/trainer-form/trainer-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UpdateBatchComponent } from './Batch_Module/batch/update-batch/update-batch.component';
import { ViewCourseComponent } from './Batch_Module/course/view-course/view-course.component';
import { AddLocationComponent } from './Administration/view-branches/add-location/add-location.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavService } from './sidenav/sidenav.service';
import { AdministartionService } from './Administration/administration.service';
import { AddCourseComponent } from './Batch_Module/course/add-course/add-course.component';
import { UpdateCourseComponent } from './Batch_Module/course/update-course/update-course.component';
import { AuthenticationComponent } from './Admin_Module/login/authentication.component';
import { AuthenticationRepository } from './model/Repository/authentication.repositary';
import { DisplayBatchComponent } from './Admin_Module/login/displaybatch.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ToastModule } from 'primeng/toast';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddBatchformComponent } from './Batch_Module/batch/add-batchform/add-batchform.component';
import { RegisterComponent } from './Admin_Module/login/register.component';
@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    BatchComponent,
    CourseComponent,
    SubjectComponent,
    TopicsComponent,
    BatchHomeComponent,
    AdministrationComponent,
    ViewBranchesComponent,
    AddBranchComponent,
    ProfileComponent,
    BranchViewComponent,
    TraineeComponent,
    TraineeFormComponent,
    TrainerComponent,
    TrainerFormComponent,
    UpdateBatchComponent,
    ViewCourseComponent,
    AddLocationComponent,
    SidenavComponent,
    AddCourseComponent,
    UpdateCourseComponent,
    DisplayBatchComponent,
    AddBatchformComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    ModelModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    ToastModule,
    MatTabsModule,
    MatSnackBarModule,
  ],
  providers: [
    CourseRepository,
    RestDataSource,
    SubjectRepository,
    TrainerRepository,
    TopicsRepository,
    SidenavService,
    AdministartionService,
    AuthenticationRepository,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
