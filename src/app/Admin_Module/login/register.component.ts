import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationRepository } from 'src/app/model/Repository/authentication.repositary';
import { Batch } from 'src/app/model/batch';
import { Branch } from 'src/app/model/branch';
import { RestDataSource } from 'src/app/model/restdatasource';
import { HttpClient } from '@angular/common/http';

import {
  FormBuilder,
  FormControl,
  // FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
// import { AuthenticationRepository } from 'src/app/model/Repository/authentication.repositary';

import { conditionalRequired } from 'src/app/validators';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private restdatasource: RestDataSource,
    private router: Router,
    private route: ActivatedRoute, // Add ActivatedRoute here
    public authrepo: AuthenticationRepository,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private messageService: MessageService
  ) {}
  hidePassword: boolean = true;
  loginFormVisible = true;
  submitted = false;
  // loginForm!: FormGroup;
  RegistrationForm!: FormGroup;
  apiResponse: any;
  public branches: Branch[] = [];
  public batches: Batch | any;
  roles: string[] = ['Admin', 'User'];
  branch: Branch | undefined;
  ngOnInit(): void {
    this.gettingBranchList();
  }

  credentials = {
    email: '',
    password: '',
  };

  user = {
    email: '',
    password: '',
    phone_number: '',
    role: '',
    first_name: '',
    branch_id: '',
    last_name: '',
  };

  gettingBatchList(branchId: number) {
    this.authrepo.getBranches().subscribe((branches) => {
      const branch = branches.find((b) => b.branch_id === branchId);
      if (branch) {
        this.batches = branch.batches || [];
        console.log(this.batches);
      }
    });
  }

  gettingBranchList() {
    this.authrepo.getBranches().subscribe((branch) => {
      this.branches = branch;
      console.log(this.branches);
    });
  }
  onRoleChange() {
    if (this.user.role === 'Admin') {
      this.registerForm.get('branch_id')?.disable(); // Disable the branch_id control when role is Admin
      this.registerForm.get('branch_id')?.setValue(''); // Clear the value of branch_id control
    }
  }
  registerForm = this.formBuilder.group({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{6,}$'
      ),
    ]),
    phone_number: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}'),
    ]),
    role: new FormControl('', [Validators.required]),
    branch_id: new FormControl('', [
      conditionalRequired(true), // Apply conditional required validation
    ]),
    status: new FormControl('active'),
  });

  get first_name() {
    return this.registerForm.get('first_name');
  }

  get last_name() {
    return this.registerForm.get('last_name');
  }
  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get phone_number() {
    return this.registerForm.get('phone_number');
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Invalid Credentials',
    });
  }
  // get confirmpassword() {
  //   return this.resetForm.get('confirmpassword');
  // }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  getcurrentuser() {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (token != null && user != null) {
      return user;
      // console.log(atob(tok));
      // console.log(JSON.parse(atob(user)));
    } else return '';
  }

  getrole() {
    let role = localStorage.getItem('role');
    if (role != null) return role;
    else return '';
  }
  islogedin() {
    if (this.getcurrentuser() != '') {
      return true;
    } else return false;
  }
  registerOne(event: Event) {
    event.preventDefault();
    if (this.user.role === 'Admin') {
      this.user.branch_id = ''; // Clear branch_id if role is Admin
    } else {
      this.user.branch_id = this.registerForm.get('branch_id')?.value;
    }
    this.restdatasource.register(this.user).subscribe(
      (response) => {
        console.log(response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: ' Register Successful',
        });
        setTimeout(() => {
          this.router.navigate(['app-view-Branches']).then(() => {
            window.location.reload();
          });
        }, 2000);

        // Handle success, e.g., show a success message or redirect to another page
      },
      (error) => {
        console.error(error);
        // Handle error, e.g., display an error message
      }
    );
  }
}
