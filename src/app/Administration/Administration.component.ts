// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-Administration',
//   templateUrl: './Administration.component.html',
//   styleUrls: ['./Administration.component.css']
// })
// export class AdministrationComponent implements OnInit {


//   ngOnInit() {
//   }
//   constructor(private router:Router) { }



//   showBranches(event:Event):void{

//     console.log("ShowBranches")
//     event.preventDefault();
//     this.router.navigate(['/app-view-Branches']);
//   }

//   profile(event:Event):void
//   {
// console.log("Profile")
// event.preventDefault();
// this.router.navigate(['/app-profile'])
//   }

//   logOut(event:Event):void
//   {
//       this.router.navigate(['/'])
//   }




// side nav

// }



import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { navbarData } from './nav-data';
import { AdministartionService } from './administration.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-Administration',
  templateUrl: './Administration.component.html',
  styleUrls: ['./Administration.component.css'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class AdministrationComponent implements OnInit {
  public hide:boolean=true;
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  constructor(public router: Router,private sidenavService:AdministartionService) {}

  getIsSidenavVisible() {
    return this.sidenavService.getIsSidenavVisible();
  }

  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for(let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
          this.hide=false;
        }
      }
    }
  }


  // logOut(event:Event):void
  // {
  //     this.router.navigate(['/'])
  // }
  // showBranches(event:Event):void{

  //   console.log("ShowBranches")
  //   event.preventDefault();
  //   this.router.navigate(['/app-view-Branches']);
  // }
}





