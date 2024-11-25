import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  currentItem = "";
  setCurrentItem = (e: string) => this.currentItem = e;
  currentSubItem = "";
  setCurrentSubItem = (e: string) => this.currentSubItem = e;
}
