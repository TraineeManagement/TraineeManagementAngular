import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private isSidenavVisible = true;

  constructor() { }

  setIsSidenavVisible(isVisible: boolean) {
    this.isSidenavVisible = isVisible;
  }

  getIsSidenavVisible() {
    return this.isSidenavVisible;
  }
}
