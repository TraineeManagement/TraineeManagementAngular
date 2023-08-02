import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchHomeComponent } from './Batch_Module/batch-home/batch-home.component';
import { AppComponent } from './app.component';
import { CourseComponent } from './Batch_Module/course/course.component';
import { SubjectComponent } from './Batch_Module/subject/subject.component';
import { BatchComponent } from './Batch_Module/batch/batch.component';
import { ViewBranchesComponent } from './Administration/view-branches/view-branches.component';
import { AddBranchComponent } from './Administration/view-branches/add-branch/add-branch.component';
import { BranchViewComponent } from './Administration/view-branches/branch-view/branch-view.component';
import { ProfileComponent } from './Administration/profile/profile.component';
// import { LoginComponent } from './Admin_Module/login/login.component';
// import { AdministrationComponent } from './Administration/Administration.component';
import { TrainerComponent } from './Acadamic_Module/trainer/trainer.component';
import { TraineeComponent } from './Acadamic_Module/trainee/trainee.component';
import { TrainerFormComponent } from './Acadamic_Module/trainer-form/trainer-form.component';
import { TraineeFormComponent } from './Acadamic_Module/trainee-form/trainee-form.component';
import { UpdateBatchComponent } from './Batch_Module/batch/update-batch/update-batch.component';
import { ViewCourseComponent } from './Batch_Module/course/view-course/view-course.component';
import { AddLocationComponent } from './Administration/view-branches/add-location/add-location.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { AdministrationComponent } from './Administration/Administration.component';
import { AddCourseComponent } from './Batch_Module/course/add-course/add-course.component';
import { UpdateCourseComponent } from './Batch_Module/course/update-course/update-course.component';
import { AuthenticationComponent } from './Admin_Module/login/authentication.component';
import { DisplayBatchComponent } from './Admin_Module/login/displaybatch.component';
import { AddBatchformComponent } from './Batch_Module/batch/add-batchform/add-batchform.component';
import { RegisterComponent } from './Admin_Module/login/register.component';

const routes: Routes = [
  {
    path: 'home',
    component: AppComponent,
  },
  { path: 'sidenav', component: SidenavComponent },
  {
    path: 'batchhome',
    component: BatchHomeComponent,
    children: [
      {
        path: 'course',
        component: CourseComponent,
      },
      {
        path: 'viewcourses',
        component: CourseComponent,
      },
      {
        path: 'addcourses',
        component: AddCourseComponent,
      },
      {
        path: 'updatecourse/:course_id',
        component: UpdateCourseComponent,
      },

      {
        path: 'subject',
        component: SubjectComponent,
      },
      {
        path: 'batch',
        component: BatchComponent,
      },
      {
        path: 'addbatch',
        component: AddBatchformComponent,
      },
      {
        path: 'updatebatch/:batch_id',
        component: UpdateBatchComponent,
      },

      {
        path: 'viewsubjects',
        component: ViewCourseComponent,
      },
    ],
  },
  { path: 'app-view-Branches', component: ViewBranchesComponent },
  { path: 'app-add-branch', component: AddBranchComponent },
  { path: 'app-branch-view', component: BranchViewComponent },
  { path: 'app-profile', component: ProfileComponent },
  // {path:'login',component:LoginComponent},
  {
    path: 'authentication',
    component: AuthenticationComponent,
  },
  {
    path: 'displaybranch',
    component: DisplayBatchComponent,
  },
  {
    path: 'displaybranch/:branchId',
    component: DisplayBatchComponent,
  },
  { path: 'app-Administration', component: AdministrationComponent },
  {
    path: 'trainers',
    component: TrainerComponent,
  },
  {
    path: 'trainees',
    component: TraineeComponent,
  },
  {
    path: 'trainer-form',
    component: TrainerFormComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'trainee-form',
    component: TraineeFormComponent,
  },
  {
    path: 'login',
    component: RegisterComponent,
  },
  { path: 'app-add-location', component: AddLocationComponent },

  {
    path: '**',
    component: AuthenticationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
