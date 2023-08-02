import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationRepository } from 'src/app/model/Repository/authentication.repositary';

import { Batch } from 'src/app/model/batch';
import { Branch } from 'src/app/model/branch';
import { RestDataSource } from 'src/app/model/restdatasource';
import { conditionalRequired } from 'src/app/validators';

@Component({
  selector: 'authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  submitted = false;
  // loginForm!: FormGroup;
  RegistrationForm!: FormGroup;
  apiResponse: any;
  public branches: Branch[] = [];
  public batches: Batch | any;
  roles: string[] = ['Admin', 'User'];
  branch: Branch | undefined;

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

  ngOnInit(): void {
    this.gettingBranchList();
    this.route.paramMap.subscribe((params) => {
      const branchId = params.get('branchId');
      if (branchId) {
        const parsedBranchId = parseInt(branchId);
        if (!isNaN(parsedBranchId)) {
          this.authrepo.getBranches().subscribe((branches) => {
            const branch = branches.find((b) => b.branch_id === parsedBranchId);
            if (branch) {
              this.branch = branch;
              this.batches = branch.batches || [];
              console.log(this.batches);
            }
          });
        }
      }
    });
  }

  gettingBatchList(branchId: number) {
    this.authrepo.getBranches().subscribe((branches) => {
      const branch = branches.find((b) => b.branch_id === branchId);
      if (branch) {
        this.batches = branch.batches || [];
        console.log(this.batches);
      }
    });
  }

  login(event: Event) {
    event.preventDefault();
    Object.values(this.loginForm.controls).forEach((control) => {
      control.markAsTouched();
    });
    this.restdatasource.login(this.credentials).subscribe(
      (response: any) => {
        console.log(response);
        const jwtToken = response.jwt;
        const userRole = response.user.role;
        const branchId = response.user.branch_id;
        const first_name = response.user.first_name;
        const last_name = response.user.last_name;
        const email = response.user.email;
        const phone_number = response.user.phone_number;
        const user = {
          role: userRole,
          branch_id: branchId,
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone_number:phone_number
        };

        this.authrepo.setUserData(user);
        localStorage.setItem('token', jwtToken);

        if (branchId) {
          const apiUrl = `http://127.0.0.1:8000/user/branchupdateanddeleteandretraivebyid/${branchId}/`;

          // Send an HTTP GET request to the backend API
          this.http.get(apiUrl).subscribe(
            (apiResponse: any) => {
              // Handle the API response
              console.log(apiResponse);

              this.authrepo.setLoginResponse(response);
             if(branchId!=null){
              this.router.navigate(['/batchhome/course']);
             }

              // this.router.navigate([])
            },
            (error) => {
              console.error(error);
              // Handle error, e.g., display an error message
            }
          );
        } else {
          this.router.navigate(['/app-view-Branches']);
          console.log('Branch ID is null');
        }
      },
      (error) => {
        this.showError();
        // Handle error, e.g., display an error message
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
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

  loginForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

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
          this.router.navigate(['authentication']).then(() => {
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
