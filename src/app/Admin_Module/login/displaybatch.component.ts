import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationRepository } from "src/app/model/Repository/authentication.repositary";
import { Branch } from "src/app/model/branch";
import { RestDataSource } from "src/app/model/restdatasource";
import { User } from "src/app/model/user.model";


@Component({
  selector: 'displaybranch',
  templateUrl: './displaybatch.component.html',
  // styleUrls: [''],
})
export class DisplayBatchComponent implements OnInit {
  batchName: string = '';
  @Input() branches: Branch | undefined;
  public branch?: Branch;

  public user: User | undefined;

  constructor(
    private authrepo: AuthenticationRepository,
    private route: ActivatedRoute,
    private restdata: RestDataSource
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const branchId = params.get('branchId');
      if (branchId) {
        this.gettingBatchList(parseInt(branchId));
      }
    });
    this.user = this.authrepo.getUserData();
    console.log(this.user);
  }
  logout() {
    localStorage.clear();
    
  }

  // gettingBatchList(branchId: number) {
  //   this.authrepo.getBranches().subscribe((branches) => {
  //     const branch = branches.find((b) => b.branch_id === branchId);
  //     if (branch) {
  //       this.batches = branch.batches;
  //       console.log(this.batches);
  //     }
  //   });
  // }
  gettingBatchList(branchId: number) {
    this.restdata.getBatchesForBranch(branchId).subscribe((batches) => {
      this.branch = batches;
      console.log(this.branch);
    });
  }
}
