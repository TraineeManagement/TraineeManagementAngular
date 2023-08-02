import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-branches',
  templateUrl: './view-branches.component.html',
  styleUrls: ['./view-branches.component.css']
})
export class ViewBranchesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

addBranch():void
{

this.router.navigate(['/app-add-branch'])
console.log("add Branch")
}

viewBracnh():void{
  this.router.navigate(['/app-branch-view'])
  console.log("view Branch")
}


addLocation()
{
  console.log("Navigated to location")
  this.router.navigate(['/app-add-location'])
}
}


