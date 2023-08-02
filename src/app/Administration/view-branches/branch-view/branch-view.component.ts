import { Router } from '@angular/router';
import { BranchService } from './../../../Services/branch.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { location } from 'src/app/model/location';
import { Branch } from 'src/app/model/branch';

@Component({
  selector: 'app-branch-view',
  templateUrl: './branch-view.component.html',
  styleUrls: ['./branch-view.component.css'],
})
export class BranchViewComponent implements OnInit {
  branchList?: Branch[] = [];
  public branches: Branch[] | undefined = [];
  public location: location[] = [];

  constructor(private branchService: BranchService, private router: Router) {}

  ngOnInit() {
    this.gettingBranchList();
  }

  onDelete(branch_id: number | undefined): void {
    if (typeof branch_id === 'number') {
      this.branchService.deleteBranch(branch_id).subscribe(
        (data) => {
          console.log(data);

          Swal.fire({
            icon: 'success',
            title: 'Deleted Successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.gettingBranchList(); // Fetch and filter the branches again
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

  searchText: string = '';
  gettingBranchList(): Branch[] {
    this.branchService.getBranchList().subscribe((data) => {
      this.branchList = data;
      console.log(this.branchList);
    });

    // Filter the branchList based on the search text
    return (
      this.branchList?.filter(
        (branch) =>
          branch.branch_id?.toString().includes(this.searchText) ||
          branch.location?.city
            ?.toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          branch.branch_name
            ?.toLowerCase()
            .includes(this.searchText.toLowerCase())
      ) || []
    );
  }

  onUpdate(branch_id: number | undefined) {}
}
